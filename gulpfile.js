var requireDir = require('require-dir');
var gulp = require('gulp');
var config = require('./gulpfile/config');
var uglify = require('gulp-uglify');
var dist = './app/assets/javascripts/dist/';

requireDir('./gulpfile', { recurse: true });


gulp.task('default', ['browserify', 'browser-sync']);



gulp.task('compress', function() {
    gulp.src("./app/assets/javascripts/dist/*.js")
        .pipe(uglify())
        .pipe(gulp.dest(dist))
});