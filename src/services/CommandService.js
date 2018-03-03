const patron = require('patron.js');
const handler = require('../structures/handler.js');
const discord = require('discord.js');
const Logger = require('../utility/Logger.js');
const Constants = require('../utility/Constants.js');

class CommandService {
  async run(msg) {
    if (msg.author.bot === true || Constants.prefixRegex.test(msg.content) === false) {
      return; // Return if the author is a bot or if the message content starts with the prefix (a regex is faster that str.startsWith()).
    }

    const inGuild = msg.guild !== null; // If the guild isn't null, the message is necessarily being sent in a guild.

    Logger.log('Message Id: ' + msg.id + ' | User Id: ' + msg.author.id + (inGuild ? ' | Guild Id: ' + msg.guild.id : '') + ' | User: ' + msg.author.tag + (inGuild ? ' | Guild: ' + msg.guild.name : '') + ' | Content: ' + msg.content, 'DEBUG'); // Debug log all commands *before* execution begins.

    const result = await handler.run(msg, Constants.prefix); // Execute the command. The prefix is solely provided to slice the prefix length off the message content, patron.js does no prefix checks itself in order to support dynamic prefixes.

    if (result.success === false) { // If the result was unsuccessful, handle the error.
      let message;

      switch (result.commandError) {
        case patron.CommandError.CommandNotFound:
          return; // Return if the error was simply that the command was not found. You may remove this return, however, it is often recommended to silently fail if a command does not exist.
        case patron.CommandError.Exception:
          if (result.error.code instanceof discord.DiscordAPIError) { // Handle all discord related errors. More information on error codes may be found here: https://discordapp.com/developers/docs/topics/response-codes.
            if (result.error.code === 400) {
              message = 'There seems to have been a bad request. Please report this issue.';
            } else if (result.error.code === 0 || result.error.code === 404 || result.error.code === 50013) {
              message = 'I do not have permission to do that.';
            } else if (result.error.code === 50007) {
              message = 'I do not have permission to DM this user. Enabling the DM Privacy Settings for this server may solve this issue.';
            } else if (result.error.code >= 500 && result.error.code < 600) {
              message = 'An error has occurred on Discord\'s part. Sorry, nothing we can do.';
            } else {
              message = result.errorReason;
            }
          } else {
            message = result.errorReason;
            Logger.handleError(result.error); // Log the error if it did not come from discord.
          }
          break;
        case patron.CommandError.InvalidArgCount:
          message = 'You are incorrectly using this command.\n**Usage:** `' + Constants.prefix + result.command.getUsage() + '`\n**Example:** `' + Constants.prefix + result.command.getExample() + '`'; // Respond with an explanation on how to use the command if the argument count is too low.
          break;
        default:
          message = result.errorReason; // Default to the base error reason if none of the cases matched.
          break;
      }

      Logger.log('Unsuccessful command result: ' + msg.id + ' | Reason: ' + result.errorReason, 'DEBUG'); // Log unsuccessful command results.

      return msg.reply(message) // Reply the error reason.
        .catch(() => null); // Ignore any rejected promises, as they would all be permission errors from people who tried to use commands in a channel in which your bot cannot send messages.
    }

    Logger.log('Successful command result: ' + msg.id, 'DEBUG'); // Log successful command results. Useful for finding hanging commands, or commands that take too long to execute.
  }
}

module.exports = new CommandService();
