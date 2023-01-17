const ErrorHandler = require("../utility/error-handler");

const checkHealth = (req, res, next) => {
  try {
    res.status(200).send({ server_time: new Date() });
  } catch (exception) {
    next(new ErrorHandler(exception.code, "System Health Check Failed"));
  }
};

module.exports = { checkHealth };
