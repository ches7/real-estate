import express from "express";
import user from "../controllers/userMySQL.js";
import catchAsync from "../utils/catchAsync.js";
import { verifyAgent, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE
router.patch("/:id", verifyUser, catchAsync(user.updateUser));

//DELETE
router.delete("/:id", verifyUser, catchAsync(user.deleteUser));

//GET
router.get("/:id", verifyUser, catchAsync(user.getUser));

//GET ALL
router.get("/", verifyAgent, catchAsync(user.getUsers));

//SAVE PROPERTY
router.post("/saveproperty", verifyUser, catchAsync(user.saveProperty));

//SAVE PROPERTY
router.post("/unsaveproperty", verifyUser, catchAsync(user.unSaveProperty));

export default router;