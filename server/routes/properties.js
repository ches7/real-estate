import express from "express";
import property from "../controllers/property.js";
import catchAsync from "../utils/catchAsync.js";
import { verifyAgent, verifyUser } from "../utils/verifyToken.js";
import multer from "multer";
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const router = express.Router();

//CREATE
router.post("/properties", verifyAgent, upload.any(), catchAsync(property.createProperty));

//UPDATE
router.patch("/properties/:id", verifyUser, upload.any(), catchAsync(property.updateProperty));

//DELETE
router.delete("/properties/:id", catchAsync(property.deleteProperty));

//GET
router.get("/properties/:id", catchAsync(property.getProperty));

//GET ALL
router.get("/properties", catchAsync(property.getProperties));

export default router;