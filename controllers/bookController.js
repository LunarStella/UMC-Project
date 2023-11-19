import Book from "./../models/book.js";
import * as factory from "./handleFactory.js";

export const createBookTable = (connection) => {
  return factory.createTable(connection, Book);
};
