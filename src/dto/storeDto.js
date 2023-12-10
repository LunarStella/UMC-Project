export const createResponseDTO = (store) => {
  return {
    name: store.name,
    type: store.type,
  };
};
