const {centralisedLoggerInstance: logger} = require('../src/Logger');
const http = require('http');

/** Logging level can be changed during runtime  
 *  
 *  NOTE: 
 *  You must use centralisedLogger to achieve this.
 *  logger instance created from createLogger has its own lvl control.  
 *
 *  How to test: 
 *  Use path: '/show' to show logs
 *  Use path: '/change/[logging-level]' to change logging lvl
 * 
 */
const httpServer = http.createServer();
httpServer.addListener('request', (req, res) => {
  const pathsElements = req.url.split('/').slice(1);
  switch (pathsElements[0]) {
    case 'show': {
      logger.debug(`Request got heading to ${req.url}`);
      logger.info(`Request got heading to ${req.url}`);
      logger.warn(`Request got heading to ${req.url}`);
    }; break;
    case 'change': logger.setLoggingLevel(pathsElements[1]);break;
    default: logger.info(`Unknonwn path elem ${pathsElements[0]}`);
  }
})
httpServer.listen(3000, () => {
  logger.info(`Server is listening on port 3000, Current logging level is ${logger._level}`);
})


