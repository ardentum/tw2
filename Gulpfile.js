var gulp = require('gulp');

var STYLES = [
  './bower_components/normalize-css/*.css',
  './src/_styles/main.less',
  './src/**/*.less'
];

var TEMPLATES = ['./src/**/*.jade'];

(function () {
  var less = require('gulp-less');
  var concat = require('gulp-concat');

  gulp.task('styles', function () {
    gulp
      .src(STYLES)
      .pipe(concat('main.less'))
      .pipe(less())
      .pipe(gulp.dest('./.tmp'));
  });
})();

(function () {
  var jade = require('gulp-jade');

  gulp.task('templates', function () {
    gulp
      .src(TEMPLATES)
      .pipe(jade({basedir: 'src/'}))
      .pipe(gulp.dest('./.tmp'));
  });
})();

var ASSETS = ['./src/_assets/**/*.*'];

(function () {
  gulp.task('assets', function () {
    gulp
      .src(ASSETS)
      .pipe(gulp.dest('./.tmp/_assets/'));
  });
})();

(function () {
  var minimist = require('minimist');
  var template = require('gulp-template');
  var rename = require('gulp-rename');

  var knownOptions = {
    'string': ['block', 'in']
  };

  var params = minimist(process.argv.slice(2), knownOptions);

  var dasherize = function (str) {
    return str.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
  };

  gulp.task('add', function () {
    var name = params.block;
    var dashedName = dasherize(name);

    var templateValues = {
      name             : name,
      dashName         : dashedName,
      module           : params.in
    };

    return gulp.src('./gulp/templates/block/*.*')
      .pipe(template(templateValues))
      .pipe(rename(function (path) {
        path.basename = path.basename.replace('block', dashedName);
      }))
      .pipe(gulp.dest(dasherize('./src/' + params.in + '/' + name)));
    });
})();

gulp.task('default', ['styles', 'templates', 'assets'], function () {
  function isOnlyChange(event) {
    return event.type === 'changed';
  }

  gulp.watch(STYLES, function(event) {
    gulp.start('styles');
  });

  gulp.watch(TEMPLATES, function(event) {
    gulp.start('templates');
  });

  gulp.watch(ASSETS, function(event) {
    gulp.start('assets');
  });
});