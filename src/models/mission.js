import pool from "../../config/database.js";
import BaseError from "../../config/error.js";
import { status } from "../../config/responseStatus.js";

class Mission {
  static async createTable() {
    try {
      await pool.query(`
            CREATE TABLE IF NOT EXISTS mission (
            id BIGINT PRIMARY KEY AUTO_INCREMENT,
            store_id BIGINT,
            region_id BIGINT,
            title VARCHAR(40),
            content TEXT,
            point INT,
            create_at DATETIME(6),
            update_at DATETIME(6),
            FOREIGN KEY (store_id) REFERENCES store(id),
            FOREIGN KEY (region_id) REFERENCES region(id)
    );`);
      console.log("User table created or already exists.");
    } catch (err) {
      console.error("Error creating User table:", err);
      throw err;
    }
  }

  // 가게에 미션 추구하기
  // 가게에 리뷰 추가힉
  static async insertMission(data) {
    try {
      const confirmStore =
        "SELECT EXISTS(SELECT id FROM store WHERE id = ?) as isExistStore";
      const insertMissionQuery =
        "INSERT INTO mission (store_id, region_id, title, content, point, create_at, update_at) VALUES (?, ?, ?, ?, ?, ?, ?);";

      const conn = await pool.getConnection();
      const [confirm] = await pool.query(confirmStore, data.store_id);
      console.log(confirm[0].isExistStore);
      console.log(data);
      if (confirm[0].isExistStore == 0) {
        conn.release();
        return -1;
      }

      const result = await pool.query(insertMissionQuery, [
        data.store_id,
        data.region_id,
        data.title,
        data.content,
        data.point,
        data.create_at,
        data.update_at,
      ]);

      conn.release();

      console.log(`New mission inserted with ID ${result[0].insertId}`);
      return result[0].insertId;
      return [{ title: "history", content: "asdfasd", point: 199 }];
    } catch (err) {
      throw new BaseError(status.PARAMETER_IS_WRONG);
    }
  }

  static async findMissionById(id) {
    try {
      const conn = await pool.getConnection();
      const [mission] = await pool.query(
        "SELECT title, content, point FROM mission WHERE id = ?",
        [id]
      );

      if (mission.length === 0) {
        // 해당 ID에 대한 미션을 찾을 수 없을 경우 예외 처리
        conn.release();
        throw new BaseError(status.NOT_FOUND);
      }

      conn.release();
      // 미션 정보를 반환
      return {
        title: mission[0].title,
        content: mission[0].content,
        point: mission[0].point,
      };
    } catch (err) {
      // 에러 처리
      throw new BaseError(status.PARAMETER_IS_WRONG);
    }
  }

  static async findMissionByStoreId(data) {
    const conn = await pool.getConnection();

    // store_id를 기반으로 미션을 조회하는 쿼리
    const query = `
      SELECT title, content, point, create_at, update_at
      FROM mission
      WHERE store_id = ?
      ORDER BY create_at DESC
      LIMIT ? OFFSET ?;
    `;

    const [missions] = await conn.query(query, [
      parseInt(data.storeId),
      parseInt(data.limit),
      parseInt(data.offset),
    ]);

    conn.release();

    console.log(missions);
    // 조회된 미션 목록을 반환
    return missions;
  }
  catch(err) {
    // 에러 처리
    console.error(err);
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }

  static async findMissionByUserId(data) {
    const conn = await pool.getConnection();

    // store_id를 기반으로 미션을 조회하는 쿼리
    const query = `
    SELECT m.title, m.content, m.point, m.create_at AS mission_create_at, m.update_at AS mission_update_at
    FROM mission AS m
    INNER JOIN user_mission AS um ON m.id = um.mission_id
    WHERE um.user_id = ? AND um.status = 'ongoing'
    LIMIT ? OFFSET ?;
  `;

    const [missions] = await conn.query(query, [
      parseInt(data.userId),
      parseInt(data.limit),
      parseInt(data.offset),
    ]);

    conn.release();

    console.log(missions);
    // 조회된 미션 목록을 반환
    return missions;
  }
  catch(err) {
    // 에러 처리
    console.error(err);
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
}

export default Mission;
