const DateUtil = require('./DateUtil.js');

class Logger
{
  constructor()
  {
    this._ConsoleColors =
      {
        FgGreen: "\x1b[32m",
        FgCyan: "\x1b[36m",
        FgRed: "\x1b[31m",
        BgBlack: "\x1b[40m",
        Reset: "\x1b[0m"
      }

    this.LogLevel =
      {
        INFO: 'INFO',
        DEBUG: 'DEBUG',
        ERROR: 'ERROR',
      }
  }

  log(message, level)
  {
    const date = new Date();
    const formattedMessage = this._formatMessage(message, level, date);

    console.log(this._getConsoleColors(level), formattedMessage);
  }

  debug(message)
  {
    const date = new Date();
    const formattedMessage = this._formatMessage(message, this.LogLevel.DEBUG, date);

    console.log(this._getConsoleColors(this.LogLevel.DEBUG), formattedMessage);
  }

  handleError(err)
  {
    this.log(err.stack, 'ERROR');
  }

  _formatMessage(message, level, date)
  {
    return DateUtil.UTCTime(date) + ' [' + level + '] ' + message;
  }

  _getConsoleColors(level)
  {
    switch (level)
    {
      case 'INFO':
        return this._ConsoleColors.FgGreen
        break;

      case 'DEBUG':
        return this._ConsoleColors.FgCyan
        break;

      case 'ERROR':
        return this._ConsoleColors.FgRed;
        break;

      default:
        return this._ConsoleColors.Reset;
        break;
    }
  }
}

module.exports = new Logger();
