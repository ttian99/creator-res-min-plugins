var path = require('path');
var fs = require('fs-extra');

var task = {};

// 压缩
task.resMin = function (resPath, opts, cb) {
  Editor.log('task.resMin: resPath = ' + resPath);
  var buildPath = resPath;
  var tempPath = path.join(resPath, '../res-temp');
  var resPath = path.join(resPath, '**/*.*');
  Editor.log('resPath = ' + resPath);
  Editor.log('buildPath = ' + buildPath);
  Editor.log('tempPath = ' + tempPath);
  // 清理缓存的资源文件夹
  if (!fs.existsSync(tempPath)) {
    fs.mkdirpSync(tempPath);
  } else {
    fs.emptyDirSync(tempPath);
  }
  
  var gulpImagemin = Editor.require('packages://res-min/lib/gulp-imagemin.js');
  gulpImagemin(resPath, tempPath, opts, function () {
    fs.copySync(tempPath, buildPath);
    Editor.info('-- imagemin success --');
    cb && cb();
  }.bind(this));
}


module.exports = task;