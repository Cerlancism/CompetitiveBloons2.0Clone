const Patron = require('patron.js');
const Discord = require('discord.js');
const Constants = require('../../utility/Constants.js');
const StringUtil = require('../../utility/StringUtil.js')
const NumberUtil = require('../../utility/NumberUtil.js')
const Client = require('../../structures/client.js')
const Logger = require('../../utility/Logger.js')
const { Message, GuildMember } = Discord;

const Player = require('../../database/models/Player.js')

class AddPlayer extends Patron.Command
{
   constructor()
   {
      super
         ({
            names: ['addplayer', 'ap', 'register'],
            groupName: 'admin',
            description: 'Add a player into the ranking system.',
            args:
               [
                  new Patron.Argument
                     ({
                        key: 'member',
                        name: 'member',
                        type: 'member',
                        example: 'Test#1234'
                     })
               ]
         });
   }

   /**
    * 
    * @param {Message} message 
    */
   async run(message, args)
   {
      /**@type {GuildMember} */
      var member = args.member;
      var messageTask = message.channel.send("Adding user: " + member.user.username + "#" + member.user.discriminator);

      var idTracker = await Client.database.Players.findOne({});
      var count = idTracker.count;
      var playerId = 'p' + NumberUtil.pad(count++, 4);
      var player = new Player();
      player._id = playerId;
      player.discordId = member.id;
      player.name = member.displayName;

      var randomColour = Constants.getRandomColor();
      var embed = new Discord.RichEmbed();
      embed.setColor(randomColour);

      Client.database.Players.insertOne(player, async (err, reseult) =>
      {
         if (err)
         {
            Logger.handleError(err);

            embed.setAuthor(member.displayName, member.user.displayAvatarURL);
            embed.setTitle("Error inserting player!");
            embed.setDescription(StringUtil.markdownCodeBlock(err.message))

            /**@type {Message} */
            var response = await messageTask;
            return response.edit(embed);
         }
         Client.database.Players.updateOne({}, { $set: { count: count } });

         embed.setAuthor(member.displayName, member.user.displayAvatarURL);
         embed.setTitle("Add Player");
         embed.setDescription("Added Player " + player.name);

         /**@type {Message} */
         var response = await messageTask;
         return response.edit(embed);
      });
   }
}

module.exports = new AddPlayer();