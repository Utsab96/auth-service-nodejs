module.exports = (err, req, res, next) => {
  const status = err.status || 400;
  res.status(status).json({
    success: false,
    message: err.message || "Something went wrong"
  });
};
