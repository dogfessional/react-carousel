var gulp = require('gulp');
var react = require('gulp-react');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

/* browserify */ 
gulp.task('browserify', function() {
  var bundler = browserify({
    entries: ['./example/index.jsx'], // Only need initial file
    transform: [reactify], // Convert JSX to javascript
    debug: true, cache: {}, packageCache: {}, fullPaths: true
  });

  var watcher  = watchify(bundler);

  return watcher
  .on('update', function () { // On update When any files updates
    var updateStart = Date.now();
        watcher.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./example/'));
        console.log('Updated ', (Date.now() - updateStart) + 'ms');
  })
  .bundle() // Create initial bundle when starting the task 
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./example/'));
});

/* watch */
gulp.task('watch', function () {

  gulp.watch('./jsx/*.jsx', ['react']);
  
});

gulp.task('react', function () {

  return gulp.src('./jsx/*.jsx')
    .pipe(react({
      harmony: true
    }))
    .pipe(gulp.dest('./js/'));
});

/* default */
gulp.task('default', ['serve'], function () {});

/* serve */
gulp.task('serve', ['watch', 'browserify','react'], function () {});