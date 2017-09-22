const Logger  = require('./logger');

/**
 * It's responsible for handling error.log files
 */
class LoggerError extends Logger {

  /**
    * To check the options follow the link below
    * Winston GitHub: https://github.com/winstonjs/winston
    * @param {Object} options Options
  */
  constructor(req, res, options) {
    super(req, res, {
      level: 'error'
    }, options);
  }
}

module.exports = LoggerError;
