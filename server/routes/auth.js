import express from "express";
// import auth from "../controllers/auth.js";
import auth from "../controllers/authMySQL.js";
import catchAsync from "../utils/catchAsync.js";
import multer from "multer";
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = express.Router();

router.post("/register", catchAsync(auth.register))
router.post("/registerasagent", upload.single("agentPhoto"), catchAsync(auth.registerAsAgent))
router.patch("/updateuser", catchAsync(auth.updateUser))
router.patch("/updateagent", upload.single("agentPhoto"), catchAsync(auth.updateAgent))
router.patch("/changepassword", catchAsync(auth.changePassword))
router.post("/signin", catchAsync(auth.signin))
router.get("/signout", catchAsync(auth.signout))

export default router