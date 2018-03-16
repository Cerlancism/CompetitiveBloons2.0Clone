const { Precondition, PreconditionResult } = require('patron.js');
const { Message } = require('discord.js');
const Client = require('../structures/client.js')

class BotAdmin extends Precondition
{
    /**
     * 
     * @param {*} cmd 
     * @param {Message} msg 
     */
    run(cmd, msg)
    {
        /**@type {Number[]} */
        var adminIds = Client.config.BotAdminIds;
        if (adminIds.includes(msg.author.id))
        {
            return PreconditionResult.fromSuccess();
        }

        return PreconditionResult.fromError(cmd, 'You must be a bot administrator in order to use this command.');
    }
}

module.exports = new BotAdmin();
