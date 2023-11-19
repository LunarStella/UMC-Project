import Member from "./../models/member.js";
import * as factory from "./handleFactory.js";

export const createMemberTable = (connection) => {
  return factory.createTable(connection, Member);
};
