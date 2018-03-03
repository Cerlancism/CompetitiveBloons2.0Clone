const Logger = require('./utility/Logger.js');
const path = require('path');
const EventService = require('./services/EventService.js');
const client = require('./structures/client.js');
const registry = require('./structures/registry.js');
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

registry.registerDefaultTypeReaders();                          // Register the default type readers.
registry.registerGroupsIn(path.join(__dirname, 'groups'));      // Register all groups in the groups folder.
registry.registerCommandsIn(path.join(__dirname, 'commands'));  // Register all the commands in the commands folder.

EventService.run();                                             // Run every single file inside the events folder.

client.login(process.env.TOKEN)                                 // Login to the client.
  .catch((err) => Logger.handleError(err));                     // Handle the error.
