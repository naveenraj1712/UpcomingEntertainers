const userController = require("../controller/user-controller");

const setUserRouter = (routePath, app) => {
  app.post(`${routePath}/user/add/newuser`, userController.addNewUser);
  app.get(`${routePath}/user/details`, userController.getUserDetails);
};

module.exports = { setUserRouter };
