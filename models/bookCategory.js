class BookCategory {
  constructor(connection) {
    this.connection = connection;
  }

  async createTable() {
    try {
      await this.connection.execute(`
          CREATE TABLE IF NOT EXISTS book_category (
            id BIGINT PRIMARY KEY,
            name VARCHAR(20),
            created_at DATETIME(6),
            updated_at DATETIME(6)
          )
        `);
      console.log("BookCategory table created or already exists.");
    } catch (err) {
      console.error("Error creating BookCategory table:", err);
      throw err;
    }
  }
}

export default BookCategory;
