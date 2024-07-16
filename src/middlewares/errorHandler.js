module.exports = (err, req, res, next) => {
  console.log("Middleware error handling");
  console.log(err);
  const errStatus = err.status || 500;
  const errMsg = err.message || "Internal Server Error";
  res.status(errStatus).json({
    success: false,
    message: errMsg,
    status: errStatus,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};
