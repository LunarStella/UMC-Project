import express from "express";
import { addStore } from "./../controllers/storeController.js";

const router = express.Router();

router.post("/add", addStore);

export default router;
