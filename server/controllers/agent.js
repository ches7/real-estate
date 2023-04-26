import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2';
import ExpressError from "../utils/ExpressError.js";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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
        // next();
        return next(new ExpressError("Agent not found!", 404));
    }

  //get photo from aws
  if (agent.agentPhoto != null) {
    const params = {
      Bucket: bucketName,
      Key: agent.agentPhoto,
    }
    const command = new GetObjectCommand(params);
    let photo = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    agent.agentPhoto = photo;
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
        // next();
        return next(new ExpressError("Agents not found!", 404));
    }

    //get photo from aws
    for(let i = 0; i < agents.length; i++){
  if (agents[i].agentPhoto != null) {
    const params = {
      Bucket: bucketName,
      Key: agents[i].agentPhoto,
    }
    const command = new GetObjectCommand(params);
    let photo = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    agents[i].agentPhoto = photo;
  }
    }
    res.status(200).json(agents);
}

export default { getAgent, getAgents }