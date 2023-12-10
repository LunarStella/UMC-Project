import { response } from "../../config/response.js";
import { status } from "../../config/responseStatus.js";
import { add } from "./../services/reviewService.js";
import { createGeneralDAO } from "./../dao/generalDao.js";

export const addReview = async (req, res, next) => {
  console.log("가게 리뷰를 추가했습니다.");
  console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트용
  res.send(response(status.SUCCESS, await add(req.body)));
};

export const getMyReview = async (req, res, next) => {
  const storeId = req.params.storeId;
  const page = req.params.page;

  createGeneralDAO(req, res);

  res.send();
};
