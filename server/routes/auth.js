import express from "express";
import auth from "../controllers/auth.js";
import catchAsync from "../utils/catchAsync.js";
import multer from "multer";
import { verifyUser } from "../utils/verifyToken.js";
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = express.Router();

//CREATE USER
router.post("/register", catchAsync(auth.register));

//CREATE AGENT
router.post("/registerasagent", upload.single("agentPhoto"), catchAsync(auth.registerAsAgent));

//UPDATE USER
router.patch("/updateuser", verifyUser, catchAsync(auth.updateUser));

//UPDATE AGENT
router.patch("/updateagent", verifyUser, upload.single("agentPhoto"), catchAsync(auth.updateAgent));

//UPDATE USER OR AGENT PASSWORD
router.patch("/changepassword", verifyUser, catchAsync(auth.changePassword));

//SIGN USER OR AGENT IN
router.post("/signin", catchAsync(auth.signin));

//SIGN USER OR AGENT OUT
router.get("/signout", catchAsync(auth.signout));

//DELETE USER OR AGENT
router.delete("/deleteuser", verifyUser, catchAsync(auth.deleteUser))

export default router