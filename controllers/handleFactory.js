export const createTable = async (connection, Model) => {
  try {
    const model = new Model(connection);
    await model.createTable();
  } catch (err) {
    console.error("Error creating table:", err);
    throw err;
  }
};
