var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var pngquant = require('imagemin-pngquant');
var mozjpeg = require('imagemin-mozjpeg');
var bytediff = require('gulp-bytediff');
var gulpif = require('gulp-if');
const logger = require('./logger');

module.exports = function gulpImagemin(srcGlob, destPath, opts, cb) {
    try {
        logger.log('== gulpImagemin start ==');
        if (typeof opts === 'function') {
            cb = opts;
            opts = {};
        }

        // 读取配置
        var enable = opts.enable || false;
        var pngMinQuality = opts.pngMinQuality || 50;
        var pngMaxQuality = opts.pngMaxQuality || 70;
        var jpgQuality = opts.jpgQuality || 50;
        var showDetail = opts.showDetail || true;

        var pngQuality = [pngMinQuality / 100, pngMaxQuality / 100]

        var plugins = [
            pngquant({
                quality: pngQuality
            }),
            mozjpeg({
                quality: jpgQuality,
                progressive: true,
            })
        ];

        logger.log('== gulpImagemin start srcGlob == ' + srcGlob);
        gulp.src(srcGlob)
            .pipe(gulpif(showDetail, bytediff.start()))
            .pipe(imagemin(plugins))
            .pipe(gulpif(showDetail, bytediff.stop()))
            .pipe(gulp.dest(destPath))
            .on('end', cb);

        // if (opts.cache === false) {
        //     gulp.src(srcGlob)
        //         .pipe(imagemin(plugins))
        //         .pipe(gulp.dest(destPath))
        //         .on('end', cb);
        // } else {
        //     gulp.src(srcGlob)
        //         .pipe(cache(imagemin(plugins)))
        //         .pipe(gulp.dest(destPath))
        //         .on('end', cb);
        // }
    } catch (error) {
        logger.error('== gulpImagemin error ==');
        logger.error(error);
    }
};