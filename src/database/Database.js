const { MongoClient } = require('mongodb');
const Logger = require('../utility/Logger')

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
        try
        {
            var dbClient = await MongoClient.connect(url);
            this.db = await dbClient.db(this.DatabaseName);
            Logger.log("Connected to Database!", Logger.LogLevel.INFO);
            var collectionList = await this.db.listCollections().toArray();
            Logger.debug("Collections in Database: " + collectionList.map((item) => item['name']));

            this.Players = await this.db.collection('Players');
            this.SeriesPending = await this.db.collection('SeriesChain');
            this.SeriesChain = await this.db.collection('SeriesPending');
        }
        catch (error)
        {
            Logger.handleError(error);
        }
    }
}

module.exports = Database;