const PlayerModel = require('../database/models/Player.js');
const SeriesModel = require('../database/models/Series.js');
const NumberUtil = require('../utility/NumberUtil.js');

class Series
{
    /**
     * 
     * @param {SeriesModel} series 
     * @param {PlayerModel} player1 
     * @param {PlayerModel} player2 
     */
    calculateELO(series, player1, player2)
    {
        //elo1 = elo of player 1, elo 2 = elo of player 2
        //s1 = 1 if player 1 wins, s1 = 0 if player 2 wins
        var elo1 = player1.elo;
        var elo2 = player2.elo;
        var s1 = series.player1Score > series.player2Score ? 1 : 0;
        var k = 32;
        var r1 = Math.pow(10, elo1 / 400)
        var r2 = Math.pow(10, elo2 / 400)
        var s2 = Math.abs(s1 - 1)
        var final = [elo1 + k * (s1 - (r1 / (r1 + r2))), elo2 + k * (s2 - (r2 / (r1 + r2)))]
        player1.elo = final[0];
        player1.eloHistory.push(player1.elo);
        player2.elo = final[1];
        player2.eloHistory.push(player2.elo);
    }
}

module.exports = new Series();