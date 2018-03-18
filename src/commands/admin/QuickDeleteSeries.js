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
                names: ['quickdeleteseries', 'qds'],
                groupName: 'admin',
                description: 'Quickly delete a series but may reduce stats integrity.',
                args:
                    [
                        new Patron.Argument
                            ({
                                type: 'string',
                                name: 'series Id',
                                key: 'seriesId',
                                example: 's0001'
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
        var id = args.seriesId;

        /**@type {SeriesModel} */
        var series = await Client.database.getOneSerieByIds(id);
        if (!series)
        {
            return await message.reply("Series not found: " + id);
        }
        var responseTask = message.reply(StringUtil.markdownCodeLinify("Processing..."));
        var players = await Client.database.getPlayerSetByIds([series.player1Id, series.player2Id]);
        var player1 = players.find((input) => input._id == series.player1Id);
        var player2 = players.find((input) => input._id == series.player2Id);

        player1.wins -= series.player1Score;
        player2.wins -= series.player2Score;
        player1.losses -= series.player2Score;
        player2.losses -= series.player1Score;

        var player1HistoryIndex = player1.seriesHistoryIds.indexOf(series._id);
        var player2HistoryIndex = player2.seriesHistoryIds.indexOf(series._id);

        player1.seriesHistoryIds.splice(player1HistoryIndex, 1);
        player2.seriesHistoryIds.splice(player2HistoryIndex, 1);

        revertPlayerELO(player1, player1HistoryIndex + 1);
        revertPlayerELO(player2, player2HistoryIndex + 1);
        /**
         * 
         * @param {PlayerModel} player 
         */
        function revertPlayerELO(player, historyIndex)
        {
            var invalidElo = player.eloHistory[historyIndex];
            var offsetElo = invalidElo - player.eloHistory[historyIndex - 1];
            for (var index = historyIndex + 1; index < player.eloHistory.length; index++)
            {
                var element = player.eloHistory[index];
                element -= offsetElo;
            }
            player.elo -= offsetElo;
            player.eloHistory.splice(historyIndex, 1);
        }

        Client.database.deleteOneSeriesbyId(series._id);
        await Client.database.updatePlayerSet([player1, player2]);

        /**@type {Message} */
        var response = await responseTask;
        return await response.edit("Series deleted: " + StringUtil.markdownCodeLinify(id));
    }
}

module.exports = new CreateSeries();