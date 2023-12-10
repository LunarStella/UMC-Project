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

  static async changeUserMissionStatus(id) {
    const query1 = `
        UPDATE user_mission
        SET status = 'finish'
        WHERE id = ? AND status = 'ongoing';
        `;

    try {
      const conn = await pool.getConnection();

      // 미션 상태 변경 쿼리 실행
      const [result] = await conn.query(query1, [id]);

      console.log(result);

      // 변경된 레코드의 개수 확인
      const affectedRows = result.affectedRows;

      if (affectedRows === 0) {
        // 변경된 레코드가 없는 경우
        conn.release();
        return -1; // 미션 상태가 'ongoing'이 아니었음을 나타내는 코드
      }

      conn.release();

      return affectedRows;
    } catch (err) {
      throw new BaseError(status.PARAMETER_IS_WRONG);
    }
  }
}

export default UserMission;
