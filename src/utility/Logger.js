const DateUtil = require('./DateUtil.js');

class Logger {
  log(message, level) {
    const date = new Date();
    const formattedMessage = this.formatMessage(message, level, date);

    console.log(formattedMessage);
  }

  formatMessage(message, level, date) {
    return DateUtil.UTCTime(date) + ' [' + level + '] ' + message;
  }

  handleError(err) {
    return this.log(err.stack, 'ERROR');
  }
}

module.exports = new Logger();
