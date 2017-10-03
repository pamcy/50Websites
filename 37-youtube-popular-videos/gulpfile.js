const gulp         = require('gulp');
const sass         = require('gulp-sass');
const sourcemaps   = require('gulp-sourcemaps');
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const lost         = require('lost');
const cssnano      = require('cssnano');
const browserSync  = require('browser-sync').create();
// const uglify    = require('gulp-uglify');
// const babel     = require('gulp-babel')


/*
 * sub tasks
 */

gulp.task('make:css', () => {
    const plugins = [
        lost,
        autoprefixer({ browsers: ['last 2 versions'] }),
    ];
    return gulp.src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.stream());
});

gulp.task('process:css', ['make:css'], () => {
    return gulp.src('public/css/**/*.css')
        .pipe(postcss(cssnano()))
        .pipe(gulp.dest('public/css'));
});

// gulp.task('make:js', () => {
//     return gulp.src('src/js/**/*.js')
//         // plugin "babel-preset-env"
//         .pipe(babel({ presets: ['env'] }))
//         .pipe(uglify())
//         .pipe(gulp.dest('public/js'))
//         .pipe(browserSync.stream())
// })

gulp.task('copy:html', () => {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('public'))
        .pipe(browserSync.stream());
});

gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: 'public',
        },
    });
});


/*
 * main tasks
 */

gulp.task('build', ['copy:html', 'process:css']);

// Array of tasks to complete before watch
gulp.task('default', ['browserSync', 'make:css', 'copy:html'], () => {
    gulp.watch('src/scss/**/*.scss', ['make:css']);
    gulp.watch('src/*.html', ['copy:html']);
});
