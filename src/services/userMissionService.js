import BaseError from "../../config/error.js";
import { status } from "../../config/responseStatus.js";
import UserMission from "./../models/user_mission.js";
import { formatCurrentDateTime } from "../utils/mysqlHandler.js";
import { createResponseDTO } from "../dto/userMissionDto.js";

export const add = async (body) => {
  const currentTime = formatCurrentDateTime();

  const insertUserMissionId = await UserMission.insertUserMission({
    user_id: body.user_id,
    mission_id: body.mission_id,
    status: body.status,
    create_at: currentTime,
    update_at: currentTime,
  });

  if (insertUserMissionId == -1) {
    throw new BaseError(status.BAD_REQUEST);
  } else {
    console.log("id: " + insertUserMissionId);
    // 생성된 id를 통하여 title, content, point 찾기
    return createResponseDTO("진행중인 미션으로 등록되었습니다.");
  }
};
