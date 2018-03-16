const Discord = require('discord.js');
const Logger = require('../utility/Logger');
const Database = require('../database/Database.js');

class client extends Discord.Client
{
    constructor()
    {
        super(
            {
                fetchAllMembers: true,
                disableEveryone: true,
            })
        this.config = require('../../config.json');
        this.database = new Database();
    }

    async initialize()
    {
        await this.login(this.config.DiscordToken).catch((err) => Logger.handleError(err));
        await this.database.initialize(this.config.DatabaseURL).catch((err) => Logger.handleError(err));
    }
}

module.exports = new client();
