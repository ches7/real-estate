import express from "express";
import property from "../controllers/property.js";
//import { validateProperty } from "../utils/validateProperty.js";
import catchAsync from "../utils/catchAsync.js";
import { verifyAgent } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
//router.post("/properties", validateProperty, catchAsync(property.createProperty));
router.post("/properties", verifyAgent, catchAsync(property.createProperty));

//UPDATE
// router.patch("/properties/:id", validateProperty, catchAsync(property.updateProperty));
router.patch("/properties/:id", verifyAgent, catchAsync(property.updateProperty));

//DELETE
router.delete("/properties/:id", catchAsync(property.deleteProperty));

//GET
router.get("/properties/:id", catchAsync(property.getProperty));

//GET ALL
router.get("/properties", catchAsync(property.getProperties));

export default router;