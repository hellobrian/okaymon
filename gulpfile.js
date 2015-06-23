var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    scsslint     = require('gulp-scss-lint'),
    size         = require('gulp-size'),
    csso         = require('gulp-csso'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync'),
    plumber      = require('gulp-plumber'),
    sprity       = require('sprity'),
    spritySass   = require('sprity-sass'), 
    gulpif       = require('gulp-if'),
    imageop      = require('gulp-image-optimization'),
    reload       = browserSync.reload;

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
  html: ['public/*.html', 'public/templates/pokemon/*.html'],
  js: ['public/javascript/*.js', '*.js']
};

gulp.task('images', function() {
  gulp.src('public/images/pokemon/**/*.png')
    .pipe(imageop({
      optimizationLevel: 5,
      progressive: true, 
      interlaced: true
    }))
    .pipe(gulp.dest('public/images/optimized'));
});

gulp.task('sprites', function() {
  return sprity.src({
    src: './public/images/pokemon/**/*.png',
    style: './scss/sprite.scss',
    processor: 'sass'
  })
  .pipe(
    gulpif('*.png', gulp.dest('./public/images'), 
      gulp.dest('./scss')));
});

// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
  browserSync({
    proxy: "localhost:8080"
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
  gulp.watch([SOURCE.js, SOURCE.html], ['bs-reload'])
});

module.exports = gulp;