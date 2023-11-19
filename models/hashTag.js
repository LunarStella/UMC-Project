class HashTag {
  constructor(connection) {
    this.connection = connection;
  }

  async createTable() {
    try {
      await this.connection.execute(`
          CREATE TABLE IF NOT EXISTS hash_tag (
            id BIGINT PRIMARY KEY,
            name VARCHAR(20),
            created_at DATETIME(6),
            updated_at DATETIME(6)
          )
        `);
      console.log("HashTag table created or already exists.");
    } catch (err) {
      console.error("Error creating HashTag table:", err);
      throw err;
    }
  }
}

export default HashTag;
