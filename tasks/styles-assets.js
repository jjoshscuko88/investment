const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const combine = require('stream-combiner2').obj;

const isProd = require('yargs').argv.production;

module.exports = function (stylesAssetsSrc) {
  return combine(
    gulp.src(stylesAssetsSrc, { since: gulp.lastRun('styles:assets') }),
    $.imagemin(),
    $.if(isProd, $.rev()),
    gulp.dest('public/styles'),
    $.if(isProd,
      combine(
        $.rev.manifest('styles-assets.json'),
        gulp.dest('manifest')
      )
    )
  );
};
