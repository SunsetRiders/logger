const Logger  = require('./logger');

/**
 * It's responsible for handling debug.log files
 */
class LoggerDebug extends Logger {

  /**
    * To check the options follow the link below
    * Winston GitHub: https://github.com/winstonjs/winston
    * @param {Object} options Options
  */
  constructor(options) {
    super({
      level: 'debug'
    }, options);
  }
}

module.exports = LoggerDebug;
