const LoggerDebug = require("./lib/logger-debug");
const LoggerError = require("./lib/logger-error");
const LoggerRequest = require("./lib/logger-request");
const LoggerInfo = require("./lib/logger-info");
const LoggerWarn = require("./lib/logger-warn");

class Index {

  static middleware(req, res, next){
    req.loggers = (type = 'debug', options) => {
      switch(type.toLowerCase()){
        case 'debug':
          logger = new LoggerDebug(req, res, options);
        break;
        case 'info':
          logger = new LoggerInfo(req, res, options);
        break;
        case 'warn':
          logger = new LoggerWan(req, res, options);
        break;
        case 'error':
          logger = new LoggerError(req, res, options);
        break;
      }
      next();
    }
  }

  static requestMiddleware(options) {
      return new LoggerRequest(options).execute();
  }

}

module.exports = Index;
