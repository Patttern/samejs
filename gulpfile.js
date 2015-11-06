/**
 * Created by pattern on 06.11.15.
 */
/* jshint node:true */
'use strict';

var gulp = require('gulp');
var ignore = require('gulp-ignore');
var rimraf = require('gulp-rimraf');
var replace = require('gulp-replace-task');
var install = require('gulp-install');

var options = {
  name: 'SameJS',
  version: '0.0.1',
  description: 'Same JS',
  author: 'Egor Babenko',
  email: 'patttern@gmail.com',
  bowerDeps: {
    "jquery": "^2.1.4"
  },
  packageDeps: {
    "express": "^4.13.3"
  }
};

gulp.task('clean', function () {
  return gulp.src(['public/*'], {base: '.', read: false})
    .pipe(ignore(['public/vendors']))
    .pipe(rimraf());
});

gulp.task('pack-jsons', ['clean'], function() {
  return gulp.src(['system/bower.json','system/package.json'])
    .pipe(replace({patterns: [{json: options}]}))
    .pipe(gulp.dest('./'));
});

gulp.task('install-packages', ['pack-jsons'], function() {
  return gulp.src(['bower.json','package.json'])
    .pipe(install());
});

gulp.task('copy-statics', ['install-packages'], function() {
  return gulp.src(['statics/**/*'])
    .pipe(gulp.dest('public'));
});

gulp.task('default', ['clean','pack-jsons','install-packages','copy-statics']);
