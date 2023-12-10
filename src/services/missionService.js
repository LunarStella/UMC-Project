import BaseError from "../../config/error.js";
import { status } from "../../config/responseStatus.js";
import Mission from "./../models/mission.js";
import UserMission from "./../models/user_mission.js";
import { formatCurrentDateTime } from "../utils/mysqlHandler.js";
import { createResponseDTO } from "../dto/missionDTO.js";

export const add = async (body) => {
  const currentTime = formatCurrentDateTime();

  const insertMissionId = await Mission.insertMission({
    store_id: body.store_id,
    region_id: body.region_id,
    title: body.title,
    content: body.content,
    point: body.point,
    create_at: currentTime,
    update_at: currentTime,
  });

  if (insertMissionId == -1) {
    throw new BaseError(status.BAD_REQUEST);
  } else {
    console.log("id: " + insertMissionId);
    // 생성된 id를 통하여 title, content, point 찾기
    return createResponseDTO(await Mission.findMissionById(insertMissionId));
  }
};

export const getStore = async (id, offset) => {
  const missionList = await Mission.findMissionByStoreId({
    storeId: id,
    limit: 10,
    offset: offset,
  });

  if (missionList == []) {
    throw new BaseError(status.BAD_REQUEST);
  } else {
    console.log("missionList: " + missionList);
    // 생성된 id를 통하여 title, content, point 찾기
    return missionList;
  }
};

export const getMine = async (id, offset) => {
  const missionList = await Mission.findMissionByUserId({
    userId: id,
    limit: 10,
    offset: offset,
  });

  if (missionList == []) {
    throw new BaseError(status.BAD_REQUEST);
  } else {
    console.log("missionList: " + missionList);
    // 생성된 id를 통하여 title, content, point 찾기
    return missionList;
  }
};
