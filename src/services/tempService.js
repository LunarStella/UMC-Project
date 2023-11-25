import { tempResponseDTO } from "./../dtos/tempResponseDto.js";
import { flagResponseDTO } from "./../dtos/tempResponseDto.js";

import { BaseError } from "./../config/error.js";
import { status } from "./../config/responseStatus.js";

export const getTempData = () => {
  return tempResponseDTO("This is TEST! >.0");
};

export function checkFlag(flag) {
  if (flag == 1) throw new BaseError(status.BAD_REQUEST); // 에러 발생시키기!
  else {
    return flagResponseDTO(flag);
  }
}
