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

async function getAgentById(id) {

  const [rows] = await pool.query(`
  SELECT users.id, users.email, users.agentName, users.agentPhoto
  FROM users 
  WHERE id = ? AND isAgent = 1
  `, [id]);
  return rows[0];
}

const getAgent = async (req,res,next)=>{
    const agent = await getAgentById(req.params.id);
    if (!agent){
        next();
    }
    res.status(200).json(agent);
}

async function getAgentsFromMySQL() {

    const [rows] = await pool.query(`
    SELECT users.id, users.email, users.agentName, users.agentPhoto
    FROM users 
    WHERE isAgent = 1
    `);
    return rows;
  }

const getAgents = async (req,res,next)=>{

    const agents = await getAgentsFromMySQL();
    if (!agents){
        next();
    }
    res.status(200).json(agents);
}

export default { getAgent, getAgents }