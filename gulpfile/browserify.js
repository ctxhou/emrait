var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require("vinyl-source-stream");
var src = './app/assets/javascripts/';
var editor_src = './app/assets/editor_javascript/';
var dist = './app/assets/javascripts/dist/';

var files = [
  {
    input      : [src + 'clinic_search.js'],
    output     : 'clinic_search.js',
    destination: dist
  },

  {
    input      : [src + 'clinic.js'],
    output     : 'clinic.js',
    destination: dist
  },
  {
    input      : [src + 'home.js'],
    output     : 'home.js',
    destination: dist
  },
  {
    input      : [src + 'emergency.js'],
    output     : 'emergency.js',
    destination: dist
  },
  {
    input      : [src + 'mission.js'],
    output     : 'mission.js',
    destination: dist
  },
  {
    input      : [src + 'shelter.js'],
    output     : 'shelter.js',
    destination: dist
  },
  {
    input      : [src + 'shelter_show.js'],
    output     : 'shelter_show.js',
    destination: dist
  }

];

/**
 * Defer object to handle task ending.
 *
 * After all of the bundle is comlete, it will execute callback of gulp task
 * so that other task can wait until the task ends.
 *
 * @param {int}      max      Max number of how many call should Defer wait
 *                            until executing callback.
 * @param {Function} callback Callback of Gulp task.
 */
var Defer = function(max, callback) {
  this.max = max;
  this.count = 0;
  this.callback = callback;

  this.exec = function() {
    if (this.max === ++this.count) {
      this.callback();
    }
  };
};

/**
 * Bundle given file.
 */
var bundle = function(bundler, options) {
  startTime = new Date().getTime();

  return bundler.bundle()
    .on('error', function (err) {
      console.log(err);
    })
    .pipe(source(options.output))
    .pipe(gulp.dest(options.destination))
    .on('end', function () {
      time = (new Date().getTime() - startTime) / 1000;
      console.log(options.output + ' was browserified: ' + time + 's');
    });
}

/**
 * Create bundle properties such as if its is added or required etc.
 */
var createBundleProp = function(b, options) {
  var bundler = b;

  var i = 0;
  for (i; i < options.input.length; i++) {
    if (options.require) {
      bundler.require(options.input[i].require, {
        expose: options.input[i].expose
      });
    } else {
      bundler.add(options.input[i]);
    }
  };

  return bundler;
};

/**
 * Create single bundle using files options.
 */
var createBundle = function(options, d) {
  var bundler = browserify({
    cache: {},
    packageCache: {},
    fullPaths: false
  });

  bundler = createBundleProp(bundler, options);

  if (isWatch) {
    bundler = watchify(bundler);
    bundler.on('update', function () {
      bundle(bundler, options);
    });
  }

  return bundle(bundler, options);
};

/**
 * Create set of bundles.
 */
var createBundles = function(bundles, defer) {
  bundles.forEach(function (bundle) {
    createBundle(bundle).on('end', function () {
      defer.exec();
    });
  });
};

/**
 * Browserify task. If `--watch` option is passed, watchify will activate.
 */
gulp.task('browserify', function (done) {
  var d = new Defer(files.length, done);
  isWatch = true;
  createBundles(files, d);
});