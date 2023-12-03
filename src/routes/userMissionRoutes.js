import express from "express";
import { addUserMission } from "./../controllers/userMissionController.js";

const router = express.Router();

router.post("/add", addUserMission);

export default router;
