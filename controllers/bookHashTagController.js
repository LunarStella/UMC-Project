import BookHashTag from "./../models/bookHashTag.js";
import * as factory from "./handleFactory.js";

export const createBookHashTagTable = (connection) => {
  return factory.createTable(connection, BookHashTag);
};
