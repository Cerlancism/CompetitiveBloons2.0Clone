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
    }

    async initialize(url)
    {
        var dbClient = await MongoClient.connect(url);
        this.db = await dbClient.db(this.DatabaseName);
        Logger.log("Connected to Database!", Logger.LogLevel.INFO);
        var collectionList = await this.db.listCollections().toArray();
        Logger.debug("Collections in Database: " + collectionList.map((item) => item['name']));

        this.Players = await this.db.collection('Players');
        this.SeriesPending = await this.db.collection('SeriesPending');
        this.SeriesChain = await this.db.collection('SeriesChain');
    }

    //#region Player
    async getPlayerList(limit = 100, byElo = 1)
    {
        return await this.Players.find({ isRemoved: false }).sort({ elo: byElo }).limit(limit).toArray();
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

    /**
     * 
     * @param {Player} player 
     */
    async updatePlayer(player)
    {
        return await this.Players.updateOne({ _id: player._id }, { $set: player });
    }
    //#endregion

    //#region Pending Series
    /**
     * 
     * @param {Series} series 
     */
    async createPeningSeries(series)
    {

    }

    async getPendingSeriesList(limit = 10, latest = false)
    {

    }

    async getPendingSeriesById(id)
    {

    }

    async approvePendingSeriesList()
    {

    }

    async deletePendingSeriesById(id)
    {

    }
    //#endregion

    //#region Series Chain (Approved Series History)
    /**
     * 
     * @param {Series} series 
     */
    async approveSeries(series)
    {
        await this.SeriesPending.deleteOne({ _id: series._id }).catch((err) => Logger.handleError(err));
        return await this.SeriesChain.insertOne(series);
    }

    async getSeriesTrackerId()
    {
        var count = (await this.SeriesChain.findOne({})).count;
        return count;
    }

    async increaseSeriesTrackerId()
    {
        var count = (await this.SeriesChain.findOne({})).count;
        return await this.SeriesChain.updateOne({}, { $set: { count: ++count } });
    }

    async getSeriesChainList(limit = 10, lastest = true)
    {

    }
    //#endregion

}

module.exports = Database;