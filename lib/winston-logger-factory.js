const winston = require('winston');
const WinstonLogger = winston.Logger;
const winstonTransports = require('./winston-transports');

/**
 * Provides a sane default configuration
 * @return {Object} default configs
 */
const defaultConfig = {
  transports: ['console'],
  level: 'info'
};

/**
 * Factory for building winston.Loggers
 *
 * @param {Object} config Logger configuration
 * @param {[String]} [config.transports=["console"]] possible values are any combination of [console, logentries, file]
 * @param {String} [config.level="info"] possible values [info, warn, error, verbose, debug]
 * @param {String} [config.logentriesToken] token for logentries transport
 * @param {String} [config.logPath] path were log files will be logged to
 * @return {Logger} winstong logger configured
 */
function winstonLoggerFactory(config) {
  const configWithDefaults = Object.assign({}, defaultConfig, config);
  const transportsList = [].concat(configWithDefaults.transports);
  const transports = transportsList.map((transport) => winstonTransports[transport](config));

  const logger = new WinstonLogger({
    level: configWithDefaults.level,
    transports
  });

  return logger;
}

module.exports = winstonLoggerFactory;
