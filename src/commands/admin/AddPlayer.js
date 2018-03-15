const Patron = require('patron.js');
const Discord = require('discord.js');
const Constants = require('../../utility/Constants.js');
const StringUtil = require('../../utility/StringUltil.js')
const NumberUtil = require('../../utility/NumberUtil.js')
const Client = require('../../structures/client.js')
const Logger = require('../../utility/Logger.js')
const { Message, GuildMember } = Discord;

const Player = require('../../database/models/Player.js')

class AddPlayer extends Patron.Command
{
    constructor()
    {
        super(
            {
                names: ['addplayer', 'ap', 'register'],
                groupName: 'admin',
                description: 'Add the player into the ranking system.',
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
        message.channel.send(member.user.username + "#" + member.user.discriminator);

        var result = await Client.database.Players.findOne({});
        var count = result.count;
        var playerId = 'p' + NumberUtil.pad(count++, 4);
        var player = new Player();
        player._id = playerId;
        player.discordId = member.id;
        player.name = member.displayName;

        Client.database.Players.insertOne(player, (err, reseult) =>
        {
            if (err)
            {
                Logger.handleError(err.message);
                return message.channel.send("Error inserting player!");
            }
            Client.database.Players.updateOne({}, { $set: { count: count } });

            var randomColour = Constants.getRandomColor();
            var embed = new Discord.RichEmbed();
            embed.setTitle("Add Player");
            embed.setColor(randomColour);
            embed.setDescription("Added Player " + player.name);

            return message.channel.send(embed);
        });
    }
}

module.exports = new AddPlayer();
