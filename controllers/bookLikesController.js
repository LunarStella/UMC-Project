import BookLikes from "./../models/bookLikes.js";
import * as factory from "./handleFactory.js";

export const createBookLikesTable = (connection) => {
  return factory.createTable(connection, BookLikes);
};
