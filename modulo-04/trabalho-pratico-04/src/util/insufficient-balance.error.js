class InsufficientBalanceError extends Error {
  constructor(msg = 'Insufficient Balance') {
    super(msg);
  }
}

module.exports = InsufficientBalanceError;
