/**
 * Created by Egor Babenko (patttern@gmail.com) on 06.11.15.
 */
'use strict';

var util = require('util');
var config = require('../config');
var dateFormat = require('./dateFormat');
var fs = require('fs');
var path = require('path');

var plain = function (msg) {
  return msg;
};

var levels = {
  'debug': plain,
  'log': plain,
  'info': plain,
  'warn': plain,
  'error': plain
};

var logStreams = function (lvl) {
  var root = __dirname.split('/').slice(0, -2).join('/'),
    logdir = config.get('logdir') + '/',
    log, logStream, options = {flags: 'a'},
    lvl = (lvl ? lvl.toUpperCase() : '');

  var all = path.join(root, logdir + 'allstream.log'),
    debug = path.join(root, logdir + 'debug.log'),
    warn  = path.join(root, logdir + 'warn.log'),
    error = path.join(root, logdir + 'error.log');


  switch (lvl) {
    case 'DEBUG':
      log = debug;
      break;
    case 'WARN':
      log = warn;
      break;
    case 'ERROR':
      log = error;
      break;
    default:
      log = all;
  }

  return fs.createWriteStream(log, options);
};

var logger = function (module) {
  var modulePath = module.filename.split('/').slice(-2).join('/');
  return {
    debug: function () {
      getLogger('debug', modulePath, arguments);
    },
    log: function () {
      getLogger('log', modulePath, arguments);
    },
    info: function () {
      getLogger('info', modulePath, arguments);
    },
    warn: function () {
      getLogger('warn', modulePath, arguments);
    },
    error: function () {
      getLogger('error', modulePath, arguments);
    },
    getLogStream: function () {
      return logStreams();
    }
  };
};

function getLogger (level, path, args) {
  var color = levels[level],
    params = [],
    level = level.toUpperCase();

  for (var i in args) {
    params.push(JSON.stringify(args[i]));
  }
  var str = eval('util.format(' + params.join(', ') + ')');
  var df = dateFormat(new Date(), config.get('dateFormat:logFormat'));

  if (level !== 'DEBUG' || (level === 'DEBUG' && config.get('env') === 'development')) {
    console.log('[%s] [' + color('%s') + '] [%s] %s', df, level, path, str);
  }
  sendToFile(level, util.format('[%s] [%s] [%s] %s', df, level, path, str));
}

function sendToFile (lvl, msg) {
  var logStream, allStream,
    lvl = (lvl ? lvl.toUpperCase() : '');

  switch (lvl) {
    case 'DEBUG':
    case 'WARN':
    case 'ERROR':
      logStream = logStreams(lvl.toUpperCase());
      logStream.write(msg + "\n");
      logStream.end();
  }

  allStream = logStreams();
  allStream.write(msg + "\n");
  allStream.end();
}

module.exports = logger;
