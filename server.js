import app from "./app.js";
import dotenv from "dotenv";
import { specs } from "./config/swagger.config.js";
import SwaggerUi from "swagger-ui-express";

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
