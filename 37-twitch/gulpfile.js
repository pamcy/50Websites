const gulp         = require('gulp')
const sass         = require('gulp-sass')
const sourcemaps   = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const uglify       = require('gulp-uglify')
const babel        = require('gulp-babel')
const browserSync  = require('browser-sync').create()

gulp.task('make:css', () => {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.stream())
})

gulp.task('make:js', () => {
    return gulp.src('src/js/**/*.js')
        // plugin "babel-preset-env"
        .pipe(babel({ presets: ['env'] }))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'))
        .pipe(browserSync.stream())
})

gulp.task('make:html', () => {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('public'))
        .pipe(browserSync.stream())
})

// Run BrowserSync
gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: 'public',
        },
    })
})

// Array of tasks to complete before watch
gulp.task('default', ['browserSync', 'make:css', 'make:js'], () => {
    gulp.watch('src/scss/**/*.scss', ['make:css'])
    gulp.watch('src/*.html', ['make:html'])
    gulp.watch('src/js/**/*.js', ['make:js'])
})

