const LoggerDefault = require('./logger-default');

/**
 * LoggerPromise is a handler/toolkit to work
 * together with Promise objects in Logger
 */
class LoggerPromise {

  /**
    * Convert anything to JSON
    * @return {String} object
    * @param {Any} value Any value to be transformed into a JSON object
    */
  static convertToJson(value) {
    if (!value) {
      value = {};
    }
    // return JSON.parse(JSON.stringify(something, Object.getOwnPropertyNames(something)));
    return JSON.parse(JSON.stringify(value));
  }

  /**
    * Log promise then
    * @param {Any} result Result
    * @param {String} api Api
    * @param {Any} params Params
    * @return {Object} Result object
    */
  static logThen(result, api, params) {
    params = params || {};
    const logger = new LoggerDefault().execute();
    logger.info({
      api,
      params,
      result: LoggerPromise.convertToJson(result),
      end: false
    });
    return result;
  }

  /**
   * Log promise catch
   * @param {Object} err Error object
   * @param {String} api Api
   * @param {Any} params Params
   */
  static logCatch(err, api, params) {
    params = params || {};
    const logger = new LoggerDefault().execute();
    logger.error({
      api,
      params,
      error: LoggerPromise.convertToJson(err),
      end: false
    });
    throw err;
  }

  /**
   * Log promise finally
   * @param {Any} result Result
   * @param {String} api Api
   * @param {Any} params Params
   */
  static logFinally(result, api, params) {
    params = params || {};
    result = result || {};
    const logger = new LoggerDefault().execute();
    logger.info({
      api,
      result: LoggerPromise.convertToJson(result),
      params,
      end: true
    });
  }

  /**
   * Facade promise logger
   * @param {String} api Api
   * @param {Any} params Params
   * @return {Object} Returns a list of operations to be used in pŕomise chain
   */
  static facade(api, params) {
    return {
      return: result => LoggerPromise.logThen(result, api, params),
      throw: err     => LoggerPromise.logCatch(err, api, params),
      final: result  => LoggerPromise.logFinally(result, api, params)
    };
  }

}

module.exports = LoggerPromise;
