// eslint-disable-next-line @typescript-eslint/no-var-requires
const gulp = require("gulp");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const del = require("del");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const obfuscator = require("gulp-javascript-obfuscator");

function clean() {
  return del(["./prod"]);
}

function jsTask() {
  return gulp
    .src(["./build/**/*.js"])
    .pipe(obfuscator())
    .pipe(gulp.dest("prod"));
}

exports.default = gulp.series(clean, jsTask);
