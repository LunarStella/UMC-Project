import { response } from "../../config/response.js";
import { status } from "../../config/responseStatus.js";
import { add, getStore, getMine } from "./../services/missionService.js";

export const addMission = async (req, res, next) => {
  console.log("가게 미션을 추가했습니다.");
  console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트용
  res.send(response(status.SUCCESS, await add(req.body)));
};

export const getStoreMission = async (req, res, next) => {
  console.log("가게 미션 찾기");
  const storeId = req.params.storeId;
  const offset = req.query.offset;
  console.log("storeId:", storeId); // 값이 잘 들어오나 찍어보기 위한 테스트용
  res.send(response(status.SUCCESS, await getStore(storeId, offset)));
};

export const getMyMission = async (req, res, next) => {
  console.log("내 미션 찾기");
  const userId = req.params.storeId;
  const offset = req.query.offset;
  console.log("userId:", userId); // 값이 잘 들어오나 찍어보기 위한 테스트용
  res.send(response(status.SUCCESS, await getMine(userId, offset)));
};
