/**
 * Created by Egor Babenko (patttern@gmail.com) on 06.11.15.
 */
'use strict';

var dateFormat = require('dateformat');
var config = require('../config');

dateFormat.i18n = config.get('dateFormat:i18n');

module.exports = function (date, options) {
  return dateFormat(date, options || config.get('dateFormat:default'));
};
