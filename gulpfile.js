var gulp = require('gulp');
var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');
var size = require('gulp-size');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var reload = browserSync.reload;

var AUTOPREFIXER_BROWSERS = [
'ie >= 10',
'ie_mob >= 10',
'ff >= 30',
'chrome >= 34',
'safari >= 7',
'opera >= 23',
'ios >= 7',
'android >= 4.4',
'bb >= 10'
];

var SOURCE = {
  scss: 'scss/**/*.scss',
  css: 'public/css',
  dust: 'views/**/*.dust',
  js: ['/*.js', 'public/js/*.js']
};

// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    browserSync({
        proxy: "localhost:4000"
    });
});

gulp.task('scss-lint', function() {
  gulp.src('/' + SOURCE.scss)
  .pipe(scsslint());
});

// Compile, lint,  and automatically prefix stylesheets
gulp.task('sass', ['scss-lint'], function () {
  gulp.src(SOURCE.scss)
  .pipe(plumber())
  .pipe(sass())
  .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
  .pipe(csso(SOURCE.css))
  .pipe(gulp.dest(SOURCE.css))
  .pipe(size({title: 'CSS: '}))
  .pipe(reload({stream:true}));
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

// Default task to be run with `gulp`
gulp.task('default', ['sass', 'browser-sync'], function () {
    gulp.watch(SOURCE.scss, ['sass']);
    gulp.watch([SOURCE.js, SOURCE.dust], ['bs-reload'])
});

module.exports = gulp;