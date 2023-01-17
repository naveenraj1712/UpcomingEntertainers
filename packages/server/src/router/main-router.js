const router = require('./api-router');

const userRoute = (app, logger) => {
  router.route("/api", app, logger);
};

module.exports = {
  userRoute,
};
