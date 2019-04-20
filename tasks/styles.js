const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const combine = require('stream-combiner2').obj;
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const isDev = require('yargs').argv.development;
const isProd = require('yargs').argv.production;

module.exports = function (src) {
  const postcssPlugins = [
    autoprefixer({
      browsers: ['> 1% in RU', 'last 2 versions', 'Firefox ESR', 'ie > 10'],
      cascade: false,
      remove: false
    }),
  ];
  if (isProd) {
    postcssPlugins.push(cssnano());
  }

  $.sass.compiler = require('node-sass');

  return combine(
    gulp.src(src),
    $.if(isDev,
      $.sourcemaps.init()
    ),
    $.sass({
      includePaths: ['node_modules'],
    }),
    $.postcss(postcssPlugins),
    $.if(isDev, $.sourcemaps.write()),
    $.if(isProd,
      combine(
        $.revReplace({ manifest: gulp.src('manifest/styles-assets.json', { allowEmpty: true }) }),
        $.rev()
      )
    ),
    gulp.dest('public/styles'),
    $.if(isProd,
      combine(
        $.rev.manifest('styles.json'),
        gulp.dest('manifest')
      )
    )
  ).on('error', $.notify.onError());
};
