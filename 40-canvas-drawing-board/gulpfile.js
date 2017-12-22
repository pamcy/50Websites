const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');


/*
 * sub tasks
 */

gulp.task('make:css', () => {
    const plugins = [
        autoprefixer({ browsers: ['last 2 versions'] }),
    ];
    return gulp.src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('minify:css', ['make:css'], () => {
    return gulp.src('dist/css/**/*.css')
        .pipe(postcss(cssnano))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('make:js', () => {
    return gulp.src('src/js/**/*.js')
        // plugin "babel-preset-env"
        .pipe(babel({ presets: ['env'] }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('minify:js', () => {
    return gulp.src('dist/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('js-watch', ['make:js'], (done) => {
    browserSync.reload();
    done();
});


/*
 * main tasks
 */

gulp.task('serve', ['make:css'], () => {
    browserSync.init({
        server: {
            baseDir: './',
        },
    });

    gulp.watch('src/scss/**/*.scss', ['make:css']);
    gulp.watch('src/js/*.js', ['js-watch']);
    gulp.watch('*.html').on('change', browserSync.reload);
});
gulp.task('default', ['serve']);
gulp.task('minify', ['minify:css', 'minify:js']);
