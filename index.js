const logger = require('./src/Logger');
module.exports = {
  CentralLogger: logger.centralisedLoggerInstance, 
  createLogger: logger.createLogger
}