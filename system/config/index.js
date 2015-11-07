/**
 * Created by Egor Babenko (patttern@gmail.com) on 06.11.15.
 */
'use strict';

var nconf = require('nconf');
var path = require('path');

nconf.argv().env().file({file: path.join(__dirname, 'config.json')});

module.exports = nconf;
