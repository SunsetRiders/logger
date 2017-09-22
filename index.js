const LoggerDebug   = require("./lib/logger-debug");
const LoggerError   = require("./lib/logger-error");
const LoggerRequest = require("./lib/logger-request");
const LoggerInfo    = require("./lib/logger-info");
const LoggerWarn    = require("./lib/logger-warn");

class Index {

  /**
   * Middleware for logger
   * @param {Object} req Request object
   * @param {Object} res Respons object
   * @param {Function} next Next function
   */
  static middleware(req, res, next) {
    req.logger = (type, log, options) => {
      try {
        let logger = null;
        type = type.toLowerCase();
        // Check if type is available
        if (['debug', 'info', 'warn', 'error'].indexOf(type) === -1) {
          throw new Error("Logger type not available, please use one of: ['debug', 'info', 'warn', 'error']");
        }
        switch (type) {
          default:
          case 'debug':
            logger = new LoggerDebug(req, res, options).execute(log);
            break;
          case 'info':
            logger = new LoggerInfo(req, res, options).execute(log);
            break;
          case 'warn':
            logger = new LoggerWarn(req, res, options).execute(log);
            break;
          case 'error':
            logger = new LoggerError(req, res, options).execute(log);
            break;
        }
        return logger;
      } catch (err) {
        throw err;
      }
    };
    next();
  }

  /**
   * Middleware for request logging
   * @param {Object} options Options object
   * @return {Function} Execute function
   */
  static requestMiddleware(options) {
    return new LoggerRequest(options).execute;
  }

}

module.exports = Index;
