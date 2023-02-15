import User from "../models/User.js";
import bcrypt from "bcryptjs";
import ExpressError from "../utils/ExpressError.js";
import jwt from "jsonwebtoken";

import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2';


const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

async function getUser(id){
  const [rows] = await pool.query(`SELECT users_1.*, JSON_ARRAYAGG(saved_properties_1.saved_property) AS "savedProperties"
  FROM users_1 
  LEFT JOIN saved_properties_1 ON saved_properties_1.user_id = users_1.id
  WHERE id = ?
  GROUP BY users_1.id
  `, [id]);
  return rows[0];
}

async function createUser(username, email, password, isAgent){
  const [result] = await pool.query(` 
  INSERT INTO users_1 (username, email, password, isAgent)
  VALUES (?, ?, ?, ?)
  `, [username, email, password, isAgent]);
  const id = result.insertId;
  return getUser(id);
}

const register = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log(hash)
    const { username, email, isAgent } = req.body;
    const user = await createUser(username, email, hash, isAgent);
    res.status(201).send("User has been created.");
};

const signin = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(new ExpressError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(new ExpressError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAgent: user.isAgent },
      `${process.env.JWT}`
    );

    const { password, isAgent, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAgent })
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

export default { register, signin, signout };