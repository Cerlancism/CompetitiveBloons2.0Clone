const Patron = require('patron.js');
const Discord = require('discord.js');
const Constants = require('../../utility/Constants.js');
const StringUtil = require('../../utility/StringUtil.js')
const Client = require('../../structures/client.js')
const { Message } = Discord;

class Ping extends Patron.Command
{
  constructor()
  {
    super
      ({
        names: ['ping'],
        groupName: 'general',
        description: 'Test Command',
        guildOnly: false
      });
  }

  /** 
   * @param {Message} param 
   */
  async run(param)
  {
    var dbPingStart = Date.now();
    var dbPingTask = Client.database.db.admin().ping();

    var randomColour = Constants.getRandomColor();
    var embed = new Discord.RichEmbed();
    embed.setAuthor("Test Command");
    embed.setColor(randomColour);
    embed.setDescription("Pong!");

    /**@type {Message} */
    var response = await param.channel.send(StringUtil.markdownCodeLine("Loading..."));
    var BotDelay = response.createdAt.getTime() - param.createdAt.getTime();

    var pingResponse = await dbPingTask;
    var DatabaseDelay = pingResponse.ok == 1 ? (Date.now() - dbPingStart) : "Error";

    return await response.edit(
      `${StringUtil.markdownCodeLine(`Bot delay: ${BotDelay} ms`)}\n` +
      `${StringUtil.markdownCodeLine(`Database delay: ${DatabaseDelay} ms`)}`, embed);
  }
}

module.exports = new Ping();