import pool from "../../config/database.js";

class Region {
  static async createTable() {
    try {
      await pool.query(`
            CREATE TABLE IF NOT EXISTS region (
            id BIGINT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(20)
    );`);
      console.log("User region created or already exists.");
    } catch (err) {
      console.error("Error creating User table:", err);
      throw err;
    }
  }
}

export default Region;
