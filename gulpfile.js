/**
 * Created by Egor Babenko (patttern@gmail.com) on 06.11.15.
 */
'use strict';

var gulp = require('gulp');
var ignore = require('gulp-ignore');
var rimraf = require('gulp-rimraf');
var replace = require('gulp-replace-task');
var install = require('gulp-install');
var gls = require('gulp-live-server');

var options = {
  name: 'SameJS',
  version: '0.0.1',
  description: 'Same JS',
  author: 'Egor Babenko',
  email: 'patttern@gmail.com',
  bowerDeps: {
    "jquery": "~2.1.4"
  },
  packageDeps: {
    "connect-livereload": "^0.5.3",
    "dateformat": "^1.0.11",
    "express": "^4.13.3",
    "morgan": "^1.6.1",
    "nconf": "^0.8.2",
    "util": "^0.10.3"
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

gulp.task('run-app', ['copy-statics'], function () {
  var server = gls.new('system/app.js');
  server.start();

  gulp.watch(['statics/**/*.css','statics/**/*.js','statics/**/*.html'], function(file){
    server.notify.apply(server, [file]);
  });
  gulp.watch('system/**/*', function() {
    server.start.bind(server)()
  });
});

gulp.task('default', ['clean','pack-jsons','install-packages','copy-statics','run-app']);
