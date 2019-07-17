var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
// var uglify = require('gulp-uglify');
// var htmlMinify = require('gulp-htmlmin');
var webpack = require('webpack-stream');


gulp.task('default', ['sass','webpack', 'sass:watch'], function() {
    gulp.watch('app/**/*.html', browserSync.reload)
    gulp.watch('app/js/**/*.js', browserSync.reload)
})


gulp.task('sass', function() {
    return gulp
        .src('app/scss/index.scss')
        .pipe(sass())
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task('sass:watch', function() {
    gulp.watch('app/scss/**/*.scss', ['sass'])
})

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app',
            serveStaticOptions: {
                extensions: ['html', 'php']
            },
        }
    })
})

gulp.task('webpack', function() {
    return gulp.src('main.js')
    .pipe(webpack( require('./webpack.config.js')))
    .pipe(gulp.dest('app/dist'));
});
 
// gulp.task('uglify', function() {
//     return gulp
//         .src('app/js/**/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('app/dist'))
// })

// gulp.task('htmlMinify', function() {
//     return gulp
//         .src('app/*.html')
//         .pipe(htmlMinify({
//             collapseWhitespace: true
//         }))
//         .pipe(gulp.dest('app/dist/html'));
// })
