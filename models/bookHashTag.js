class BookHashTag {
  constructor(connection) {
    this.connection = connection;
  }

  async createTable() {
    try {
      await this.connection.execute(`
          CREATE TABLE IF NOT EXISTS book_hash_tag (
            id BIGINT PRIMARY KEY,
            book_id BIGINT,
            hash_tag_id BIGINT,
            FOREIGN KEY (book_id) REFERENCES book(id),
            FOREIGN KEY (hash_tag_id) REFERENCES hash_tag(id)
          )
        `);
      console.log("BookHashTag table created or already exists.");
    } catch (err) {
      console.error("Error creating BookHashTag table:", err);
      throw err;
    }
  }
}

export default BookHashTag;
