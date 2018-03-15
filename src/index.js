const path = require('path');
const http = require('http');
const express = require('express');

const Logger = require('./utility/Logger.js');
const NumberUtil = require('./utility/NumberUtil')
const EventService = require('./services/EventService.js');
const client = require('./structures/client.js');
const registry = require('./structures/registry.js');

const app = express();

console.log(Logger._ConsoleColors.Reset, "Starting");

app.get("/", (request, response) =>
{
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() =>
{
  Logger.log(`Uptime: ${NumberUtil.msToTime(client.uptime)}`, 'INFO');
}, 60000);

registry.registerDefaultTypeReaders();                          // Register the default type readers.
registry.registerGroupsIn(path.join(__dirname, 'groups'));      // Register all groups in the groups folder.
registry.registerCommandsIn(path.join(__dirname, 'commands'));  // Register all the commands in the commands folder.

EventService.run();                                             // Run every single file inside the events folder.

client.initialize();
