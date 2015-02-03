var requireDir = require('require-dir');
var gulp = require('gulp');

requireDir('./gulpfile', { recurse: true });


gulp.task('default', ['browserify', 'browser-sync']);