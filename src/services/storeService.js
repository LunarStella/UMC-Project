import BaseError from "../../config/error.js";
import { status } from "../../config/responseStatus.js";
import Store from "./../models/store.js";
import { createResponseDTO } from "../dto/storeDto.js";

export const add = async (body) => {
  const insertStoreId = await Store.insertStore({
    region_id: body.region_id,
    name: body.name,
    type: body.type,
  });

  if (insertStoreId == -1) {
    throw new BaseError(status.BAD_REQUEST);
  } else {
    console.log("id: " + insertStoreId);
    // 생성된 id를 통하여 title, content, point 찾기
    return createResponseDTO(await Store.findStoreById(insertStoreId));
  }
};
