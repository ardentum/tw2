var gulp = require('gulp');

var concat = require('gulp-concat');
var less = require('gulp-less');

var styles = [
  './bower_components/normalize-css/*.css',
  './src/_styles/main.less',
  './src/**/*.less'
];

gulp.task('styles', function () {
  gulp
    .src(styles)
    .pipe(concat('main.less'))
    .pipe(less())
    .pipe(gulp.dest('./.tmp'));
});


var jade = require('gulp-jade');

gulp.task('templates', function () {
    gulp
      .src('./src/**/*.jade')
      .pipe(jade())
      .pipe(gulp.dest('./.tmp'));
});

gulp.task('default', ['styles', 'templates']);