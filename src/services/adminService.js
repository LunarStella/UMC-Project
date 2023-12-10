import BaseError from "../../config/error.js";
import { status } from "../../config/responseStatus.js";
import Mission from "./../models/mission.js";
import Region from "./../models/region.js";
import Review from "./../models/review.js";
import Store from "./../models/store.js";
import User_Mission from "./../models/user_mission.js";
import User_Review from "./../models/user_review.js";
import User from "./../models/user.js";

export const create = async () => {
  try {
    console.log("DB create request");
    await User.createTable();
    await Region.createTable();
    await Store.createTable();
    await Review.createTable();
    await User_Review.createTable();
    await Mission.createTable();
    await User_Mission.createTable();
  } catch {
    throw new BaseError(status.BAD_REQUEST);
  }
};
