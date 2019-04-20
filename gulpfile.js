'use strict';
const gulp = require('gulp');

const lazyRequireTask = function (taskName, path, options) {
  gulp.task(taskName, function () {
    let task = require(path).call(this, options);
    return task;
  });
};

/* ПУТИ */
const libsSrc = 'frontend/libs/**/*.*';

const assetsSrc = 'frontend/assets/**/*.{gif,jpg,jpeg,png,svg}';

const scriptsSrc = 'frontend/scripts/**/*.js';
const scriptsExSrc = '!frontend/scripts/includes/**/*.js';

const stylesAssetsSrc = 'frontend/styles/**/*.{gif,jpg,png,svg,eot,otf,ttf,woff,woff2,css}';

const stylesSrc = 'frontend/styles/**/*.{scss,sass}';
const stylesExSrc = '!frontend/styles/includes/**/*.{scss,sass}';

const templatesSrc = 'frontend/templates/**/*.{html,njk}';
const templatesExSrc = '!frontend/templates/includes/**/*.{html,njk}';

/* ЭЛЕМЕНТЫ СБОРКИ */
lazyRequireTask('libs', './tasks/libs', libsSrc);
lazyRequireTask('assets', './tasks/assets', assetsSrc);
// Webpack собирает js, все файлы вне includes - входные точки
lazyRequireTask('scripts', './tasks/scripts', [scriptsSrc, scriptsExSrc]);
lazyRequireTask('styles:assets', './tasks/styles-assets', stylesAssetsSrc);
// Все файлы вне includes - входные точки
lazyRequireTask('styles', './tasks/styles', [stylesSrc, stylesExSrc]);
// Не стартует из папки includes, рядом с входным шаблоном можно положить
// одноименный JSON, данные из которого будут переданы на рендер
lazyRequireTask('templates', './tasks/templates', [templatesSrc, templatesExSrc]);

/* СБОРКА */
lazyRequireTask('clean', './tasks/clean');

gulp.task('build', gulp.series(
  'clean',
  gulp.parallel(
    'libs',
    'assets',
    'scripts',
    'styles:assets'
  ),
  'styles',
  'templates'
));

/* РАЗРАБОТКА */
lazyRequireTask('serve', './tasks/serve');

gulp.task('watch', function () {
  gulp.watch(libsSrc, gulp.series('libs'));
  gulp.watch(assetsSrc, gulp.series('assets'));
  gulp.watch(scriptsSrc, gulp.series('scripts'));
  gulp.watch(stylesAssetsSrc, gulp.series('styles:assets', 'styles'));
  gulp.watch(stylesSrc, gulp.series('styles'));
  gulp.watch(templatesSrc, gulp.series('templates'));
});

gulp.task('dev', gulp.series(
  'build',
  gulp.parallel(
    'serve',
    'watch'
  )
));
