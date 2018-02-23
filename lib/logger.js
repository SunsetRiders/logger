const winstonLoggerFactory = require('./winston-logger-factory');
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
   */
  constructor(config, metadata, baseLogger = undefined) {
    this.config = config;
    this.metadata = metadata;
    this.baseLogger = baseLogger || this.defaultInternalLogger();
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
}

module.exports = Logger;
