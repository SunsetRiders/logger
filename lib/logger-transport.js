const winston = require('winston');
require('le_node');
const path = require('path');

/**
 * LoggerTransport contains all the
 * teleport levels for logger instances
 * To check the options follow the link below
 * Winston GitHub: https://github.com/winstonjs/winston
 */
class LoggerTransport {

  /**
   * Winston transport by console mode
   * @param {Object} config object with options and winston config
   * @return {EventEmitter} Console event emitter
   */
  console(config) {   
    return new winston.transports.Console({
      colorize: config.options.color,
      timestamp: true,
      json: true,
      stringify: true
    });
  }

  /**
   * Winston transport by file mode
   * @param {Object} config object with options and winston config
   * @return {EventEmitter} Console event emitter
   */
  file(config) {
    return new winston.transports.File({
      filename: path.resolve(config.options.logPath + '/' + config.winstonConfig.level + '.log'),
      json: true,
      colorize: config.options.color,
      timestamp: true
    });
  }

  /**
   * Winston transport by log entries service mode
   * @param {Object} config object with options and winston config
   * @return {EventEmitter} Console event emitter
   */
  logentries(config) {
    return new winston.transports.Logentries({
      token: config.options.logentriesToken,
      json: true,
      stringify: true
    });
  }
}

module.exports = LoggerTransport;
