//dotenv needs to be imported here to prevent crash -> due to env variables being imported outside export statement
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from "bcryptjs";
import ExpressError from "../utils/ExpressError.js";
import jwt from "jsonwebtoken";
import mysql from 'mysql2';
import Property from '../models/Property.js';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from 'crypto';
const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKeyId = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3Client = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey
  },
  region: bucketRegion
})


const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise();

async function getUser(id) {
  const [rows] = await pool.query(`SELECT users.*, JSON_ARRAYAGG(saved_properties.saved_property) AS "savedProperties"
  FROM users 
  LEFT JOIN saved_properties ON saved_properties.user_id = users.id
  WHERE id = ?
  GROUP BY users.id
  `, [id]);
  return rows[0];
}

async function getUserByEmail(email) {
  const [rows] = await pool.query(`SELECT users.*, JSON_ARRAYAGG(saved_properties.saved_property) AS "savedProperties"
  FROM users 
  LEFT JOIN saved_properties ON saved_properties.user_id = users.id
  WHERE email = ?
  GROUP BY users.id
  `, [email]);
  return rows[0];
}

async function getAgentByAgentName(agentName) {
  const [rows] = await pool.query(`SELECT users.*, JSON_ARRAYAGG(saved_properties.saved_property) AS "savedProperties"
  FROM users 
  LEFT JOIN saved_properties ON saved_properties.user_id = users.id
  WHERE agentName = ?
  GROUP BY users.id
  `, [agentName]);
  return rows[0];
}

async function createAgent(agentName, email, password, isAgent, agentPhoto) {
  const [result] = await pool.query(` 
  INSERT INTO users (agentName, email, password, isAgent, agentPhoto)
  VALUES (?, ?, ?, ?, ?)
  `, [agentName, email, password, isAgent, agentPhoto]);
  const id = result.insertId;
  return getUser(id);
}

async function createUser(email, password, isAgent) {
  const [result] = await pool.query(` 
  INSERT INTO users (email, password, isAgent)
  VALUES (?, ?, ?)
  `, [email, password, isAgent]);
  const id = result.insertId;
  return getUser(id);
}

const register = async (req, res, next) => {
  const { email, isAgent, password } = req.body;

  //check if email is taken
  const check = await getUserByEmail(email)
  console.log(check);
  if (check) {
    return next(new ExpressError("This email is already taken!", 409));
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const user = await createUser(email, hash, isAgent);
  if (!user) {
    return next(new ExpressError("Something went wrong!", 500));
  }
  res.status(201).send("Successfully registered");
};

const registerAsAgent = async (req, res, next) => {
  const { agentName, email, isAgent, password } = req.body;

  //check if email is taken
  const checkEmail = await getUserByEmail(email)
  if (checkEmail) {
    return next(new ExpressError("This email is already taken!", 409));
  }
  //check if agentName is taken
  const checkAgentName = await getAgentByAgentName(agentName)
  if (checkAgentName) {
    return next(new ExpressError("This name is already taken!", 409));
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  //upload new photo to aws
  let fileName = generateFileName();
  const uploadParams = {
    Bucket: bucketName,
    Body: req.file.buffer,
    Key: fileName,
    ContentType: req.file.mimetype
  }
  await s3Client.send(new PutObjectCommand(uploadParams));


  const agent = await createAgent(agentName, email, hash, isAgent, fileName);
  if (!agent) {
    return next(new ExpressError("Something went wrong!", 500));
  }
  res.status(201).send("Successfully registered");
};

async function updateEmail(email, id) {
  const [rows] = await pool.query(`UPDATE users
  SET users.email = ?
  WHERE users.id = ?
  `, [email, id]);
  return rows[0];
}

async function updateAgentInMySQL(email, agentName, agentPhoto, id) {
  const [rows] = await pool.query(`UPDATE users
  SET users.email = ?, users.agentName = ?, users.agentPhoto = ?
  WHERE users.id = ?
  `, [email, agentName, agentPhoto, id]);
  return rows[0];
}

const updateUser = async (req, res, next) => {
  const { email, id } = req.body;

  //check user exists
  const userBeforeUpdate = await getUser(id);
  if (!userBeforeUpdate) {
    return next(new ExpressError("User not found!", 404));
  }

  const user = await updateEmail(email, id);
  if (!user) {
    return next(new ExpressError("Something went wrong!", 500));
  }
  res.status(201).send("User has been updated.");
};

const updateAgent = async (req, res, next) => {
  const { email, id, agentName } = req.body;

  //check agent exists
  const agentBeforeUpdate = await getUser(id);
  if (!agentBeforeUpdate) {
    return next(new ExpressError("Agent not found!", 404));
  }
  //upload new photo to aws
  let fileName = generateFileName();
  const uploadParams = {
    Bucket: bucketName,
    Body: req.file.buffer,
    Key: fileName,
    ContentType: req.file.mimetype
  }
  await s3Client.send(new PutObjectCommand(uploadParams));

  //delete old photos from aws
  if (agentBeforeUpdate.agentPhoto != null) {
    const params = {
      Bucket: bucketName,
      Key: agentBeforeUpdate.agentPhoto,
    }
    await s3Client.send(new DeleteObjectCommand(params))
  }

  const agent = await updateAgentInMySQL(email, agentName, fileName, id);
  if (!agent) {
    return next(new ExpressError("Something went wrong!", 500));
  }
  res.status(201).send("Agent has been updated.");
};

async function changePasswordInMySQL(password, id) {
  const [rows] = await pool.query(`UPDATE users
  SET users.password = ?
  WHERE users.id = ?
  `, [password, id]);
  return rows[0];
}

const changePassword = async (req, res, next) => {
  const user = await getUser(req.body.id);
  if (!user) return next(new ExpressError("User not found!", 404));

  const isPasswordCorrect = await bcrypt.compare(
    req.body.oldPassword,
    user.password
  );
  if (!isPasswordCorrect) {
    return next(new ExpressError("Incorrect password!", 400));
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.newPassword, salt);

  const updatedPassword = await changePasswordInMySQL(hash, req.body.id);
  res.status(201).send("Password updated");
};

const signin = async (req, res, next) => {
  const user = await getUserByEmail(req.body.email);
  if (!user) return next(new ExpressError("User not found!", 404));

  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordCorrect)
    return next(new ExpressError("Wrong email or password!", 400));

  const token = jwt.sign(
    { id: user.id, isAgent: user.isAgent },
    `${process.env.JWT}`
  );

  const { password, ...otherDetails } = user;
  res
    .cookie("real_estate_app_ches_access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json({ details: { ...otherDetails } })
    .send();
};

const signout = async (req, res, next) => {
  res.cookie("access_token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0)
  }).status(200).send();
};

async function deleteUserInMySQL(id) {
  const [rows] = await pool.query(`DELETE FROM users WHERE id = ?`, [id]);
  return rows[0];
};

async function deleteSavedPropertyInMySQL(id) {
  const [result] = await pool.query(` 
  DELETE FROM saved_properties WHERE user_id = ?`, [id]);
};

const deleteUser = async (req, res, next) => {
  const { id } = req.body;
  const user = await getUser(id);
  if (!user) return next(new ExpressError("User not found!", 404));
  const del = await deleteUserInMySQL(id);
  const delSavedProperties = await deleteSavedPropertyInMySQL(id);

  //delete agent photo from aws
  if (user.agentPhoto != null) {
    const params = {
      Bucket: bucketName,
      Key: user.agentPhoto,
    };
    await s3Client.send(new DeleteObjectCommand(params));
  };

  //delete owned properties
  if (user.isAgent == 1) {
    const properties = await Property.find({['agent']: { ['$eq']: id }});
    for (let i = 0; i < properties.length; i++) {
      //delete photos from aws
      if (properties[i].awsPhotoName.length !== 0) {
        for (let j = 0; j < properties[i].awsPhotoName.length; j++) {
          const params = { Bucket: bucketName, Key: properties[i].awsPhotoName[j], }
          await s3Client.send(new DeleteObjectCommand(params));
        }
      }
      //delete property from mongodb
      await Property.findByIdAndDelete(properties[i]._id);
    };

  };
  //sign user out
  res.cookie("access_token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0)
  }).status(200).send();
};

export default { register, registerAsAgent, updateUser, updateAgent, changePassword, signin, signout, deleteUser };