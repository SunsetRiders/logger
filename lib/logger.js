const winston         = require('winston');
const LoggerTransport = require('./logger-transport');
const fs              = require('fs');
const path            = require('path');
const Toolkit         = require("./util/toolkit");

/**
 * Logger class is intented to be a base generalization
 * for another logger classes and SHOULD NOT be instantiated alone.
 * Example of wrong way: const logger = new Logger();
 * Instead use with in a generalization with another class
 * Example of correct way: class LoggerDefault extends Logger
 * Available transport levels: [console, file, logentries]
 */
class Logger {

  /**
   * @constructor
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @param {Object} winstonConfig Winston config
   * @param {Object} options Options
   */
  constructor(req, res, winstonConfig = {}, options = {}) {
    this.req = req;
    this.res = res;
    this.options = options;
    this.winstonConfig = winstonConfig;
    this.loadDefaultOptions();
    this.loadDefaultWinstonConfig();
    this.checkIfLogFolderExists();
    this.setTransports();
  }

  /**
   * Load the default winston configuration
   */
  loadDefaultWinstonConfig() {
    // Color status
    if (this.winstonConfig && !this.winstonConfig.color) {
      this.winstonConfig.color = this.options.color;
    }

    // Exit on error
    if (this.winstonConfig && !this.winstonConfig.exitOnError) {
      this.winstonConfig.exitOnError = false;
    }
  }

  /**
   * Load the default options
   */
  loadDefaultOptions() {
    // Transports
    if (!this.options.transports || this.options.transports.length === 0) {
      this.options.transports = ['console'];
    }

    // Color
    if (!this.options.color) {
      this.options.color = false;
    }

    // Log path
    if (!this.options.logPath) {
      const appRoot = path.dirname(__dirname);
      this.options.logPath = path.resolve(appRoot, './log');
    }

    // Log entries
    if (!this.options.logentriesToken) {
      this.options.logentriesToken = '';
    }
  }

  /**
   * Run through every available config level and add
   * into this.winstonConfig property to be used for event
   * emition in winston lib.
   */
  setTransports() {
    this.winstonConfig.transports = this.options.transports
                                                .map(transport => new LoggerTransport()[transport])
                                                .filter(transport => transport)
                                                .map(transport => transport.call({}, {
                                                  options: this.options,
                                                  winstonConfig: this.winstonConfig
                                                }));
  }

  /**
   * Execute the winston logger foor given level
   * @param {Object} log Log object
   * @return {EventEmitter} Tot he specified transport level
   */
  execute(log) {
    if (typeof log !== 'object') {
      if (typeof log === 'string') {
        log = {
          message: log
        };
      } else {
        log = {message: null};
      }
    }
    log.xRequestId = this.res._headers['x-request-id'];
    log.clientIp   = Toolkit.getIp(this.req);
    return new winston.Logger(this.winstonConfig)[this.winstonConfig.level](log);
  }

  /**
   * Ensure log folder exists, if it's required
   */
  checkIfLogFolderExists() {
    if (this.options.transports.includes('file') || this.options.transports.includes('logrotate')) {
      try {
        fs.mkdirSync(this.options.logPath);
      } catch (e) {
        if (e.code !== 'EEXIST') {
          throw e;
        }
      }
    }
  }

}

module.exports = Logger;
