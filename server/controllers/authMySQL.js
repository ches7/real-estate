//dotenv needs to be imported here to prevent crash -> due to env variables being imported outside export statement
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from "bcryptjs";
import ExpressError from "../utils/ExpressError.js";
import jwt from "jsonwebtoken";
import mysql from 'mysql2';
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
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const { email, isAgent } = req.body;
  const user = await createUser(email, hash, isAgent);
  res.status(201).send("User has been created.");
};

const registerAsAgent = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const { agentName, email, isAgent } = req.body;

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
  res.status(201).send("Agent has been created.");
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
    res.status(404).send("user not found");
    return;
  }

  const user = await updateEmail(email, id);
  res.status(201).send("User has been updated.");
};

const updateAgent = async (req, res, next) => {
  const { email, id, agentName } = req.body;

  //check agent exists
  const agentBeforeUpdate = await getUser(id);
  if (!agentBeforeUpdate) {
    res.status(404).send("agent not found");
    return;
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
  if (!user) return next(new ExpressError(404, "User not found!"));

  const isPasswordCorrect = await bcrypt.compare(
    req.body.oldPassword,
    user.password
  );
  if (!isPasswordCorrect)
    return next(new ExpressError(400, "Wrong password or username!"));

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.newPassword, salt);

  const updatedPassword = await changePasswordInMySQL(hash, req.body.id);
  res.status(201).send("Password updated");
};

const signin = async (req, res, next) => {
  const user = await getUserByEmail(req.body.email);
  if (!user) return next(new ExpressError(404, "User not found!"));

  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordCorrect)
    return next(new ExpressError(400, "Wrong password or username!"));

  const token = jwt.sign(
    { id: user.id, isAgent: user.isAgent },
    `${process.env.JWT}`
  );

  const { password, ...otherDetails } = user;
  res
    .cookie("access_token", token, {
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

export default { register, registerAsAgent, updateUser, updateAgent, changePassword, signin, signout };