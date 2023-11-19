import NoticeAlarm from "./../models/noticeAlarm.js";
import * as factory from "./handleFactory.js";

export const createnoticeAlarmTable = (connection) => {
  return factory.createTable(connection, NoticeAlarm);
};
