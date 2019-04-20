const path = require('path');

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const combine = require('stream-combiner2').obj;
const named = require('vinyl-named');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');

const isProd = require('yargs').argv.production;

module.exports = function (src) {
  return combine(
    gulp.src(src),
    named(),
    gulpWebpack(
      require(path.resolve(__dirname, '../webpack.config.js')),
      webpack
    ),
    $.if(isProd, $.rev()),
    gulp.dest('public/scripts'),
    $.if(isProd,
      combine(
        $.rev.manifest('scripts.json'),
        gulp.dest('manifest')
      )
    )
  ).on('error', $.notify.onError());
};
