const userDao = require("../dao/user");
const { sequelize } = require("../sequelize");
const { ErrorHandler } = require("../utility/error-handler");
const {
  validateEmail,
  validatePassword,
  isEmailExists,
  validateMobile,
} = require("../validations/user-validation");

const addNewUser = async (req, res, next) => {
  const { password, user_email, mobile_no } = req.body;
  let err, transaction;
  try {
    if (!validateEmail(user_email)) {
      err = new ErrorHandler(500, "Email should contain @ and .com");
    } else if (!validatePassword(password)) {
      err = new ErrorHandler(
        500,
        "Password should contain atleast 1 uppercase, 1 lowercase, 1 number and 1 special Character"
      );
    } else if (!validateMobile(mobile_no)) {
      err = new ErrorHandler(500, "Mobile number should have 10 numbers");
    } else if (isEmailExists(user_email)) {
      err = new ErrorHandler(500, "Email already exists");
    }
    if (err) {
      return next(err);
    } else {
      transaction = await sequelize.transaction();
      const userAdded = await userDao.addNewUser(req.body, transaction);
      await transaction.commit();
      if (userAdded)
        req.status(200).send({
          userDetails: userAdded,
        });
    }
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

const getUserDetails = async (req, res, next) => {
  try {
    const { user_email } = req.headers.UserInfo;
    const userDetails = await userDao.getUserDetails(user_email);
    if (userDetails) {
      res.status(200).json({
        userDetails: userDetails,
      });
    } else {
      res.status(500).send("Unable to fetch user details");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addNewUser,
  getUserDetails,
};
