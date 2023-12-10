import express from "express";
import { addReview } from "./../controllers/reviewController.js";
import { getMyReview } from "./../controllers/reviewController.js";

const router = express.Router();

router.post("/add", addReview);

router.get("/:storeId,");

export default router;
