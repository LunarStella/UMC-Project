import pool from "../../config/database.js";
import BaseError from "../../config/error.js";
import { status } from "../../config/responseStatus.js";

class UserMission {
  static async createTable() {
    try {
      await pool.query(`
            CREATE TABLE IF NOT EXISTS user_mission (
            id BIGINT PRIMARY KEY AUTO_INCREMENT,
            user_id BIGINT,
            mission_id BIGINT,
            status varchar(10),
            create_at DATETIME(6),
            update_at DATETIME(6),
            FOREIGN KEY (user_id) REFERENCES user(id),
            FOREIGN KEY (mission_id) REFERENCES mission(id)
    );`);
      console.log("User region created or already exists.");
    } catch (err) {
      console.error("Error creating User table:", err);
      throw err;
    }
  }

  static async insertUserMission(data) {
    try {
      console.log(data);
      const statusMission =
        "SELECT status FROM user_mission WHERE mission_id = ?;";
      const insertUserMissionQuery =
        "INSERT INTO user_mission (user_id, mission_id, status, create_at, update_at) VALUES (?, ?, ?, ?, ?);";

      const conn = await pool.getConnection();
      const [confirm] = await pool.query(statusMission, [data.mission_id]);
      console.log(confirm);

      if (confirm.length !== 0) {
        const status = confirm[0].status;
        console.log(status);
        if (status === "ongoing") {
          conn.release();
          return -1;
        }
      }

      const result = await pool.query(insertUserMissionQuery, [
        data.user_id,
        data.mission_id,
        data.status,
        data.create_at,
        data.update_at,
      ]);

      conn.release();

      console.log(`New mission inserted with ID ${result[0].insertId}`);
      return result[0].insertId;
    } catch (err) {
      throw new BaseError(status.PARAMETER_IS_WRONG);
    }
  }
}

export default UserMission;
