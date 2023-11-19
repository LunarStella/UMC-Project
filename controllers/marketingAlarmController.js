import MarketingAlarm from "./../models/marketingAlarm.js";
import * as factory from "./handleFactory.js";

export const createMarketingAlarmTable = (connection) => {
  return factory.createTable(connection, MarketingAlarm);
};
