const { dest, parallel, src, watch } = require('gulp');
const concat = require('gulp-concat');
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const webpack = require('webpack-stream');
const browserSync = require('browser-sync').create();

const styles = () => {
  return src('./src/scss/*.scss')
    .pipe(scss({ outputStyle: 'expanded' }))
    .pipe(autoprefixer({
      cascade: true,
      overrideBrowserslist: ['last 5 versions']
    }))
    .pipe(concat('main.css'))
    .pipe(dest('./docs/css/'))
    .pipe(browserSync.stream());
}

const html = () => {
  return src('./src/*.html')
    .pipe(dest('./docs/'))
    .pipe(browserSync.stream());
}

const js = () => {
  return src('./src/js/*.js')
    .pipe(webpack())
    .pipe(concat('main.js'))
    .pipe(dest('./docs/js/'))
    .pipe(browserSync.stream());
}

const watching = () => {
  watch('./src/scss/*.scss', parallel(styles));
  watch('./src/js/*.js', parallel(js));
  watch('./src/*.html', parallel(html));
}

const server = () => {
  browserSync.init({
    server: {
      baseDir: './docs/'
    }
  });
}

exports.build = parallel(styles, html, js);
exports.default = parallel(exports.build, server, watching);