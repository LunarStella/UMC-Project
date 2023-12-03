import express from "express";
import { addMission } from "./../controllers/missionController.js";

const router = express.Router();

router.post("/add", addMission);

export default router;
