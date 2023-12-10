import BaseError from "../../config/error.js";
import { status } from "../../config/responseStatus.js";
import { formatCurrentDateTime } from "../utils/mysqlHandler.js";
import Review from "./../models/review.js";
import { createResponseDTO } from "../dto/reviewDto.js";
import { createGeneralDTO } from "../dto/generalDto.js";

export const add = async (body) => {
  const currentTime = formatCurrentDateTime();

  const insertReviewId = await Review.insertReview({
    store_id: body.store_id,
    title: body.title,
    content: body.content,
    rate: body.rate,
    create_at: currentTime,
    update_at: currentTime,
    response: body.response,
  });

  if (insertReviewId == -1) {
    throw new BaseError(status.BAD_REQUEST);
  } else {
    console.log("id: " + insertReviewId);
    // 생성된 id를 통하여 title, content, point 찾기
    return createResponseDTO("리뷰가 제출되었습니다.");
  }
};

export const get = async (data) => {
  const insertReviewId = await Review.insertReview({
    store_id: body.store_id,
    title: body.title,
    content: body.content,
    rate: body.rate,
    create_at: currentTime,
    update_at: currentTime,
    response: body.response,
  });

  if (insertReviewId == -1) {
    throw new BaseError(status.BAD_REQUEST);
  } else {
    console.log("id: " + insertReviewId);
    // 생성된 id를 통하여 title, content, point 찾기
    return createGeneralDTO("리뷰가 제출되었습니다.");
  }
};
