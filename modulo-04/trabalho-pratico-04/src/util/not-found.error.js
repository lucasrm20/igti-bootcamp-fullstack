class NotFoundError extends Error {
  constructor(msg) {
    super(msg);
  }
}

module.exports = NotFoundError;
