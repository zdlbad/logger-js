const {createLogger} = require('../src/Logger');

const log = createLogger('DEBUG', true);

log.debug(' <<< logging at DEBUG, you cannot see this after level changed to INFO');
log.setLoggingLevel('invalid');
log.setLoggingLevel('iNfO');
log.debug(' <<< logging at DEBUG, you cannot see this after level changed to INFO');
log.warn(' <<< logging');
log.setWithTimeStamp(false);
log.fatal(' <<< logging');