const LoggerDefault = require("./lib/logger-default");
const LoggerError = require("./lib/logger-error");
const LoggerRequest = require("./lib/logger-request");

class Index {

  constructor() {
    return {
        LoggerDefault,
        LoggerError,
        LoggerRequest
    }
  }

}

module.exports = new Index();
