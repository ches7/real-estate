import express from "express";
// import auth from "../controllers/auth.js";
import auth from "../controllers/authMySQL.js";
import catchAsync from "../utils/catchAsync.js";
import multer from "multer";
import { verifyUser } from "../utils/verifyToken.js";
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = express.Router();

router.post("/register", catchAsync(auth.register))
router.post("/registerasagent", upload.single("agentPhoto"), catchAsync(auth.registerAsAgent))
router.patch("/updateuser", verifyUser, catchAsync(auth.updateUser))
router.patch("/updateagent", verifyUser, upload.single("agentPhoto"), catchAsync(auth.updateAgent))
router.patch("/changepassword", verifyUser, catchAsync(auth.changePassword))
router.post("/signin", catchAsync(auth.signin))
router.get("/signout", catchAsync(auth.signout))
router.delete("/deleteuser", verifyUser, catchAsync(auth.deleteUser))

export default router