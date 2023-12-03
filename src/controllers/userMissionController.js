import { response } from "../../config/response.js";
import { status } from "../../config/responseStatus.js";
import { add } from "./../services/userMissionService.js";

export const addUserMission = async (req, res, next) => {
  console.log("유저 미션을 추가했습니다.");
  console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트용
  res.send(response(status.SUCCESS, await add(req.body)));
};
