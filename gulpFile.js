const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const eslint = require('gulp-eslint-new');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const nodemon = require('gulp-nodemon');

const sassTask = (done) => {
    // sass
    gulp.src('./scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./hosted'));

    done();
}

const lintTask = (done) => {
    gulp.src('./sever/**/*.js').pipe(eslint({ fix: true }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
    done();
}

const jsTask = (done) => {
    webpack(webpackConfig).pipe(gulp.dest('./hosted'));

    done()
}

const watch = (done) => {
    gulp.watch('./scss', sassTask);
    gulp.watch(['./client/**/*.js', './client/**/*.jsx'],jsTask);
    // gulp.watch()

    nodemon({
        script:'./server/app.js',
        tasks:['lintTask'],
        watch: ['./server'],
        done: done,
    })

    // done();
}

module.exports = {
    build: gulp.parallel(sassTask, lintTask, jsTask),
    watch,
    sassTask,
    lintTask,
    jsTask,
}