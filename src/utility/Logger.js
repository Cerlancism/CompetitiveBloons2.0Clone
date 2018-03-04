const DateUtil = require('./DateUtil.js');

class Logger
{
  constructor()
  {
    this.ConsoleColors =
      {
        FgGreen: "\x1b[32m",
        FgCyan: "\x1b[36m",
        FgRed: "\x1b[31m",
        BgBlack: "\x1b[40m",
        Reset: "\x1b[0m"
      }
  }

  log(message, level)
  {
    const date = new Date();
    const formattedMessage = this.formatMessage(message, level, date);

    console.log(this._getConsoleColors(level), formattedMessage);
  }

  formatMessage(message, level, date)
  {
    return DateUtil.UTCTime(date) + ' [' + level + '] ' + message;
  }

  handleError(err)
  {
    return this.log(err.stack, 'ERROR');
  }

  _getConsoleColors(level)
  {
    switch (level)
    {
      case 'INFO':
        return this.ConsoleColors.FgGreen
        break;

      case 'DEBUG':
        return this.ConsoleColors.FgCyan
        break;

      case 'ERROR':
        return this.ConsoleColors.FgRed;
        break;

      default:
        return this.ConsoleColors.Reset;
        break;
    }
  }
}

module.exports = new Logger();
