/**
 * Created by Egor Babenko (patttern@gmail.com) on 06.11.15.
 */
'use strict';

var config = require('./index');
var morgan = require('morgan');
var logger = require('../modules/logger')(module);

var settings = function (app, dir) {
  // Presetting application
  app.set('projectName', config.get('name') || 'SAME');
  app.set('port', config.get('port') || 3000);
  app.set('env', config.get('env') || 'development');

  // Logging
  app.use(morgan(config.get('morgan')));
  app.use(morgan(config.get('morgan'), {stream: logger.getLogStream()}));
};

module.exports = settings;