const Logger  = require('./logger');

/**
 * It's responsible for handling default.log files
 */
class LoggerDefault extends Logger {

  /**
    * To check the options follow the link below
    * Winston GitHub: https://github.com/winstonjs/winston
    * @param {Object} options Options
  */
  constructor(options) {
    super({
      level: 'default'
    }, options);
  }
}

module.exports = LoggerDefault;
