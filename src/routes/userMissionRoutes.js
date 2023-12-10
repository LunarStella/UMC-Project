import express from "express";
import asyncHandler from "express-async-handler";
import {
  addUserMission,
  changeUserMissionStatus,
} from "./../controllers/userMissionController.js";

/**
 * @swagger
 * tags:
 *   - name: Mission
 *     description: Operations related to missions
 */

/**
 * @swagger
 * /user-mission/{userMissionId}:
 *   post:
 *     summary: Change the status of a user mission
 *     parameters:
 *       - in: path
 *         name: userMissionId
 *         description: User Mission ID
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                   example: true
 *                 code:
 *                   type: integer
 *                   example: 2000
 *                 message:
 *                   type: string
 *                   example: "SUCCESS!"
 *                 result:
 *                   type: object
 *                   properties:
 *                     // 여기에 반환될 데이터 속성들을 추가하세요
 *       500:
 *         description: Internal Server Error
 */

const router = express.Router();

router.post("/add", addUserMission);
router.post("/:userMissionId", asyncHandler(changeUserMissionStatus));

export default router;
