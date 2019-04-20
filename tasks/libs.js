const gulp = require('gulp');

module.exports = function (libsSrc) {
  return gulp.src(libsSrc, { since: gulp.lastRun('libs') })
    .pipe(gulp.dest('public/libs'));
};
