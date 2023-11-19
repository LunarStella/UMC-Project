import mysql from "mysql2";
import app from "./app.js";
import dotenv from "dotenv";
import * as memberController from "./controllers/memberController.js";
import * as noticeAlarmController from "./controllers/noticeAlarmController.js";
import * as marketingAlarmController from "./controllers/marketingAlarmController.js";
import * as bookCategoryController from "./controllers/bookCategoryController.js";
import * as bookController from "./controllers/bookController.js";
import * as rentController from "./controllers/rentController.js";
import * as bookLikesController from "./controllers/bookLikesController.js";
import * as hashTagController from "./controllers/hashTagController.js";
import * as bookHashTagController from "./controllers/bookHashTagController.js";

dotenv.config({ path: "./config.env" });

// Create a connection to the database
const dbConfig = {
  host: process.env.SQL_localhost,
  user: process.env.SQL_user,
  password: process.env.SQL_password,
  database: process.env.SQL_database,
};

// Connect to the database
const connectToDatabase = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log("Connected to the database!");

    await memberController.createMemberTable(connection);
    await noticeAlarmController.createnoticeAlarmTable(connection);
    await marketingAlarmController.createMarketingAlarmTable(connection);
    await bookCategoryController.createBookCategoryTable(connection);
    await bookController.createBookTable(connection);
    await rentController.createnoticeAlarmTable(connection);
    await bookLikesController.createBookLikesTable(connection);
    await hashTagController.createHashTagTable(connection);
    await bookHashTagController.createBookHashTagTable(connection);

    // You can perform database operations here using the 'connection' object

    // Don't forget to close the connection when done
    connection.end();
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
};

connectToDatabase();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
