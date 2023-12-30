import express from "express";
import { getRecords, createRecord, updateRecord } from "../controllers/record.js";

const router = express.Router();

// CREATE
router.post("/", createRecord);

// READ
router.get("/", getRecords);

// UPDATE
router.patch("/:id", updateRecord);

export default router;
