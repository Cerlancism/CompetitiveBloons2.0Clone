const patron = require('patron.js');
const Discord = require('discord.js');
const constants = require('../../utility/Constants.js');
const { Message } = Discord;

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
   * @param {Message} param
   */
  async run(param)
  {
    return param.channel.send("`Loading...`")
      .then(
        /**
         * @param {Message} response
         */
        (response) =>
        {
          var randomColour = constants.colourArray[Math.floor(Math.random() * constants.colourArray.length)];
          var embed = new Discord.RichEmbed();
          embed.setAuthor("Test Command");
          embed.setColor(randomColour);
          embed.setDescription("Pong!");
          var delay = response.createdAt.getTime() - param.createdAt.getTime();
          response.edit(`\`Bot delay: ${delay} ms\``, embed);
        });
  }
}

module.exports = new Ping();
