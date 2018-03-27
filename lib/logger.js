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
    this.blacklist = ["password", "pass"];
  }

  /**
   * @param {[Any]} data it will be converted to "message" attribute.
   * @param {Object} metadata Metadata that will be logged along with any other data passed to it
   */
  debug(...data) {
    const filteredData = this.maskBlacklistAttributes(this.blacklist, data);
    this.baseLogger.debug(this.context(filteredData));
  }

  /**
   * @param {[Any]} data it will be converted to "message" attribute.
   * @param {Object} metadata Metadata that will be logged along with any other data passed to it
   */
  error(...data) {
    const filteredData = this.maskBlacklistAttributes(this.blacklist, data);
    this.baseLogger.error(this.context(filteredData));
  }

  /**
   * @param {[Any]} data it will be converted to "message" attribute.
   * @param {Object} metadata Metadata that will be logged along with any other data passed to it
   */
  info(...data) {
    const filteredData = this.maskBlacklistAttributes(this.blacklist, data);
    this.baseLogger.info(this.context(filteredData));
  }

  /**
   * @param {[Any]} data it will be converted to "message" attribute.
   * @param {Object} metadata Metadata that will be logged along with any other data passed to it
   */
  verbose(...data) {
    const filteredData = this.maskBlacklistAttributes(this.blacklist, data);
    this.baseLogger.verbose(this.context(filteredData));
  }

  /**
   * @param {[Any]} data it will be converted to "message" attribute.
   * @param {Object} metadata Metadata that will be logged along with any other data passed to it
   */
  warn(...data) {
    const filteredData = this.maskBlacklistAttributes(this.blacklist, data);
    this.baseLogger.warn(this.context(filteredData));
  }

  /**
   * @param {[Any]} data it will be converted to "message" attribute.
   * @param {Object} metadata Metadata that will be logged along with any other data passed to it
   */
  log(...data) {
    const filteredData = this.maskBlacklistAttributes(this.blacklist, data);
    this.baseLogger.log(this.context(filteredData));
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

  /**
   * Remove all references to a blacklisted attribute in a object or array
   */
  maskBlacklistAttributes(blacklist, object) {
    //verify if object is not an array or object
    let mutableObject = object;
    const keys = Object.keys(mutableObject);
    if (!keys || typeof mutableObject === "string") {
      return mutableObject;
    }
    
    //remove the password
    for (let index in keys) {
      const key = keys[index];
      const subObject = mutableObject[key];
      if (blacklist.includes(key)){
        mutableObject[key] = "FILTERED";
        continue;
      }

      if (typeof subObject === "object"){
        mutableObject[key] = this.maskBlacklistAttributes(blacklist, subObject);
      }
    }

    return mutableObject;
  }
}

module.exports = Logger;
