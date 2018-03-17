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
                                example: 'Test#1234',
                            }),
                        new Patron.Argument
                            ({
                                key: 'elo',
                                name: 'elo? = 1200',
                                type: 'float',
                                defaultValue: 1200,
                                example: '1200',
                                remainder: true
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

        var trackerId = 'p' + NumberUtil.pad(Client.database.generatePlayerTrackerId(), 4);
        var player = new Player();
        player._id = trackerId;
        player.discordId = member.id;
        player.name = member.displayName;
        player.elo = args.elo;

        var embed = new Discord.RichEmbed();
        var randomColour = Constants.getRandomColor();
        embed.setColor(randomColour);
        embed.setAuthor(member.displayName, member.user.displayAvatarURL.replace("size=2048", "size=64"));

        Client.database.Players.insertOne(player, async (err, reseult) =>
        {
            if (err)
            {
                Logger.handleError(err);

                embed.setTitle("Error inserting player!");
                embed.setDescription(StringUtil.markdownCodeBlockify(err.message))

                /**@type {Message} */
                var response = await messageTask;
                return response.edit(embed);
            }

            embed.setTitle("Added Player");
            embed.setDescription(
                StringUtil.boldify("Added Player: ") + player.name + "\n" +
                StringUtil.boldify("Player Id: ") + player._id + "\n" +
                StringUtil.boldify("Discord Id: ") + player.discordId + "\n" +
                StringUtil.boldify("ELO: ") + player.elo);
            embed.setFooter("Join date");
            embed.setTimestamp(player.joinDate);

            /**@type {Message} */
            var response = await messageTask;
            return response.edit(embed);
        });
    }
}

module.exports = new AddPlayer();