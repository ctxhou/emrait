var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    notify = require("gulp-notify"),
    config = require('./config');

gulp.task('scss', function() {
    return sass("./public/scss")
            .on("error", notify.onError(function(error) {
                return "Error: " + error.message;
            }))
        // .pipe(autoprefix('last() 2 version'))
        .pipe(gulp.dest('./public/stylesheets'));
});


gulp.task('scss-develop', function() {
    return sass("./public/scss", {style: "compressed"})
            .on("error", notify.onError(function(error) {
                return "Error: " + error.message;
            }))
        // .pipe(autoprefix('last() 2 version'))
        .pipe(gulp.dest('./public/stylesheets'));
});