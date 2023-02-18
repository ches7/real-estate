import User from "../models/User.js";

const getAgents = async (req,res,next)=>{

    const agents = await User.find({
        $and: [
            { ['_id']: { ['$exists']: true } },
            { ['isAgent']: { ['$eq']: true } }
        ]
    })//.limit(20);
    res.status(200).json(agents);
}

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
  SELECT users.*, JSON_ARRAYAGG(saved_properties.saved_property) AS "savedProperties"
  FROM users 
  LEFT JOIN saved_properties ON saved_properties.user_id = users.id
  WHERE id = ? AND isAgent = 1
  GROUP BY users.id
  `, [id]);
  return rows[0];
}

const getAgent = async (req,res,next)=>{
    const agent = await getAgentById(req.params.id);
    if (!agent){
        next()
    }
    res.status(200).json(agent);
}

export default { getAgent, getAgents }