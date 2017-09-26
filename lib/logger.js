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
    this.baseLogger.debug(this.message(data), this.context(data));
  }

  /**
   * @param {[Any]} data it will be converted to "message" attribute.
   * @param {Object} metadata Metadata that will be logged along with any other data passed to it
   */
  error(...data) {
    this.baseLogger.error(this.message(data), this.context(data));
  }

  /**
   * @param {[Any]} data it will be converted to "message" attribute.
   * @param {Object} metadata Metadata that will be logged along with any other data passed to it
   */
  info(...data) {
    this.baseLogger.info(this.message(data), this.context(data));
  }

  /**
   * @param {[Any]} data it will be converted to "message" attribute.
   * @param {Object} metadata Metadata that will be logged along with any other data passed to it
   */
  verbose(...data) {
    this.baseLogger.verbose(this.message(data), this.context(data));
  }

  /**
   * @param {[Any]} data it will be converted to "message" attribute.
   * @param {Object} metadata Metadata that will be logged along with any other data passed to it
   */
  warn(...data) {
    this.baseLogger.warn(this.message(data), this.context(data));
  }

  /**
   * @param {[Any]} data it will be converted to "message" attribute.
   * @param {Object} metadata Metadata that will be logged along with any other data passed to it
   */
  log(...data) {
    this.baseLogger.info(this.message(data), this.context(data));
  }

  /**
   * @param {[Any]} data that was passed to any log method
   * @param {Object} metadata Metadata that will be logged along with any other data passed to it
   * @return {Object} representing the context of that log
   */
  context(data) {
    const dataObjects = data.filter((member) => (typeof member) === 'object');
    const context = Object.assign({}, ...dataObjects, this.metadata);
    return context;
  }

  /**
   * @param {[Any]} data that was passed to any log method
   * @return {String} representing the message of the log
   */
  message(data) {
    const nonObjects = data.filter((member) => (typeof member) !== 'object');
    const message = nonObjects.join(' ');
    return message;
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
