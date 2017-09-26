const winston           = require('winston');
const WinstonLogger     = winston.Logger;
const winstonTransports = require('./winston-transports');
const path              = require('path');
const fs                = require('fs');

/**
 * Provides a sane default configuration
 * @return {Object} default configs
 */
const defaultConfig = {
  transports: ['console'],
  level: 'info',
  logPath: path.resolve(path.dirname(__dirname), 'log')
               .replace('node_modules/logger/','')
};

  /**
   * Check if log file folder exists
   * if don't exists create it
   * @param {Objects} configWithDefaults 
   */
  function checkIfLogFolderExists(configWithDefaults) {
    if (configWithDefaults.transports.includes('file')) {
      try {
        fs.mkdirSync(configWithDefaults.logPath);
      } catch (e) {
        if (e.code !== 'EEXIST') {
          throw e;
        }
      }
    }
  }

  /**
   * Merge default and customized configuration 
   * @param {*} defaultConfig 
   * @param {*} config 
   * @return {Object} Returns a merged configuration object
   */
  function mergeConfig(defaultConfig, config) {
    return Object.assign({}, defaultConfig, config);
  }

/**
 * Factory for building winston.Loggers
 *
 * @param {Object} config Logger configuration
 * @param {[String]} [config.transports=["console"]] possible values are any combination of [console, logentries, file]
 * @param {String} [config.level="info"] possible values [info, warn, error, verbose, debug]
 * @param {String} [config.logentriesToken] tokconfigen for logentries transport
 * @param {String} [config.logPath] path were log files will be logged to
 * @return {Logger} winstong logger configured
 */
function winstonLoggerFactory(config) {
  const configWithDefaults = mergeConfig(defaultConfig, config);
  checkIfLogFolderExists(configWithDefaults);
  console.log(configWithDefaults);
  return new WinstonLogger(Object.assign(
    {
      transports: [].concat(configWithDefaults.transports)
                    .map((transport) => winstonTransports[transport](configWithDefaults))
    }
  ));
}

module.exports = winstonLoggerFactory;
