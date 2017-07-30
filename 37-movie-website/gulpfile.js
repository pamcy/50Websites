var gulp         = require('gulp');
var sass         = require('gulp-sass');
var postcss      = require('gulp-postcss');
var lost         = require('lost');
var autoprefixer = require('autoprefixer');
var browserSync  = require('browser-sync').create();

// Compile Sass into CSS
gulp.task('make:css', function () {
    var processors = [
        lost,
        autoprefixer({ browsers: ['last 2 versions'] }),
    ];

    gulp.src('./src/scss/style.scss')
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.reload({stream: true}));
});

// Watch files and run BrowserSync
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('./src/scss/*.scss', ['make:css']);
    gulp.watch('./**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['make:css', 'serve']);
