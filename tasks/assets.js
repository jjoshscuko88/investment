const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const combine = require('stream-combiner2').obj;

const isProd = require('yargs').argv.production;

module.exports = function (assetsSrc) {
  return gulp.src(assetsSrc, { since: gulp.lastRun('assets') })
    .pipe($.imagemin())
    .pipe($.if(isProd, $.rev()))
    .pipe(gulp.dest('public/assets'))
    .pipe($.if(isProd,
      combine(
        $.rev.manifest('assets.json'),
        gulp.dest('manifest')
      )
    ));
};
