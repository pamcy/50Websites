/*
 * Gulp Packages
 */

// General
const gulp = require('gulp');
const rename = require('gulp-rename');
const del = require('del');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

// Styles
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// Scripts
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');


/**
 * Paths to project folders
 */

const paths = {
  input: 'src/**/*',
  output: 'public/',
  pages: '*.html',
  styles: {
    // input: 'src/scss/**/*.scss',
    input: 'src/scss/',
    output: 'public/css/'
  },
  scripts: {
    // input: 'src/js/**/*.js',
    input: 'src/js/',
    output: 'public/js/'
  },
}


/*
 * Gulp Tasks
 */

gulp.task('build:css', () => {
  return gulp.src(paths.styles.input + '**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths.styles.output))
    .pipe(browserSync.stream());
});

gulp.task('minify:css', ['clean:public', 'build:css'], () => {
  const plugins = [
    autoprefixer({ browsers: ['last 2 versions'] }),
    cssnano,
  ];

  return gulp.src([paths.styles.input + 'plugins/*.css', paths.styles.output + '*.css'])
    .pipe(concat('style.min.css'))
    .pipe(postcss(plugins))
    .pipe(gulp.dest(paths.styles.output));
});

gulp.task('minify:js', ['clean:public', 'minify-plugins:js'], () => {
  return gulp.src([paths.scripts.input + '**/*.js', '!' + paths.scripts.input + 'plugins/*.js'])
    .pipe(gulp.dest(paths.scripts.output))
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['env'] })) // plugin "babel-preset-env"
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths.scripts.output))
});

gulp.task('minify-plugins:js', () => {
  return gulp.src(paths.scripts.input + 'plugins/*.js')
    .pipe(concat('vendors.js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(gulp.dest(paths.scripts.output));
});

gulp.task('clean:public', () => {
  del.sync([
    paths.styles.output,
    paths.scripts.output,
  ]);
});


/**
 * Task Runners
 */

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });

  gulp.watch(paths.styles.input + '**/*.scss', ['build:css']);
  gulp.watch(paths.scripts.input + '**/*.js').on('change', browserSync.reload);
  gulp.watch(paths.pages).on('change', browserSync.reload);
});
gulp.task('default', ['build:css', 'serve']);
gulp.task('minify', ['minify:css', 'minify:js']);
