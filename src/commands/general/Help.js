const Patron = require('patron.js');
const Discord = require('discord.js');
const Constants = require('../../utility/Constants.js');

class Help extends Patron.Command
{
  constructor()
  {
    super({
      names: ['help'],
      groupName: 'general',
      description: 'Help Command',
      guildOnly: false
    });
  }

  async run(msg)
  {
    var randomColour = Constants.getRandomColor();

    var responseEmbed = new Discord.RichEmbed();
    responseEmbed.setAuthor("Help");
    responseEmbed.setColor(randomColour);
    responseEmbed.setDescription("This is an utility bot for competitive Bloons TD Battles.");
    responseEmbed.addField("Commands", "`!map` \n`!strat`\n`!ping`");
    return msg.channel.send(responseEmbed);
  }
}

module.exports = new Help();
