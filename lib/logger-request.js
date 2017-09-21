require('winston');
const expressWinston = require('express-winston');
const Logger         = require('./logger');
const Toolkit        = require("./util/toolkit");

/**
 * It's responsible for handling request.log files
 * It uses express-winston
 */
class RequestLogger extends Logger {

  /**
    * To check the options follow the link below
    * Winston GitHub: https://github.com/winstonjs/winston
    * Express Winston: https://github.com/bithavoc/express-winston
    * @param {Object} options Options
  */
  constructor(options) {
    super({
      bodyBlacklist: ((typeof options === 'object' && options.blackList) ? options.blackList: []),
      meta: true,
      expressFormat: false,
      level: 'request',
      colorize: false,
      ignoreRoute: (req, res) => false,
      // All status level types must be info so it can be correctly sent to logentries
      statusLevels: {
        success: "info",
        warn: "warn",
        error: "error"
      },
      dynamicMeta: (req, res, err) => {
        return {
          xRequestId: res._headers["x-request-id"] || null,
          body: req.body,
          clientIp: Toolkit.getIp(req),
          err: {
            message: ((err && err.message) ? err.message : null),
            stack: ((err && err.stack) ? err.stack : null)
          }
        };
      }
    }, options);
    // Override the current execute method
    this.execute = expressWinston.logger(this.winstonConfig);
  }

}

module.exports = RequestLogger;
