class Member {
  constructor(connection) {
    this.connection = connection;
  }

  async createTable() {
    try {
      await this.connection.execute(`
          CREATE TABLE IF NOT EXISTS member (
            phone_num VARCHAR(15) PRIMARY KEY,
            name VARCHAR(10),
            nickname VARCHAR(20),
            gender VARCHAR(10),
            created_at DATETIME(6),
            updated_at DATETIME(6),
            status VARCHAR(15),
            inactive_date DATETIME
          )
        `);
      console.log("Member table created or already exists.");
    } catch (err) {
      console.error("Error creating member table:", err);
      throw err;
    }
  }
}

export default Member;
