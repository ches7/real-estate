import express from "express";
import agent from "../controllers/agent.js"
import catchAsync from "../utils/catchAsync.js";
import { verifyAgent, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE
//router.patch("/:id", verifyUser, catchAsync(user.updateUser));

//DELETE
//router.delete("/:id", verifyUser, catchAsync(user.deleteUser));

//GET
router.get("/:id", catchAsync(agent.getAgent));

//GET ALL
router.get("/", catchAsync(agent.getAgents));

//SAVE PROPERTY
//router.post("/saveproperty", verifyUser, catchAsync(user.saveProperty));

//SAVE PROPERTY
//router.post("/unsaveproperty", verifyUser, catchAsync(user.unSaveProperty));

export default router;