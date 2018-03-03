const patron = require('patron.js');
const Discord = require('discord.js');
const Message = Discord.Message;
const constants = require('../../utility/Constants.js');

var DiscordMessage = Discord.Message;

class Ping extends patron.Command
{
  constructor()
  {
    super({
      names: ['ping'],
      groupName: 'general',
      description: 'Test Command'
    });
  }


  /**
   * 
   * @param {Message} msg
   */
  async run(msg)
  {
    var randomColour = constants.colourArray[Math.floor(Math.random() * constants.colourArray.length)];

    var responseEmbed = new Discord.RichEmbed();
    responseEmbed.setAuthor("Test Command")
    responseEmbed.setColor(randomColour)
    responseEmbed.setDescription("Pong!")
    var response = msg.channel.send(responseEmbed);
    return response.then(
      /**
       * @param {Message} m
       */
      (m) =>
      {
        var delay = m.createdAt.getTime() - msg.createdAt.getTime();
        m.edit("`Bot delay: " + delay + " ms`", responseEmbed);
      })
  }
}

module.exports = new Ping();
