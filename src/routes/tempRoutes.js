import express from "express";
import { tempTest } from "./../controllers/tempController.js";
import { tempException } from "./../controllers/tempController.js";

const router = express.Router();

router.get("/test", tempTest);

router.get("/exception/:flag", tempException);

export default router;
