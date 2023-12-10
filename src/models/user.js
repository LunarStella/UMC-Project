import pool from "../../config/database.js";

class User {
  static async createTable() {
    try {
      await pool.query(`
            CREATE TABLE IF NOT EXISTS user (
            id BIGINT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(15),
            birth DATE,
            address VARCHAR(25),
            gender CHAR(1),
            preference VARCHAR(10),
            create_at DATETIME(6),
            update_at DATETIME(6),
            status VARCHAR(8),
            inactive_date DATETIME
        );`);
      console.log("User table created or already exists.");
    } catch (err) {
      console.error("Error creating User table:", err);
      throw err;
    }
  }
}

export default User;
