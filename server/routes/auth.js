import express from "express";
import auth from "../controllers/auth.js";
import catchAsync from "../utils/catchAsync.js";

const router = express.Router();

router.post("/register", catchAsync(auth.register))
router.post("/signin", catchAsync(auth.signin))
router.get("/signout", catchAsync(auth.signout))

export default router