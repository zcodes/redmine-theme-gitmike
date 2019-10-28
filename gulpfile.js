'use strict';

var gulp = require('gulp');
var gulpCompass = require('gulp-compass');
var gulpAutoPrefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

function compass(env) {
    return gulp.src('./sass/*.scss')
        .pipe(gulpCompass({
            config_file: 'sass/config.rb',
            environment: env,
            comments: env === 'development',
            style: env === 'development' ? 'expanded' : 'compact',
            css: 'stylesheets',
            sass: 'sass',
            force: env !== 'development'
        }))
        .on('error', function (err) {
            console.log(err);
        })
        .pipe(gulpAutoPrefixer({
            cascade: false
        }))
        .pipe(gulp.dest('stylesheets'))
        .pipe(browserSync.stream())
    ;
}

gulp.task('compass:prod', function () {
    return compass('production');
});

gulp.task('compass:dev', function () {
    return compass('development');
});

gulp.task('browser-sync', function () {
  browserSync({
    port: 3001,
    open: false,
    proxy: "127.0.0.1:3000"
  });
});

gulp.task('browser-sync:reload', function () {
  browserSync.reload();
});

gulp.task('debug', ['compass:dev', 'browser-sync'],
  function () {
    gulp.watch('sass/**/*.scss', ['compass:dev']);
  }
);

gulp.task('default', gulp.series('compass:prod'));
