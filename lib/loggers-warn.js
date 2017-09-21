const Logger  = require('./logger');

/**
 * It's responsible for handling warn.log files
 */
class LoggerWarn extends Logger {

  /**
    * To check the options follow the link below
    * Winston GitHub: https://github.com/winstonjs/winston
    * @param {Object} options Options
  */
  constructor(options) {
    super({
      level: 'wan'
    }, options);
  }
}

module.exports = LoggerWarn;
