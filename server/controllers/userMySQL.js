import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2';
import ExpressError from '../utils/ExpressError.js';


const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise();

async function getUserById(id) {
  const [rows] = await pool.query(`SELECT users.*, JSON_ARRAYAGG(saved_properties.saved_property) AS "savedProperties"
  FROM users 
  LEFT JOIN saved_properties ON saved_properties.user_id = users.id
  WHERE id = ?
  GROUP BY users.id
  `, [id]);
  return rows[0];
}

async function getAllUsers(){
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
}

async function savePropertyInMySQL(id, property){
    const [result] = await pool.query(` 
    INSERT INTO saved_properties (user_id, saved_property)
    VALUES (?, ?)
    `, [id, property]);
    return getUserById(id);
}

async function unSavePropertyInMySQL(id, property){
    const [result] = await pool.query(` 
    DELETE FROM saved_properties WHERE user_id = ? AND saved_property = ?
    `, [id, property]);
    return getUserById(id);
}

const getUser = async (req,res,next)=>{
    const user = await getUserById(req.params.id);
    if(!user){
        return next(new ExpressError("User not found!", 404));
    }
    res.status(200).json(user);
}

const getUsers = async (req,res,next)=>{
    const users = await getAllUsers();
    if(!users){
        return next(new ExpressError("Users not found!", 404));
    }
    res.status(200).json(users);
}

const saveProperty = async (req, res, next) => {
    const updatedUser = await savePropertyInMySQL(req.body.id, req.body.property);
    console.log(updatedUser)
    if(!updatedUser){
        return next(new ExpressError("Something went wrong!", 500));
    }
    res.status(200).json(updatedUser);
}

const unSaveProperty = async (req, res, next) => {
    const updatedUser = await unSavePropertyInMySQL(req.body.id, req.body.property);
    if(!updatedUser){
        return next(new ExpressError("Something went wrong!", 500));
    }
    res.status(200).json(updatedUser);
} 

export default { getUser, getUsers, saveProperty, unSaveProperty }