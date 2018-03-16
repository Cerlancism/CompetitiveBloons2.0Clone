const PlayerModel = require('../database/models/Player.js');
const SeriesModel = require('../database/models/Series.js');
const NumberUtil = require('../utility/NumberUtil.js');

class Player
{
    constructor()
    {
        this.TBDGamesCount = 5;
    }

    /**
     * 
     * @param {PlayerModel} player 
     */
    getTotalGames(player)
    {
        return player.wins + player.loss;
    }

    /**
    * 
    * @param {PlayerModel} player 
    */
    getDisplayELO(player)
    {
        var games = this.getTotalGames(player);
        if (games < this.TBDGamesCount)
        {
            return "TBD: " + NumberUtil.pad(this.TBDGamesCount - games, 2);
        }
        return player.elo.toFixed(2);
    }
}

module.exports = new Player();