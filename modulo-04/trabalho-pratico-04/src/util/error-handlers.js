const NotFoundError             = require('./not-found.error');
const InsufficientBalanceError  = require('./insufficient-balance.error');

exports.handler404 = (req, res, next) => {
  res
    .status(404)
    .json({ status: 404, message: 'Not Found' });
};

exports.handler500 = (err, req, res, next) => {
  console.error(err);

  const status = getStatus(err);

  res
    .status(status)
    .json({ status, message: err.message });
};

const getStatus = (err) => {
  if (err instanceof NotFoundError) return 404;
  if (err instanceof InsufficientBalanceError) return 422;

  return 500;
}
