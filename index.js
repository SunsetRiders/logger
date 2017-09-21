const LoggerDebug = require("./lib/logger-debug");
const LoggerError = require("./lib/logger-error");
const LoggerRequest = require("./lib/logger-request");
const LoggerInfo = require("./lib/logger-info");
const LoggerWarn = require("./lib/logger-warn");

class Index {

  constructor() {
    return {
        LoggerDebug,
        LoggerError,
        LoggerRequest,
        LoggerInfo,
        LoggerWarn
    }
  }

}

module.exports = new Index();
