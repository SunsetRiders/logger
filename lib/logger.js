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
    this.baseLogger = baseLogger;
  }

  /**
   * 
   * @param {*} level 
   */
  changeLevel(level) {
    if (this.internalLogger.transports.file) {
      this.internalLogger.transports.file.level = level;
    }

    if (this.internalLogger.transports.console) {
      this.internalLogger.transports.console.level = level;
    }

    if (this.internalLogger.transports.logentries) {
      this.internalLogger.transports.logentries.level = level;
    }
  }

  /**
   * @param {[Any]} data it will be converted to "message" attribute.
   * @param {Object} metadata Metadata that will be logged along with any other data passed to it
   */
  debug(...data) {
    this.config.level = 'debug';
    this.internalLogger = this.baseLogger || this.defaultInternalLogger();
    this.internalLogger.debug(this.message(data), this.context(data));
  }

  /**
   * @param {[Any]} data it will be converted to "message" attribute.
   * @param {Object} metadata Metadata that will be logged along with any other data passed to it
   */
  error(...data) {
    this.config.level = 'error';
    this.internalLogger = this.baseLogger || this.defaultInternalLogger();
    this.internalLogger.error(this.message(data), this.context(data));
  }

  /**
   * @param {[Any]} data it will be converted to "message" attribute.
   * @param {Object} metadata Metadata that will be logged along with any other data passed to it
   */
  info(...data) {
    this.config.level = 'info';
    this.internalLogger = this.baseLogger || this.defaultInternalLogger();
    this.internalLogger.info(this.message(data), this.context(data));
  }

  /**
   * @param {[Any]} data it will be converted to "message" attribute.
   * @param {Object} metadata Metadata that will be logged along with any other data passed to it
   */
  verbose(...data) {
    this.config.level = 'verbose';
    this.internalLogger = this.baseLogger || this.defaultInternalLogger();
    this.internalLogger.verbose(this.message(data), this.context(data));
  }

  /**
   * @param {[Any]} data it will be converted to "message" attribute.
   * @param {Object} metadata Metadata that will be logged along with any other data passed to it
   */
  warn(...data) {
    this.config.level = 'warn';
    this.internalLogger = this.baseLogger || this.defaultInternalLogger();
    this.internalLogger.warn(this.message(data), this.context(data));
  }

  /**
   * @param {[Any]} data it will be converted to "message" attribute.
   * @param {Object} metadata Metadata that will be logged along with any other data passed to it
   */
  log(...data) {
    this.config.level = 'info';
    this.internalLogger = this.baseLogger || this.defaultInternalLogger();
    this.internalLogger.info(this.message(data), this.context(data));
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
