const healthRouter = require("./health-router");
const auth = require("../utility/auth-util");
const userRouter = require("./user-router");

const route = (routePath, app, logger) => {
  healthRouter.setHealthRouter(routePath, app);
  app.use("*/api/*", auth.validateAuthToken);
  userRouter.setUserRouter(routePath, app);
};

module.exports = { route };
