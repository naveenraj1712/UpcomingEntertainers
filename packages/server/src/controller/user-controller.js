const userService = require("../service/user-service");

const addNewUser = (req, res, next) => userService.addNewUser(req, res, next);
const getUserDetails = (req, res, next) =>
  userService.getUserDetails(req, res, next);

module.exports = {
  addNewUser,
  getUserDetails,
};
