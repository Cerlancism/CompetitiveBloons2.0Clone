const Logger = require('../utility/Logger.js');
const client = require('../structures/client.js');

client.on('warn', (warning) => {
  return Logger.log(warning, 'WARNING');
});
