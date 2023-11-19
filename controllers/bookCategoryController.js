import BookCategory from "./../models/bookCategory.js";
import * as factory from "./handleFactory.js";

export const createBookCategoryTable = (connection) => {
  return factory.createTable(connection, BookCategory);
};
