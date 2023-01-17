const healthController = require("../controller/health-controller");

const setHealthRouter = (routePath, app) => {
  app.get(`${routePath}/healthz`, healthController.checkHealth);
};

module.exports = { setHealthRouter };
