const path = require("path");
const fs = require("fs");
const { config } = require("dotenv");
const { get } = require("http");

function init(target) {
  if (!target.initialized) {
    const file = path.resolve(process.cwd(), ".env.local");
    if (fs.existsSync(file)) {
      config({ path: file });
    }
    config();
    target.initialized = true;
  }
}

module.exports = new Proxy(
  {
    initialized: false,
  },
  {
    has(target, prop) {
      if (prop in target) {
        return true;
      }

      init(target);
      return prop in process.env;
    },
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      }

      init(target);

      if (prop === "toJSON") {
        return () => process.env;
      }

      if (prop in process.env) {
        return process.env[prop];
      }

      return null;
    },

    ownKeys(target) {
      init(target);
      return Reflect.ownKeys({ ...target, ...process.env });
    },

    getOwnPropertyDescriptor() {
      return {
        enumerable: true,
        configurable: true,
      };
    },
  }
);
