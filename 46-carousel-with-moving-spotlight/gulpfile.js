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
    input: 'src/scss/**/*.scss',
    output: 'public/css/'
  },
  scripts: {
    input: 'src/js/**/*.js',
    output: 'public/js/'
  },
}


/*
 * Gulp Tasks
 */

gulp.task('build:css', () => {
  const plugins = [
    autoprefixer({ browsers: ['last 2 versions'] }),
  ];

  return gulp.src(paths.styles.input)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths.styles.output))
    .pipe(browserSync.stream());
});

gulp.task('minify:css', ['clean:public', 'build:css'], () => {
  return gulp.src(paths.styles.output + '*.css')
    .pipe(postcss(cssnano))
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(gulp.dest(paths.styles.output));
});

gulp.task('minify-plugin:css', () => {
  return gulp.src('src/scss/plugins/**/*.css')
    .pipe(concat('vendors.css'))
    .pipe(postcss(cssnano))
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(gulp.dest(paths.styles.output));
});

gulp.task('build:js', () => {
  return gulp.src(paths.scripts.input)
    .pipe(babel({ presets: ['env'] })) // plugin "babel-preset-env"
    .pipe(gulp.dest(paths.scripts.output))
    .pipe(browserSync.stream());
});

gulp.task('minify:js', ['clean:public', 'build:js'], () => {
  return gulp.src(paths.scripts.output + '*.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(gulp.dest(paths.scripts.output))
});

gulp.task('minify-plugin:js', () => {
  return gulp.src('src/js/plugins/**/*.js')
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

  gulp.watch(paths.styles.input, ['build:css']);
  gulp.watch(paths.scripts.input, ['build:js']);
  gulp.watch(paths.pages).on('change', browserSync.reload);
});
gulp.task('default', ['build:css', 'build:js', 'serve']);
gulp.task('build', ['build:css', 'build:js']);
gulp.task('minify', ['minify:css', 'minify:js']);
