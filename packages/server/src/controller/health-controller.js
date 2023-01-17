const healthService = require("../service/health-service");

const checkHealth = (req, res, next) =>
  healthService.checkHealth(req, res, next);

module.exports = { checkHealth };
