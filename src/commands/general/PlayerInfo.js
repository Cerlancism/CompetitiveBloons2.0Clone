const Patron = require('patron.js');
const Discord = require('discord.js');
const Constants = require('../../utility/Constants.js');
const StringUtil = require('../../utility/StringUtil.js')
const NumberUtil = require('../../utility/NumberUtil.js')
const Client = require('../../structures/client.js')
const Logger = require('../../utility/Logger.js')
const { Message, GuildMember } = Discord;

const Player = require('../../database/models/Player.js')

class PlayerInfo extends Patron.Command
{
    constructor()
    {
        super
            ({
                names: ['playerinfo', 'pi', 'profile'],
                groupName: 'general',
                description: 'Get the player infomation.',
                args:
                    [
                        new Patron.Argument
                            ({
                                key: 'member',
                                name: 'member',
                                type: 'member',
                                defaultValue: null,
                                example: 'Test#1234',
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
        var member = args.member ? args.member : message.member;
        var player = await Client.database.getPlayerByDiscordId(member.id);
        if (!player)
        {
            return await message.channel.send("Player is not registered.");
        }

        var embed = new Discord.RichEmbed();
        var randomColour = Constants.getRandomColor();
        embed.setColor(randomColour);
        embed.setAuthor(member.displayName, member.user.displayAvatarURL.replace("size=2048", "size=64"));
        embed.setTitle("Player Infomation");
        embed.setDescription(
            StringUtil.boldify("Player Id: ") + player._id + "\n" +
            StringUtil.boldify("Discord Id: ") + player.discordId + "\n" +
            StringUtil.boldify("ELO: ") + player.elo + "\n" +
            StringUtil.boldify("Wins: ") + player.wins + "\n" +
            StringUtil.boldify("Losses: ") + player.losses);
        embed.setFooter("Join date");
        embed.setTimestamp(player.joinDate);

        return await message.channel.send(embed);
    }
}

module.exports = new PlayerInfo();