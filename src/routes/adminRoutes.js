import express from "express";
import { database } from "./../controllers/adminController.js";

const router = express.Router();

router.get("/createDB", database);

export default router;
