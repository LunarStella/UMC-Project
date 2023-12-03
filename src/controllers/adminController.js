import { response } from "../../config/response.js";
import { status } from "../../config/responseStatus.js";
import { create } from "./../services/adminService.js";

export const database = async (req, res, next) => {
  await create();
  res.send(response(status.SUCCESS));
};
