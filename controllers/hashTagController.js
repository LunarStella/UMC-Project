import HashTag from "./../models/hashTag.js";
import * as factory from "./handleFactory.js";

export const createHashTagTable = (connection) => {
  return factory.createTable(connection, HashTag);
};
