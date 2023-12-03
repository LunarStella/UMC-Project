import pool from "../../config/database.js";
import BaseError from "../../config/error.js";
import { status } from "../../config/responseStatus.js";

class Review {
  static async createTable() {
    try {
      await pool.query(`
            CREATE TABLE IF NOT EXISTS review (
            id BIGINT PRIMARY KEY AUTO_INCREMENT,
            store_id BIGINT,
            title VARCHAR(40),
            content TEXT,
            rate INT,
            create_at DATETIME(6),
            update_at DATETIME(6),
            response TEXT,
            FOREIGN KEY (store_id) REFERENCES store(id)
    );`);
      console.log("User table created or already exists.");
    } catch (err) {
      console.error("Error creating User table:", err);
      throw err;
    }
  }

  static async insertReview(data) {
    try {
      const confirmStore =
        "SELECT EXISTS(SELECT id FROM store WHERE id = ?) as isExistStore";
      const insertStoreQuery =
        "INSERT INTO review (store_id, title, content, rate, create_at, update_at, response) VALUES (?, ?, ?, ?, ?, ?, ?);";

      const conn = await pool.getConnection();
      const [confirm] = await pool.query(confirmStore, data.store_id);
      console.log(confirm[0].isExistReview);
      console.log(data);
      if (confirm[0].isExistReview == 0) {
        conn.release();
        return -1;
      }

      const result = await pool.query(insertStoreQuery, [
        data.store_id,
        data.title,
        data.content,
        data.rate,
        data.create_at,
        data.update_at,
        data.response,
      ]);

      conn.release();

      console.log(`New review inserted with ID ${result[0].insertId}`);
      return result[0].insertId;
    } catch (err) {
      throw new BaseError(status.PARAMETER_IS_WRONG);
    }
  }
}

export default Review;
