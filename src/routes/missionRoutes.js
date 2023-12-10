import express from "express";
import {
  addMission,
  getStoreMission,
  getMyMission,
} from "./../controllers/missionController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Mission
 *     description: Operations related to missions
 */

/**
 * @swagger
 * /mission/{userId}:
 *   get:
 *     summary: Get missions for a specific user
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: User ID
 *         required: true
 *         type: integer
 *       - name: offset
 *         in: query
 *         description: Offset for pagination
 *         required: false
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: "Sample Mission"
 *                       content:
 *                         type: string
 *                         example: "This is a sample mission content."
 *                       point:
 *                         type: integer
 *                         example: 100
 *                       create_at:
 *                         type: string
 *                         example: "2023-12-03T06:28:00.685Z"
 *                       update_at:
 *                         type: string
 *                         example: "2023-12-03T06:28:00.685Z"
 *       404:
 *         description: Store not found
 */

router.post("/add", addMission);

/**
 * @swagger
 * /mission/{storeId}:
 *   get:
 *     summary: Get missions for a specific store
 *     parameters:
 *       - name: storeId
 *         in: path
 *         description: Store ID
 *         required: true
 *         type: string
 *       - name: offset
 *         in: query
 *         description: Offset for pagination
 *         required: false
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: "Sample Mission"
 *                       content:
 *                         type: string
 *                         example: "This is a sample mission content."
 *                       point:
 *                         type: integer
 *                         example: 100
 *                       create_at:
 *                         type: string
 *                         example: "2023-12-03T06:28:00.685Z"
 *                       update_at:
 *                         type: string
 *                         example: "2023-12-03T06:28:00.685Z"
 *       404:
 *         description: Store not found
 */

router.get("/:storeId", getStoreMission); // 미션 스토어 ID에 따른 미션 가져오기
router.get("/:userId", getMyMission); // 사용자 ID에 따른 미션 가져오기

export default router;
