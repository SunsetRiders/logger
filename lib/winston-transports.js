const winston = require('winston');
require('le_node');
const path = require('path');

/**
 * LoggerTransport contains all the
 * teleport levels for logger instances
 * To check the options follow the link below
 * Winston GitHub: https://github.com/winstonjs/winston
 */
const winstonTransports = {
  /**
   * Winston transport by console mode
   * @param {Object} config object with options and winston config
   * @return {EventEmitter} Console event emitter
   */
  console: (config) => {
    return new winston.transports.Console({
      level: config.level,
      colorize: false,
      timestamp: true,
      json: true,
      stringify: true
    });
  },

  /**
   * Winston transport by file mode
   * @param {Object} config object with options and winston config
   * @return {EventEmitter} Console event emitter
   */
  file: (config) => {
    return new winston.transports.File({
      name: config.level + '.log',
      filename: path.resolve(config.logPath + '/' + config.level + '.log'),
      level: config.level,
      json: true,
      colorize: false,
      timestamp: true
    });
  },

  /**
   * Winston transport by log entries service mode
   * @param {Object} config object with options and winston config
   * @return {EventEmitter} Console event emitter
   */
  logentries: (config) => {
    return new winston.transports.Logentries({
      token: config.logentriesToken,
      level: config.level,
      json: true,
      stringify: true,
      timestamp: true,
      withLevel: true
    });
  }
};

module.exports = winstonTransports;
