const { MongoClient } = require('mongodb');
const Logger = require('../utility/Logger');
const Player = require('../database/models/Player.js');
const Series = require('../database/models/Series.js');

class Database
{
    constructor()
    {
        this.DatabaseName = "CompetitiveBloons2";
        this.db;
        this.Players;
        this.SeriesPending;
        this.SeriesChain;

        this.PlayerTrackerId;
        this.SeriesTrackerId;
    }

    async initialize(url)
    {
        var dbClient = await MongoClient.connect(url);
        this.db = await dbClient.db(this.DatabaseName);
        Logger.log("Connected to Database!", Logger.LogLevel.INFO);
        var collectionList = await this.db.listCollections().toArray();

        this.Players = await this.db.collection('Players');
        this.SeriesChain = await this.db.collection('SeriesChain');

        this.PlayerTrackerId = await this.getPlayerTrackerId();
        this.SeriesTrackerId = await this.getSeriesTrackerId();
        Logger.debug("Collections in Database: " + collectionList.map((item) => item['name']));
    }

    //#region Player ----------------------------------------------------------------------------------------
    /**
     * 
     * @param {Number} limit 
     * @param {Boolean} byElo
     * @returns {Promise<Player[]>}
     */
    async getPlayerList(limit = 50, byElo = false)
    {
        return await this.Players.find({ isRemoved: false }).sort({ elo: byElo ? 1 : -1 }).limit(limit).toArray();
    }

    /**
     * 
     * @param {String[]} ids
     * @returns {Promise<Player[]>} 
     */
    async getPlayerSetByDiscordIds(ids)
    {
        var regexString = "";
        ids.forEach((input) => regexString += input + "|");
        regexString = regexString.slice(0, -1);
        var queryRegx = new RegExp(regexString);
        return await this.Players.find({ discordId: queryRegx }).toArray();
    }

    /**
     * 
     * @param {String[]} ids
     * @returns {Promise<Player[]>} 
     */
    async getPlayerSetByIds(ids)
    {
        var regexString = "";
        ids.forEach((input) => regexString += input + "|");
        regexString = regexString.slice(0, -1);
        var queryRegx = new RegExp(regexString);
        return await this.Players.find({ _id: queryRegx }).toArray();
    }

    /**
     * 
     * @param {String} id
     * @returns {Promise<Player>} 
     */
    async getPlayerByPlayerId(id)
    {
        try
        {
            return await this.Players.findOne({ _id: id });
        }
        catch (error)
        {
            return null;
        }
    }

    /**
     * 
     * @param {String} id
     * @returns {Promise<Player>} 
     */
    async getPlayerByDiscordId(id)
    {
        try
        {
            return await this.Players.findOne({ discordId: id });
        }
        catch (error)
        {
            return null;
        }
    }

    async getPlayerTrackerId()
    {
        return (await this.Players.findOne({})).count;
    }

    generatePlayerTrackerId()
    {
        var id = this.PlayerTrackerId++;
        this.Players.updateOne({}, { $set: { count: this.PlayerTrackerId } });
        return id;
    }

    /**
     * 
     * @param {Player} player 
     */
    async updatePlayer(player)
    {
        return await this.Players.replaceOne({ _id: player._id }, player);
    }

    /**
     * 
     * @param {Player[]} players 
     */
    async updatePlayerSet(players)
    {
        var regexString = "";
        players.forEach((input) => regexString += input._id + "|");
        regexString = regexString.slice(0, -1);
        var queryRegx = new RegExp(regexString);
        await this.Players.deleteMany({ _id: queryRegx });
        return await this.Players.insertMany(players);
    }
    //#endregion

    //#region Series Chain (Approved Series History) --------------------------------------------------------
    /**
     * 
     * @param {Series} series 
     */
    async approveSeries(series)
    {
        return await this.SeriesChain.insertOne(series);
    }

    async getSeriesTrackerId()
    {
        var count = (await this.SeriesChain.findOne({})).count;
        return count;
    }

    generateSeriesTrackerId()
    {
        var id = this.SeriesTrackerId++;
        this.SeriesChain.updateOne({}, { $set: { count: this.SeriesTrackerId } });
        return id;
    }

    async getOneSerieByIds(id)
    {
        return await this.SeriesChain.findOne({ _id: id });
    }

    async deleteOneSeriesbyId(id)
    {
        return await this.SeriesChain.deleteOne({ _id: id });
    }

    async getSeriesChainList(limit = 10, sortDate = false)
    {
        return await this.SeriesChain.find({ _id: { $gt: "s0001" } }).sort({ date: sortDate ? 1 : -1 }).limit(limit).toArray();
    }
    //#endregion

}

module.exports = Database;