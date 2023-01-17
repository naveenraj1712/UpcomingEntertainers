const { logger } = require("../logger");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../env");
const { getUserDetails } = require("../dao/user");

const validateAuthToken = async (req, res, next) => {
  let { authorization } = req.headers;
  authorization = authorization && authorization.split(" ")[1];
  let loginEmail;
  try {
    if (!authorization) {
      const email = req.cookies["email"];

      if (!email) {
        req.headers = {};
        return await next();
      }
      loginEmail = email;
      req.headers.userInfo = await getUserDetails(loginEmail);

      if (!req.headers.userInfo.token) {
        const token = jwt.sign(
          {
            upn: email,
          },
          SECRET_KEY
        );
        req.headers.userInfo.token = token;
      }
      return await next();
    } else {
      const tokenData = jwt.decode(authorization, { complete: true });
      let tokenState = true;
      tokenState = await verifyToken(authorization, tokenData);
      if (tokenState) {
        loginEmail = tokenData.payload.upn;
        if (!loginEmail) loginEmail = req.cookies["email"];
        req.headers.userInfo = await getUserDetails(loginEmail);
        return await next();
      } else {
        // logAuthFail(req, loginEmail, {tokenInvalid: true, message: "Invalid Token"});
        return res.status(401).send({
          tokenInvalid: true,
          message: "Invalid Token",
        });
      }
    }
  } catch (exception) {
    // logAuthFail(req, loginEmail, error);
    return res.status(401).send(error);
  }
};

const getKey = (header) => {
  return new Promise((resolve, reject) => {
    resolve(SECRET_KEY);
  });
};

const verifyToken = (token, tokenData) => {
  return new Promise((resolve, reject) => {
    getKey(tokenData.header).then((key) => {
      jwt.verify(token, key, (err) => {
        if (err) {
          const errorType = {
            message: "",
          };
          if (err.name === "TokenExpiredError") {
            errorType["tokenExpired"] = true;
            errorType.message = "Access Token has expired";
          } else if (err.name === "JsonWebTokenError") {
            errorType["tokenInvalid"] = true;
            errorType.message = "Token is Invalid";
          }
          reject(errorType);
        } else {
          resolve(true);
        }
      });
    });
  });
};

module.exports = { validateAuthToken };
