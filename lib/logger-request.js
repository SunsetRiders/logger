require('winston');
const Logger  = require('./logger');
const Toolkit = require('./util/toolkit');

/**
 * @param {Request} req request object
 * @param {Response} res response object
 * @return {String} log level
 */
function levelFromStatus(req, res) {
  if (res.statusCode < 400) {
    return 'info';
  } else if (res.statusCode < 500) {
    return 'warn';
  } else { // (res.statusCode >= 500)
    return 'error';
  };
}

/**
 * @param {Request} req request object
 * @return {Object} simplified request object
 */
function formatRequest(req) {
  return {
    body: req.body,
    headers: req.headers,
    url: req.url,
    method: req.method,
    ip: Toolkit.getIp(req),
    query: req.query,
    params: req.params,
    startTime: req.startTime
  };
};

/**
 * @param {Response} res response object
 * @return {Object} simplified response object
 */
function formatResponse(res) {
  return {
    body: res.body,
    headers: res.headers,
    responseTime: res.responseTime,
    statusCode: res.statusCode
  };
}

/**
 * It's responsible for handling request.log files
 * It uses express-winston
 */
class RequestLogger {
  /**
   * The middleware
   * @param {Object} [config=undefined] Logger configuration
   * @return {ExpressMiddleware} middleware that will log requests and responses
   */
  middleware(config=undefined) {
    let logger;

    if (config) {
      logger = new Logger(config);
    }

    return function requestLoggerMiddleware(req, res, next) {
      const originalEnd = res.end;
      const middlewareLogger = logger || req.logger;

      req.startTime = (new Date);

      const metadata = {
        xRequestId: req.xRequestId || null
      };

      /* Based on:
       * https://github.com/bithavoc/express-winston/blob/master/index.js#L218-L219
       * and
       * https://nodejs.org/api/http.html#http_response_end_data_encoding_callback
       *
       * Overwriting res.end is a simple way to catch all the responses whenever they end.
       */
      res.end = function(chunk, encoding) {
        res.endTime = (new Date);
        res.responseTime = res.endTime - req.startTime;

        res.end = originalEnd;
        res.end(chunk, encoding);

        req.url = req.originalUrl || req.url;
        const loggerLevel = levelFromStatus(req, res);
        middlewareLogger[loggerLevel]({req: formatRequest(req)}, {res: formatResponse(res)}, metadata);
      };

      next();
    };
  }
};

module.exports = RequestLogger;
