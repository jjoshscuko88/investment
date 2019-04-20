const fs = require('fs');
const path = require('path');

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const combine = require('stream-combiner2').obj;

const helper = require(path.resolve(__dirname, '../helpers/templatesHelper'));
const isProd = require('yargs').argv.production;

module.exports = function (src) {
  const manifests = [
    'manifest/assets.json',
    'manifest/scripts.json',
    'manifest/styles.json',
  ];

  return combine(
    gulp.src(src),
    $.data(function(file) {
      const dataPath = `${file.dirname}/${file.stem}.json`;
      return fs.existsSync(dataPath) ? JSON.parse(fs.readFileSync(dataPath)) : null;
    }),
    $.nunjucks.compile({ helper }, {
      trimBlocks: true,
      lstripBlocks: true,
    }),
    $.rename({
      'extname': '.html',
    }),
    $.if(isProd,
      $.revReplace({ manifest: gulp.src(manifests, { allowEmpty: true }) })
    ),
    gulp.dest('public')
  ).on('error', $.notify.onError());
};
