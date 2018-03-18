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

class Submit extends Patron.Command
{
    constructor()
    {
        super
            ({
                names: ['submit'],
                groupName: 'general',
                description: 'Submit a series into the series pending list.',
                args:
                    [
                        new Patron.Argument
                            ({
                                key: 'series',
                                name: 'series',
                                type: 'series',
                                example: '@Winner#1234 @Losser#1234 2 1',
                            }),
                    ],
                cooldown: 60000
            });
    }

    /**
     * 
     * @param {Message} message 
     */
    async run(message, args)
    {
        /**@type {SeriesModel} */
        var series = args.series;
        /**@type {PlayerModel} */
        var player1 = series.player1;
        /**@type {PlayerModel} */
        var player2 = series.player2;

        if (message.author.id == player1.discordId)
        {
            player1.name = message.member.displayName;
        }

        player1.wins += series.player1Score;
        player2.wins += series.player2Score;
        player1.losses += series.player2Score;
        player2.losses += series.player1Score;

        player1.seriesHistoryIds.push(series._id);
        player2.seriesHistoryIds.push(series._id);

        Series.calculateELO(series, player1, player2);

        var randomColour = Constants.getRandomColor();
        var embed = new Discord.RichEmbed()
            .setColor(randomColour)
            .setTitle("Submitted Series")
            .setDescription(StringUtil.boldify("Series Id: ") + series._id)
            .addField("Player 1", StringUtil.markdownCodeLinify(Player.getDisplayELO(player1)) + " " + player1.name, true)
            .addField("Player 2", StringUtil.markdownCodeLinify(Player.getDisplayELO(player2)) + " " + player2.name, true);
        var messageTask = message.channel.send(embed);

        delete series.player1;
        delete series.player2;

        Client.database.approveSeries(series);
        await Client.database.updatePlayerSet([player1, player2]);

        return await messageTask;
    }
}

module.exports = new Submit();