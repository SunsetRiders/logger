const Logger  = require('./logger');

/**
 * It's responsible for handling info.log files
 */
class LoggerInfo extends Logger {

  /**
    * To check the options follow the link below
    * Winston GitHub: https://github.com/winstonjs/winston
    * @param {Object} options Options
  */
  constructor(options) {
    super({
      level: 'info'
    }, options);
  }
}

module.exports = LoggerInfo;
