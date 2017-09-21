const LoggerDebug = require("./lib/logger-debug");
const LoggerError = require("./lib/logger-error");
const LoggerRequest = require("./lib/logger-request");

class Index {

  constructor() {
    return {
        LoggerDebug,
        LoggerError,
        LoggerRequest
    }
  }

}

module.exports = new Index();
