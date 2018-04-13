// 指定一个新的 cwd (当前工作目录)
// gulp --cwd gulp-tools

var gulp = require('gulp');
var path = require('path');
var fs = require('fs-extra');
var async = require('async');

/***********************************************************
 *  gulp 任务
 ***********************************************************/

// 资源压缩
var gulpImagemin = require('./gulp-imagemin');
var DEFAULT_BUILD_PATH = '../build/web-mobile/'; // 默认编译完成的路径
var QQPLAY_PATH = '../build/qqplay/'; // qqplay路径
var RES_TEMP_PATH = '../build/res-temp/res/raw-assets'; // 压缩后资源缓存路径

function resMin3(buildPath, cb) {
  // 检测路径是否传入
  if (buildPath instanceof Function) {
    cb = buildPath;
    buildPath = DEFAULT_BUILD_PATH;
  }
  // 清理缓存的资源文件夹
  if (!fs.existsSync(RES_TEMP_PATH)) {
    fs.mkdirpSync(RES_TEMP_PATH);
  } else {
    fs.emptyDirSync(RES_TEMP_PATH);
  }

  var resMinPath = path.join(buildPath, 'res/raw-assets/**/*.{png,jpg}');
  var opt = {
    cache: false,
    pngQuality: '50',
    jpgQuality: '70'
  };
  gulpImagemin(resMinPath, buildPath, opt, function () {
    console.log('resMinPath = ' + resMinPath);
    fs.copySync(RES_TEMP_PATH, path.join(buildPath + 'res/raw-assets/'));
    cb && cb();
  }.bind(this));
}

// 压缩资源
// gulp.task('res:min', function (done) {
//   try {
//     resMin3(QQPLAY_PATH, done);
//   } catch (err) {
//     console.error(new Error(err));
//   }
// });

function start() {
  Editor.log('== start ==');
  resMin3(QQPLAY_PATH, function () {
    Editor.info('== over ==');
  });
}

function prepare() {
  
}

module.exports = start;