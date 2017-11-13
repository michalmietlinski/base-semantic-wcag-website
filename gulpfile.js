'use strict';

var gulp = require('gulp'),
sass = require('gulp-sass'),
sourcemaps = require('gulp-sourcemaps'),
prefixer = require('gulp-autoprefixer'),
browserSync = require('browser-sync').create(),
watch = require('gulp-watch'),
htmlbeautify = require('gulp-html-beautify');


    

var path= {
    dist : 'dist',
    src : 'src/sass/*.scss',
    srchtml : 'src/**/*.html',
    watch:'src/sass/*.scss',
    watchhtml: 'src/**/*.html'

}
gulp.task('watch', function(){
    // watch([path.watch.html], function(event, cb) {
    //     gulp.start('html:build');
    // });
    watch([path.watch], function(event, cb) {
        gulp.start('style');
    });

});

gulp.task('html', function() {
  var options = {
    indentSize: 2
  };
  gulp.src('./src/html/*.html')
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest('./dist/'))
  .pipe(browserSync.stream());
});

// gulp.watch("src/*.html").on('change', browserSync.reload);
gulp.task('style', function () {
    gulp.src(path.src) 
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.stream());
});

// gulp.task('default', ['watch']);

gulp.task('default', ['style','html'], function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch(path.watch, ['style']);
    gulp.watch(path.watchhtml, ['html'] );
});