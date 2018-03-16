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

class CreateSeries extends Patron.Command
{
    constructor()
    {
        super
            ({
                names: ['createseries', 'cs'],
                groupName: 'admin',
                description: 'Create a series into the ranking system.',
                args:
                    [
                        new Patron.Argument
                            ({
                                key: 'series',
                                name: 'series',
                                type: 'series',
                                example: '@Winner#1234 @Losser#1234 2 1',
                            }),
                    ]
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

        player1.wins += series.player1Score;
        player2.wins += series.player2Score;
        player1.loss += series.player2Score;
        player2.loss += series.player1Score;

        player1.seriesHistoryIds.push(series._id);
        player2.seriesHistoryIds.push(series._id);

        Series.calculateELO(series, player1, player2);

        delete series.player1;
        delete series.player2;

        await Client.database.approveSeries(series);
        await Client.database.updatePlayer(player1);
        await Client.database.updatePlayer(player2);

        var randomColour = Constants.getRandomColor();
        var embed = new Discord.RichEmbed()
            .setColor(randomColour)
            .setTitle("Created Series")
            .setDescription(StringUtil.boldify("Series Id: ") + series._id)
            .addField("Player 1", StringUtil.markdownCodeLinify(player1.elo.toFixed(0)) + " " + player1.name, true)
            .addField("Player 2", StringUtil.markdownCodeLinify(player2.elo.toFixed(0)) + " " + player2.name, true);
        return await message.channel.send(embed);
    }
}

module.exports = new CreateSeries();