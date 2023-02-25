import express from "express";
import agent from "../controllers/agent.js"
import catchAsync from "../utils/catchAsync.js";

const router = express.Router();

//GET
router.get("/:id", catchAsync(agent.getAgent));

//GET ALL
router.get("/", catchAsync(agent.getAgents));

export default router;