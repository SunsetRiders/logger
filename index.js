const Toolkit = require('./lib/util/toolkit');
const Logger  = require('./lib/logger');
const LoggerRequest = require('./lib/logger-request');

/**
 * Base module class
 * @example
 * const app = require('express')();
 * const Logger = require('logger');
 * const config = require('getconfig');
 *
 * app.use(Logger.injectLogger(config.logs));
 * app.use(Logger.requestLogger(config.logs));
 *
 * app.get('/', (req, res) => res.send('ok'));
 */
class Index {
  /**
   * Middleware for injecting logger into request object
   * @param {Object} config Configuration object
   * @return {Function} express middleware function
   */
  static injectLogger(config) {
    /**
     * Binds a new logger to each request
     *
     * @param {Object} req Request object
     * @param {Object} res Respons object
     * @param {Function} next Next function
     */
    return function loggerInjectorMiddleware(req, res, next) {
      // Let's keep this flexible, we may want to add more metadata in the future
      const metadata = {
        xRequestId: req.xRequestId || null,
        clientIp: Toolkit.getIp(req)
      };
      req.logger = Index.getLogger(config, metadata);
      next();
    };
  }

  /**
   * Get new logger isntance
   * @param {Object} config Configuration object
   * @param {Object} metadata Metadata object
   * @return {Object} logger object
   */
  static getLogger(config, metadata) {
    return new Logger(config, metadata);
  }

  /**
   * Middleware for request logging
   *
   * @param {Object} config Options object
   * @return {Function} Execute function
   */
  static injectRequestLogger(config) {
    return (new LoggerRequest()).middleware(config);
  }
}

module.exports = Index;
