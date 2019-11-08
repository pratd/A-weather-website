// https://www.youtube.com/watch?v=QgMQeLymAdU
const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const minify = require('gulp-minify');



function jsmin(){
  return (
    gulp
      .src("./dev/*.js")
      .pipe(minify({noSource: true}))
      .pipe(gulp.dest("./public/js"))
  );
}

function watch() {
  browserSync.init({
    server: { baseDir: "./" }
  });
  gulp.watch("*.html").on("change", browserSync.reload);
  gulp.watch("./dev/*.js").on("change", jsmin);
  gulp.watch("./public/*.js").on("change", browserSync.reload);
}

  
exports.jsmin = jsmin;
exports.watch = watch;