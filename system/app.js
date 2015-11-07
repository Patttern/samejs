/**
 * Created by Egor Babenko (patttern@gmail.com) on 07.11.15.
 */
'use strict';

var systemRoot = __dirname + '/';
var express = require('express');
var config = require(systemRoot + 'config');
var logger = require(systemRoot + 'modules/logger')(module);

var app = express();

// Settings
require(systemRoot + 'config/settings')(app, __dirname);

// Run server
var server = app.listen(app.get('port'), function () {
  var _addr = server.address();
  var host = (_addr.address === '0.0.0.0' || _addr.address === '::' ? 'localhost' : _addr.address);
  var port = _addr.port;
  logger.log('%s %s server listening at http://%s:%s', app.get('projectName'), app.get('env'), host, port);
  //logger.debug('%s %s server listening at http://%s:%s', app.get('projectName'), app.get('env'), host, port);
  //logger.info('%s %s server listening at http://%s:%s', app.get('projectName'), app.get('env'), host, port);
  //logger.warn('%s %s server listening at http://%s:%s', app.get('projectName'), app.get('env'), host, port);
  //logger.error('%s %s server listening at http://%s:%s', app.get('projectName'), app.get('env'), host, port);
});
