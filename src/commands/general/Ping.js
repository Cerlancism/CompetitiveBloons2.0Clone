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
        guildOnly: false,
      });
  }

  /** 
   * @param {Message} msg 
   */
  async run(msg)
  {
    var dbPingStart = Date.now();
    var dbPingTask = Client.database.db.admin().ping();

    var randomColour = Constants.getRandomColor();
    var embed = new Discord.RichEmbed();
    embed.setAuthor("Test Command");
    embed.setColor(randomColour);
    embed.setDescription("Pong!");

    /**@type {Message} */
    var response = await msg.channel.send(StringUtil.markdownCodeLinify("Loading..."));
    var BotDelay = response.createdAt.getTime() - msg.createdAt.getTime();

    var pingResponse = await dbPingTask;
    var DatabaseDelay = pingResponse.ok == 1 ? (Date.now() - dbPingStart) : "Error";

    return await response.edit(
      `${StringUtil.markdownCodeLinify(`Bot delay: ${BotDelay} ms`)}\n` +
      `${StringUtil.markdownCodeLinify(`Database delay: ${DatabaseDelay} ms`)}`, embed);
  }
}

module.exports = new Ping();