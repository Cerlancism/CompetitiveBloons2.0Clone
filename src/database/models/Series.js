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
    constructor(id = "", Player1Id = "", player1Score = 0, player2id = "", player2Score = 0)
    {
        this._id = id;
        this.Player1Id = Player1Id;
        this.player1Score = player1Score;
        this.player2id = player2id;
        this.player2Score = player2Score;
    }

    getWinnerId()
    {
        return this.player1Score < this.player2Score ? this.player2id : this.Player1Id;
    }
}