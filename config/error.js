class BaseError extends Error {
  constructor(data) {
    super(data.message);
    this.data = data;
  }
}

export default BaseError;
