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
     * @param {Number[]} eloHistory
     */
    constructor(id = "", discordId = "", date = new Date(), name = "", elo = 1200, wins = 0, loss = 0, seriesHistoryIds = [], eloHistory = [])
    {
        this._id = id;
        this.discordId = discordId;
        this.joinDate = date;
        this.name = name;
        this.elo = elo;
        this.wins = wins;
        this.losses = loss;
        this.seriesHistoryIds = seriesHistoryIds;
        this.eloHistory = eloHistory;
        this.isRemoved = false;
    }
}

module.exports = Player;