const registry = require('./registry.js');
const patron = require('patron.js');

module.exports = new patron.Handler(registry);
