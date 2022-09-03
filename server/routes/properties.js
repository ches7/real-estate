import express from "express";
import {
  createProperty,
  deleteProperty,
  getProperty,
  getProperties,
  updateProperty,
} from "../controllers/property.js";
import { validateProperty } from "../utils/validateProperty.js";
const router = express.Router();

//CREATE
router.post("/properties", validateProperty,  createProperty);

//UPDATE
router.patch("/properties/:id", validateProperty, updateProperty);

//DELETE
router.delete("/properties/:id", deleteProperty);

//GET
router.get("/properties/:id", getProperty);

//GET ALL
router.get("/properties", getProperties);

export default router;