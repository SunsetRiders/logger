const winstonLoggerFactory = require('./winston-logger-factory');
const _ = require('lodash');

/**
 * This is a basic logger interface
 */
class Logger {
  /**
   * @constructor
   * @param {Object} config Logger configuration
   * @param {[String]} config.transports possible values are any combination of [console, logentries, file]
   * @param {String} config.level possible values [info, warn, error, verbose, debug]
   * @param {String} config.logentriesToken token for logentries transport
   * @param {String} config.logPath path were log files will be logged to
   * @param {Object} metadata Metadata that will be logged along with any other data passed to it
   * @param {Object} [baseLogger=defaultInternalLogger()] logger that will be used to log
   * @param {Array} blacklist Array of string with keys to be masked
   */
  constructor(config, metadata, baseLogger = undefined, blacklist = ['password', 'pass']) {
    this.config = config;
    this.metadata = metadata;
    this.baseLogger = baseLogger || this.defaultInternalLogger();
    this.blacklist = blacklist;
  }

  /**
   * @param {[Any]} data it will be converted to "message" attribute.
   * @param {Object} metadata Metadata that will be logged along with any other data passed to it
   */
  debug(...data) {
    this.baseLogger.debug(this.context(data));
  }

  /**
   * @param {[Any]} data it will be converted to "message" attribute.
   * @param {Object} metadata Metadata that will be logged along with any other data passed to it
   */
  error(...data) {
    this.baseLogger.error(this.context(data));
  }

  /**
   * @param {[Any]} data it will be converted to "message" attribute.
   * @param {Object} metadata Metadata that will be logged along with any other data passed to it
   */
  info(...data) {
    this.baseLogger.info(this.context(data));
  }

  /**
   * @param {[Any]} data it will be converted to "message" attribute.
   * @param {Object} metadata Metadata that will be logged along with any other data passed to it
   */
  verbose(...data) {
    this.baseLogger.verbose(this.context(data));
  }

  /**
   * @param {[Any]} data it will be converted to "message" attribute.
   * @param {Object} metadata Metadata that will be logged along with any other data passed to it
   */
  warn(...data) {
    this.baseLogger.warn(this.context(data));
  }

  /**
   * @param {[Any]} data it will be converted to "message" attribute.
   * @param {Object} metadata Metadata that will be logged along with any other data passed to it
   */
  log(...data) {
    this.baseLogger.log(this.context(data));
  }

  /**
    * @param {[Any]} data
   * @return {Object}
   */
  extractError(data) {
    let result = data;
    if (data instanceof Error) {
      result = {
        message: data.message,
        stack: data.stack
      };
    }
    return result;
  }

  /**
   * @param {[Any]} data that was passed to any log method
   * @param {Object} metadata Metadata that will be logged along with any other data passed to it
   * @return {Object} representing the context of that log
   */
  context(data) {
    // Mask desired properties
    data = this.maskBlacklistAttributes(data);
    let result = null;
    if (Array.isArray(data)) {
      result = {};
      data.forEach((value, index) => {
        result[`[Log-${index}]`] = this.extractError(value);
      });
    } else {
      result = {'[Log-0]': data};
    }
    return Object.assign({}, result, this.metadata);
  }

  /**
   * The default logger
   * @return {Logger} that will be used internally
   */
  defaultInternalLogger() {
    return winstonLoggerFactory(this.config);
  }

  /**
   * The default logger
   * @param {Any} object Any kind of type
   * @return {Logger} that will be used internally
   */
  maskBlacklistAttributes(object) {
    // Verify if object is not an array or object
    let mutableObject = object;
    if (mutableObject && (Array.isArray(mutableObject) || typeof mutableObject === 'object')) {
      const keys = Object.keys(mutableObject);
      if (!keys || typeof mutableObject === 'string') {
        return mutableObject;
      }

      // Remove the password
      for (let index in keys) {
        if (keys[index]) {
          const key = keys[index];
          const subObject = mutableObject[key];
          if (this.blacklist.includes(key)) {
            mutableObject[key] = '**MASKED**';
            continue;
          }

          if (typeof subObject === 'object') {
            mutableObject[key] = this.maskBlacklistAttributes(subObject);
          }
        }
      }
    }
    return mutableObject;
  }
}

module.exports = Logger;
