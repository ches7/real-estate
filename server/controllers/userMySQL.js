import User from "../models/User.js";
import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2';


const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise();

async function getUserById(id) {
  const [rows] = await pool.query(`SELECT users_1.*, JSON_ARRAYAGG(saved_properties_1.saved_property) AS "savedProperties"
  FROM users_1 
  LEFT JOIN saved_properties_1 ON saved_properties_1.user_id = users_1.id
  WHERE id = ?
  GROUP BY users_1.id
  `, [id]);
  return rows[0];
}

async function getAllUsers(){
    const [rows] = await pool.query("SELECT * FROM users_1");
    return rows;
}

async function savePropertyInMySQL(id, property){
    const [result] = await pool.query(` 
    INSERT INTO saved_properties_1 (user_id, saved_property)
    VALUES (?, ?)
    `, [id, property]);
    const user = result.insertId;
    return getUserById(user);
}

async function unSavePropertyInMySQL(id, property){
    const [result] = await pool.query(` 
    DELETE FROM saved_properties_1 WHERE user_id = ? AND saved_property = ?
    `, [id, property]);
    const user = result.insertId;
    return getUserById(user);
}

const updateUser = async (req,res,next)=>{
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
}

const deleteUser = async (req,res,next)=>{
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
}

const getUser = async (req,res,next)=>{
    const user = await getUserById(req.params.id);
    res.status(200).json(user);
}

const getUsers = async (req,res,next)=>{
    const users = await getAllUsers();
    res.status(200).json(users);
}

const saveProperty = async (req, res, next) => {
    const updatedUser = await savePropertyInMySQL(req.body.id, req.body.property);
    res.status(200).json(updatedUser);
}

const unSaveProperty = async (req, res, next) => {
    const updatedUser = await unSavePropertyInMySQL(req.body.id, req.body.property);
    res.status(200).json(updatedUser);
} 

export default { updateUser, deleteUser, getUser, getUsers, saveProperty, unSaveProperty }