import pool from "../../config/database.js";
import BaseError from "../../config/error.js";
import { status } from "../../config/responseStatus.js";

class Store {
  static async createTable() {
    try {
      await pool.query(`
            CREATE TABLE IF NOT EXISTS store (
            id BIGINT PRIMARY KEY AUTO_INCREMENT,
            region_id BIGINT,
            name VARCHAR(20),
            type VARCHAR(10),
            FOREIGN KEY (region_id) REFERENCES region(id)
    );`);
      console.log("User table created or already exists.");
    } catch (err) {
      console.error("Error creating User table:", err);
      throw err;
    }
  }
  static async insertStore(data) {
    try {
      const confirmStore =
        "SELECT EXISTS(SELECT id FROM store WHERE id = ?) as isExistStore";
      const insertStoreQuery =
        "INSERT INTO store (region_id, name, type) VALUES (?, ?, ?);";

      const conn = await pool.getConnection();

      const result = await pool.query(insertStoreQuery, [
        data.region_id,
        data.name,
        data.type,
      ]);

      conn.release();

      console.log(`New mission inserted with ID ${result[0].insertId}`);
      return result[0].insertId;
    } catch (err) {
      throw new BaseError(status.PARAMETER_IS_WRONG);
    }
  }

  static async findStoreById(id) {
    try {
      const conn = await pool.getConnection();
      const [store] = await pool.query(
        "SELECT name, type FROM store WHERE id = ?",
        [id]
      );

      if (store.length === 0) {
        // 해당 ID에 대한 미션을 찾을 수 없을 경우 예외 처리
        conn.release();
        throw new BaseError(status.NOT_FOUND);
      }

      conn.release();
      // 미션 정보를 반환
      return {
        name: store[0].name,
        type: store[0].type,
      };
    } catch (err) {
      // 에러 처리
      throw new BaseError(status.PARAMETER_IS_WRONG);
    }
  }
}

export default Store;
