var path = require('path');
var fs = require('fs-extra');
var spawn = require('child_process').spawn;

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
  
  try {
    Editor.log('== 开始压缩 ===');
    var gulpImagemin = Editor.require('packages://res-min/lib/gulp-imagemin.js');
    gulpImagemin(resPath, tempPath, opts, function () {
      fs.copySync(tempPath, buildPath);
      Editor.success('== 完成压缩 ===');
      cb && cb();
    }.bind(this));
  } catch (error) {
    Editor.log('== 错误压缩 ===');
    Editor.error(error);
  }
}


// 安装第三方依赖包
task.install = function () {
  Editor.info('开始安装第三方包！');
  var cwd = Editor.Package.packagePath('res-min');
  Editor.info('cwd = ' + cwd);

  var opts = {
    // stdio: 'inherit',
    encoding: 'utf8',
    timeout: 0,
    maxBuffer: 900 * 1024,
    killSignal: 'SIGTERM',
    cwd: cwd,
    env: null
  }
  Editor.log('npm install');
  var cmd = process.platform == 'win32' ? 'npm.cmd' : 'npm';
  var ls = spawn(cmd, ['install'], opts);
  ls.stdout.on('data', function (data) {
    Editor.log(data + '');
  });
  ls.stderr.on('data', function (data) {
    Editor.error('child error: ' + data + '');
  });
  ls.on('error', function() {
    Editor.error('错误安装第三方包！');
  });
  ls.on('close', function (code) {
    if (code !== 0) {
      Editor.warn('child exists with code: ' + code);
      return;
    }
    Editor.success('完成安装第三方包！');
  });
}

module.exports = task;