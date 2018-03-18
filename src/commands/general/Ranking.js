const Patron = require('patron.js');
const Discord = require('discord.js');
const Constants = require('../../utility/Constants.js');
const StringUtil = require('../../utility/StringUtil.js');
const NumberUtil = require('../../utility/NumberUtil.js');
const Client = require('../../structures/client.js');
const Logger = require('../../utility/Logger.js');
const { Message, GuildMember } = Discord;

const PlayerModel = require('../../database/models/Player.js');
const SeriesModel = require('../../database/models/Series');

const Player = require('../../components/Player.js');
const Series = require('../../components/Series.js');

class Ranking extends Patron.Command
{
    constructor()
    {
        super
            ({
                names: ['ranking', 'rankings', 'lb'],
                groupName: 'general',
                description: 'Display the overall leaderboard of at most 50 players',
            });
    }

    /**
     * 
     * @param {Message} message 
     */
    async run(message, args)
    {
        var players = await Client.database.getPlayerList();
        var nonTBDPlayers = players.filter((input) => Player.getTotalGames(input) >= Player.TBDGamesCount);
        var TBDPlayers = players.filter((input) => Player.getTotalGames(input) < Player.TBDGamesCount);
        var highTier = nonTBDPlayers.filter((input) => input.elo >= 1200);
        var lowTier = nonTBDPlayers.filter((input) => input.elo < 1200);

        var randomColour = Constants.getRandomColor();
        var embed = new Discord.RichEmbed()
            .setColor(randomColour)
            .setTitle("Competitive Bloons 2.0 Rankings")
            .setDescription("If you are in the **To Be Determined (TBD)** section, you have to play the amount games left stated to calibrate your ELO.")
            .addField("High Tier (ELO >= 1200)", getRankingTierString(highTier))
            .addField("Low Tier (ELO < 1200)", getRankingTierString(lowTier))
            .addField("To Be Determined", getRankingTierString(TBDPlayers, true))
            .setTimestamp(new Date());
        message.channel.send(embed);

        /**
         * 
         * @param {PlayerModel[]} players
         */
        function getRankingTierString(playerTier, tbd = false)
        {
            var tierString = "";
            for (var index = 0; index < playerTier.length; index++)
            {
                var element = playerTier[index];
                tierString +=
                    StringUtil.markdownCodeLinify("#" + NumberUtil.pad(getRankValue(), 2)) + " \t " +
                    StringUtil.markdownCodeLinify(Player.getDisplayELO(element)) + " \t " +
                    StringUtil.boldify(element.name) +
                    "\n";

                function getRankValue()
                {
                    if (!tbd)
                    {
                        return (nonTBDPlayers.indexOf(element) + 1);
                    }
                    else
                    {
                        return (TBDPlayers.indexOf(element) + nonTBDPlayers.length + 1);
                    }
                }
            }

            return tierString.length == 0 ? "No players." : tierString;
        }
    }
}

module.exports = new Ranking();