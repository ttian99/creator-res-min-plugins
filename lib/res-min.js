var gulpImagemin = Editor.require('packages://res-min/lib/gulp-imagemin.js');
var Path = require('path');
var Fs = require('fs-extra');
const logger = require('./logger');

module.exports = function resMin(resPath, opts, cb) {
    try {
        logger.log('== 压缩准备 ==');
        logger.log('resMin: resPath = ' + resPath);
        var buildPath = resPath;
        // var tempPath = path.join(resPath, '../res-temp');
        var tempPath = Path.join(Editor.Project.path, 'build/res-temp/');
        var resPath = Path.join(resPath, '**/*.{png,jpg}');
        logger.log('resPath = ' + resPath);
        logger.log('buildPath = ' + buildPath);
        logger.log('tempPath = ' + tempPath);
        // 清理缓存的资源文件夹
        if (!Fs.existsSync(tempPath)) {
            Fs.mkdirpSync(tempPath);
        } else {
            Fs.emptyDirSync(tempPath);
        }

        logger.log('== 开始压缩 ===');
        gulpImagemin(resPath, tempPath, opts, function () {
            Fs.copySync(tempPath, buildPath);
            logger.success('== 完成压缩 ===');
            cb && cb();
        }.bind(this));
    } catch (error) {
        logger.error('== 错误压缩 ===');
        logger.error(error);
    }
}