import pool from "../../config/database.js";

class UserReview {
  static async createTable() {
    try {
      await pool.query(`
            CREATE TABLE IF NOT EXISTS user_review (
            id BIGINT PRIMARY KEY AUTO_INCREMENT,
            user_id BIGINT,
            review_id BIGINT,
            create_at DATETIME(6),
            update_at DATETIME(6),
            FOREIGN KEY (user_id) REFERENCES user(id),
            FOREIGN KEY (review_id) REFERENCES review(id)
    );`);
      console.log("User region created or already exists.");
    } catch (err) {
      console.error("Error creating User table:", err);
      throw err;
    }
  }
}

export default UserReview;
