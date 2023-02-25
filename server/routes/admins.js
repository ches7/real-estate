import express from "express";
import catchAsync from "../utils/catchAsync.js";
import admin from "../controllers/admin.js";
import auth from "../controllers/auth.js";
import user from "../controllers/user.js";
import property from "../controllers/property.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//SIGN IN
router.post("/signin", catchAsync(admin.signin));

//SIGN OUT
router.get("/signout", catchAsync(auth.signout));

//GET USER
router.get("/users/:id", verifyAdmin, catchAsync(user.getUser));

//GET ALL USERS
router.get("/users", verifyAdmin, catchAsync(user.getUsers));

//DELETE USER OR AGENT 
//note this will sign you out as it uses deleteUser
router.delete("/deleteuser", verifyAdmin, catchAsync(auth.deleteUser));

//DELETE PROPERTY
router.delete("/properties/:id", verifyAdmin, catchAsync(property.deleteProperty));

export default router;