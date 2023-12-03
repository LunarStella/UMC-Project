import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// import tempRouter from "./src/routes/tempRoutes.js";
import missionRouter from "./src/routes/missionRoutes.js";
import storeRouter from "./src/routes/storeRoutes.js";
import reviewRouter from "./src/routes/reviewRoutes.js";
import userMissionRouter from "./src/routes/userMissionRoutes.js";
import adminRouter from "./src/routes/adminRoutes.js";

import { response } from "./config/response.js";

import { specs } from "./config/swagger.config.js";
import SwaggerUi from "swagger-ui-express";

dotenv.config({ path: "./config.env" });

const app = express();
app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// swagger
app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(specs));

app.use("/admin", adminRouter);
app.use("/mission", missionRouter);
app.use("/store", storeRouter);
app.use("/review", reviewRouter);
app.use("/user-mission", userMissionRouter);

// error handling
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  console.log("error", err);
  res
    .status(err.data.status || status.INTERNAL_SERVER_ERROR)
    .send(response(err.data));
});

export default app;
