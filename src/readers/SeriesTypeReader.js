const { TypeReader, TypeReaderResult, Command, Argument } = require('patron.js');
const { Message } = require('discord.js');
const Client = require('../structures/client');
const NumberUtil = require('../utility/NumberUtil.js');
const StringUtil = require('../utility/StringUtil.js');
const Database = require('../structures/client.js').database;
const Series = require('../database/models/Series.js');

class SeriesTypeReader extends TypeReader
{
    constructor()
    {
        super({ type: 'series' });
    }

    /**
     * 
     * @param {Command} command
     * @param {Message} message 
     * @param {Argument} argument
     * @param {*} args 
     * @param {String} input 
     */
    async read(command, message, argument, args, input)
    {
        var series = new Series();
        var parts = message.content.split(" ");
        if (message.mentions.members.size == 2 && parts.length == 5)
        {
            var playerDiscordIds = [StringUtil.extractOneDigitSet(parts[1]), StringUtil.extractOneDigitSet(parts[2])];
            var players = await Database.getPlayerSetByDiscordIds(playerDiscordIds);
            var player1 = players.find((input) => input.discordId == playerDiscordIds[0]);
            var player2 = players.find((input) => input.discordId == playerDiscordIds[1]);
            if (!player1 || !player2)
            {
                return TypeReaderResult.fromError(command, 'player(s) not registered!');
            }

            /**@type {Number[]} */
            var adminIds = Client.config.BotAdminIds;
            if (!adminIds.includes(message.author.id) && message.author.id != player1.discordId)
            {
                return TypeReaderResult.fromError(command, 'the submitter has to be player 1!');
            }

            if (!isNaN(Number(parts[parts.length - 1])) && !isNaN(Number(parts[parts.length - 2])))
            {
                var player2wins = Number(parts[parts.length - 1]);
                var player1wins = Number(parts[parts.length - 2]);
                if (player2wins > player1wins || player1wins == player2wins)
                {
                    return TypeReaderResult.fromError(command, 'player 1 has to be the winner.');
                }
                if (player1wins > 2 || player2wins > 2)
                {
                    return TypeReaderResult.fromError(command, 'a score cannot be more than 2');
                }
                if (player1wins < 0 || player2wins < 0)
                {
                    return TypeReaderResult.fromError(command, 'a score cannot be more than 0');
                }
                var TrackerId = Database.generateSeriesTrackerId();
                series._id = "s" + NumberUtil.pad(TrackerId, 4);
                series.player1Id = player1._id;
                series.player2Id = player2._id;
                series.player1Score = player1wins;
                series.player2Score = player2wins;

                series.player1 = player1;
                series.player2 = player2;
                return TypeReaderResult.fromSuccess(series)
            }
            else
            {
                return TypeReaderResult.fromError(command, 'invalid scores');
            }
        }
        else
        {
            return TypeReaderResult.fromError(command, 'invalid user mentions or command argument structure!\n' + StringUtil.boldify("Argument Example: ") + StringUtil.markdownCodeLinify(argument.example));
        }

        return TypeReaderResult.fromError(command, 'invalid series entry.');
    }
}

module.exports = new SeriesTypeReader();
