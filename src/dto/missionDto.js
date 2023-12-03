export const createResponseDTO = (mission) => {
  return {
    title: mission.title,
    content: mission.content,
    point: mission.point,
  };
};
