import Rent from "./../models/rent.js";
import * as factory from "./handleFactory.js";

export const createnoticeAlarmTable = (connection) => {
  return factory.createTable(connection, Rent);
};
