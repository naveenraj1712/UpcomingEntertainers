const redis = require("redis");
const bluebird = require("bluebird");
const {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  ENABLE_REDIS,
  NODE_ENV,
} = require("./env");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const RedisClient =
  ENABLE_REDIS === "true"
    ? NODE_ENV === "local"
      ? redis.createClient(REDIS_PORT, REDIS_HOST)
      : redis.createClient(REDIS_PORT, REDIS_HOST, {
          auth_pass: REDIS_PASSWORD,
          tls: { servername: REDIS_HOST },
        })
    : null;

const redisOnConnect = async () => {
  try {
    if (ENABLE_REDIS === "true") {
      RedisClient.on("connect", () => {
        console.log(
          "Successfully connected to Redis Server " +
            REDIS_HOST +
            ":" +
            REDIS_PORT
        );
      });
    }
  } catch (exception) {
    console.error(
      "Not able to connect to Redis Server " + REDIS_HOST + ":" + REDIS_PORT,
      exception
    );
  }
};

const redisOnError = async () => {
  try {
    if (ENABLE_REDIS === "true") {
      RedisClient.on("error", (e) => {
        console.log(
          "Failed to connect to Redis Server " + REDIS_HOST + ":" + REDIS_PORT,
          e
        );
      });
    }
  } catch (exception) {
    console.error(
      "Not able to connect to Redis Server " + REDIS_HOST + ":" + REDIS_PORT,
      exception
    );
  }
};

module.exports = {
  RedisClient,
  redisOnConnect,
  redisOnError,
};
