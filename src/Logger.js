const createLogger = (logLevel='DEBUG', withTimeStamp=true) => {
  return {
    LOGGING_LEVEL_MAP: {
      DEBUG: 0,
      INFO: 1,
      WARN: 2,
      ERROR: 3,
      FATAL: 4,
    },
    _level: logLevel,
    _withTimeStamp: withTimeStamp,
    _getLevelWeight: function (lvA) {
      if (typeof lvA !== 'string') return -1;
      for (let levName of Object.keys(this.LOGGING_LEVEL_MAP)) {
        if (lvA.trim().toUpperCase() === levName.trim().toUpperCase())
          return this.LOGGING_LEVEL_MAP[levName];
      }
      return -1;
    },
    _isLvlHeavierOrEquanThan: function (lvA, lvB) {
      return this._getLevelWeight(lvA) >= this._getLevelWeight(lvB); 
    },
    _shouldLog: function (loggingLv) {return this._isLvlHeavierOrEquanThan(loggingLv, this._level)},
    _log: function (loggingLv, ...content) {
      if (this._shouldLog(loggingLv)){
        if (this._withTimeStamp) 
          content.splice(0, 0, `[${this._getTimeStamp()}]`);
        console.log(...content);
      }
    },
    _getTimeStamp () { return new Date().toISOString()},
    setLoggingLevel: function (level) {
      if (this._getLevelWeight(level) === -1) {
        this.info(`Failed to change logging level. Invalid indicator '${level}'. Logging level unchanged as ${this._level}`);
        return;
      }
      this.info(`Changing logging level to ${level.trim().toUpperCase()}`);
      this._level = level.trim().toUpperCase();
    },
    setWithTimeStamp: function (isWithTimeStamp) {this._withTimeStamp=isWithTimeStamp},
    debug: function (...content) {this._log('DEBUG', '[DEBUG]', ...content)},
    info: function (...content) {this._log('INFO', '[INFO]', ...content)},
    warn: function (...content) {this._log('WARN', '[WARN]', ...content)},
    error: function (...content) {this._log('ERROR', '[ERROR]', ...content)},
    fatal: function (...content) {this._log('FATAL', '[FATAL]', ...content)},
  }
}

const centralisedLoggerInstance = createLogger('DEBUG', true);

module.exports = {
  createLogger,
  centralisedLoggerInstance
}