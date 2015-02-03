var browserSync = require('browser-sync');
var gulp = require('gulp');
var config = require('./config');

gulp.task('browser-sync', function() {
    var files = config.style.files.concat(config.scripts_dist.files, config.erb.files);

    browserSync.init(files, {
        proxy: "localhost:3000"
    });
});