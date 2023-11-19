class NoticeAlarm {
  constructor(connection) {
    this.connection = connection;
  }

  async createTable() {
    try {
      await this.connection.execute(`
          CREATE TABLE IF NOT EXISTS notice_alarm (
            id BIGINT PRIMARY KEY,
            user_id VARCHAR(15),
            is_confirmed BOOLEAN,
            created_at DATETIME(6),
            updated_at DATETIME(6),
            title VARCHAR(30),
            body TEXT,
            FOREIGN KEY (user_id) REFERENCES member(phone_num)
          )
        `);
      console.log("NoticeAlarm table created or already exists.");
    } catch (err) {
      console.error("Error creating NoticeAlarm table:", err);
      throw err;
    }
  }
}

export default NoticeAlarm;
