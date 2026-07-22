const pino = require("pino");
const config = require("./config");

const isDevelopment = config.NODE_ENV === "development";

const logger = pino({
  level: config.LOG_LEVEL,
  base: {
    service_name: "url-shortener",
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: isDevelopment
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
        },
      }
    : undefined,
});

module.exports = logger;