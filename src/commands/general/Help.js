const patron = require('patron.js');
const Discord = require('discord.js');
const Message = Discord.Message;
const constants = require('../../utility/Constants.js');

var DiscordMessage = Discord.Message;

class Help extends patron.Command
{
  constructor()
  {
    super({
      names: ['help'],
      groupName: 'general',
      description: 'Help Command'
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
    responseEmbed.setAuthor("Help")
    responseEmbed.setColor(randomColour)
    responseEmbed.setDescription("This is a utility bot for competitive Bloons TD Battles.")
    responseEmbed.addField("Commands", "`!map` \n`!strat`\n`!ping`")
    return msg.channel.send(responseEmbed);
  }
}

module.exports = new Help();
