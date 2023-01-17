const { Sequelize } = require("sequelize");

const { logger } = require("./logger");
const env = require("./env");

const sequelize = new Sequelize(
  env.MSSQL_DB_NAME,
  env.MSSQL_USER,
  env.MSSQL_PASSWORD,
  {
    host: env.SERVER,
    dialect: env.DB,
    pool: {
      max: parseInt(env.MAX_CONNECTION_POOL),
      min: parseInt(env.MIN_CONNECTION_POOL),
      acquire: 30000,
      idle: 10000,
    },
    logging:
      env.SEQUELIZE_LOG_ENABLE === "true"
        ? (message) => {
            logger.info(message);
          }
        : null,
  }
);

const authenticateSql = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "SQL database connection has been established successfully through sequelize"
    );
  } catch (exception) {
    console.log("exception: ", exception);
    console.error("Failed to connect to sql through sequelize");
  }
};

module.exports = {
  sequelize,
  authenticateSql,
};
