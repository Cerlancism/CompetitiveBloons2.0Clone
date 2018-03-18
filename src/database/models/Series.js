class Series
{
    /**
     * 
     * @param {String} id 
     * @param {String} Player1Id
     * @param {Number} player1Score 
     * @param {String} player2id
     * @param {Number} player2Score
     */
    constructor(id = "", date = new Date(), Player1Id = "", player1Score = 0, player2id = "", player2Score = 0)
    {
        this._id = id;
        this.date = date;
        this.player1Id = Player1Id;
        this.player1Score = player1Score;
        this.player2Id = player2id;
        this.player2Score = player2Score;
    }
}

module.exports = Series;