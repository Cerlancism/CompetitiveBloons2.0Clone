class Player
{
    /**
     * 
     * @param {String} id 
     * @param {String} discordId
     * @param {String} name
     * @param {Number} elo
     * @param {Number} wins
     * @param {Number} loss
     * @param {String[]} seriesHistoryIds
     */
    constructor(id = "", discordId = "", name = "", elo = 1200, wins = 0, loss = 0, seriesHistoryIds = [])
    {
        this._id = id;
        this.discordId = discordId;
        this.name = name;
        this.elo = elo;
        this.wins = wins;
        this.loss = loss;
        this.seriesHistoryIds = seriesHistoryIds;
        this.isRemoved = false;
    }
}

module.exports = Player;