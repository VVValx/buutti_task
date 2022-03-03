function errorHandler(error, req, res, next) {
  const code = error.statusCode || 500;
  res.status(code).send({ error: { code, message: "An error occurred" } });
}

module.exports = errorHandler;
