class Book {
  constructor(connection) {
    this.connection = connection;
  }

  async createTable() {
    try {
      await this.connection.execute(`
          CREATE TABLE IF NOT EXISTS book (
            id BIGINT PRIMARY KEY,
            book_category_id BIGINT,
            name VARCHAR(40),
            description TEXT,
            created_at DATETIME(6),
            updated_at DATETIME(6),
            FOREIGN KEY (book_category_id) REFERENCES book_category(id)
          )
        `);
      console.log("Book table created or already exists.");
    } catch (err) {
      console.error("Error creating Book table:", err);
      throw err;
    }
  }
}

export default Book;
