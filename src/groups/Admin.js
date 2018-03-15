const patron = require('patron.js');

class Admin extends patron.Group
{
    constructor()
    {
        super({
            name: 'admin',
            description: 'Commands for players and series administration.',
            preconditions: [require('../preconditions/BotAdmin')]
        });
    }
}

module.exports = new Admin();