const gulp = require('gulp')
const babel = require('rollup-plugin-babel')
const rename = require('gulp-rename')
const del = require('del')
const Rollup = require('rollup')
const rollup = require('gulp-rollup')
const size = require('gulp-size')

const cssnano = require('gulp-cssnano')
const sass = require('gulp-sass')

const run = require('run-sequence')

const uglify = require('rollup-plugin-uglify')

const rollupConfig = mini => ({
  rollup: Rollup,
  entry: './src/oct.js',
  moduleName: 'oct',
  format: 'umd',
  exports: 'named',
  plugins: [babel({exclude: 'node_modules/**'})].concat(
    mini ? [
      uglify({
        compress: {warnings: false},
        mangle: true,
        sourceMap: false,
      })] : []
  ),
})

gulp.task('clean', () => del(['./dist']))

gulp.task('js', () => {
  gulp.src('./src/*.js')
      .pipe(rollup(rollupConfig(false)))
      .pipe(size({ showFiles: true }))
      .pipe(gulp.dest('./dist'))

  gulp.src('./src/*.js')
      .pipe(rollup(rollupConfig(true)))
      .pipe(rename('oct.min.js'))
      .pipe(size({ showFiles: true }))
      .pipe(size({ gzip: true, showFiles: true }))
      .pipe(gulp.dest('./dist'))
})

gulp.task('style', () => {
  gulp.src(['./src/oct.scss'])
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./dist'))
      .pipe(cssnano())
      .pipe(rename('oct.min.css'))
      .pipe(gulp.dest('./dist'))
})

gulp.task('default', ['clean'], () => {
  run('js', 'style')
  gulp.watch('./src/oct.scss', ['style'])
  gulp.watch('./src/oct.js', ['js'])
})
