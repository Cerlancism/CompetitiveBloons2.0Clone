const path = require('path');
const requireAll = require('require-all');

class EventService {
  run() {
    requireAll(path.join(__dirname, '../events')); // The package require-all is usually intended to get the all the exports within a directory, however, we simply use it as a clean way to run all our events, while keeping them organized in seperate files.
  }
}

module.exports = new EventService();
