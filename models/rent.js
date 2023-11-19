class Rent {
  constructor(connection) {
    this.connection = connection;
  }

  async createTable() {
    try {
      await this.connection.execute(`
          CREATE TABLE IF NOT EXISTS rent (
            id BIGINT PRIMARY KEY,
            book_id BIGINT,
            member_id VARCHAR(15),
            created_at DATETIME(6),
            updated_at DATETIME(6),
            FOREIGN KEY (book_id) REFERENCES book(id),
            FOREIGN KEY (member_id) REFERENCES member(phone_num)
          )
        `);
      console.log("Rent table created or already exists.");
    } catch (err) {
      console.error("Error creating Rent table:", err);
      throw err;
    }
  }
}

export default Rent;
