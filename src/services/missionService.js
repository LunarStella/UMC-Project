import BaseError from "../../config/error.js";
import { status } from "../../config/responseStatus.js";
import Mission from "./../models/mission.js";
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
