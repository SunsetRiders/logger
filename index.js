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
   * @param {Object} config Configuration object
   */
  static middleware(req, res, next, config) {
    /**
     * Binds logger to req object
     * @param {String} type Type
     * @param {Object} log Data object
     * @param {Object} altConfig Alternative configuration
     * @return {Function} logger function
     */
    req.logger = (type, log, altConfig) => {
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
            logger = new LoggerDebug(req, res, config || altConfig).execute(log);
            break;
          case 'info':
            logger = new LoggerInfo(req, res, config || altConfig).execute(log);
            break;
          case 'warn':
            logger = new LoggerWarn(req, res, config || altConfig).execute(log);
            break;
          case 'error':
            logger = new LoggerError(req, res, config || altConfig).execute(log);
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
