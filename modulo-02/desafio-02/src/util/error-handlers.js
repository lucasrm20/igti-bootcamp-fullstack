const NotFoundError = require('./not-found.error');

exports.handler404 = (req, res, next) => {
  res
    .status(404)
    .json({ status: 404, message: 'Not Found' });
};

exports.handler500 = (err, req, res, next) => {
  console.error(err);

  const status = err instanceof NotFoundError ? 404 : 500;

  res
    .status(status)
    .json({ status, message: err.message });
};
