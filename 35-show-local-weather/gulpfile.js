const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');

gulp.task('sass', function () {
    gulp.src('scss/style.scss')
        .pipe(sass({ includePaths: ['scss'] }))
        .pipe(gulp.dest('css'));
});

gulp.task('browser-sync', function() {
    browserSync.init(['*.html', 'css/*.css', 'js/*.js'], {
        server: {
            baseDir: './',
        },
    });
});

gulp.task('default', ['sass', 'browser-sync'], function () {
    gulp.watch('scss/*.scss', ['sass']);
});
