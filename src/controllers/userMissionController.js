import { response } from "../../config/response.js";
import { status } from "../../config/responseStatus.js";
import { add, changeStatus } from "./../services/userMissionService.js";

export const addUserMission = async (req, res, next) => {
  console.log("유저 미션을 추가했습니다.");
  console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트용
  res.send(response(status.SUCCESS, await add(req.body)));
};

export const changeUserMissionStatus = async (req, res, next) => {
  console.log("미션 상태 바꾸기");
  const userMissionId = req.params.userMissionId;
  res.send(response(status.SUCCESS, await changeStatus(userMissionId)));
};
