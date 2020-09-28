// 安装第三方依赖包
module.exports = function installLibs() {
    logger.info('开始安装第三方包！');
    var cwd = Editor.Package.packagePath('res-min');
    logger.info('cwd = ' + cwd);

    var opts = {
        // stdio: 'inherit',
        encoding: 'utf8',
        timeout: 0,
        maxBuffer: 900 * 1024,
        killSignal: 'SIGTERM',
        cwd: cwd,
        env: null
    }
    logger.log('npm install');
    var cmd = process.platform == 'win32' ? 'npm.cmd' : 'npm';
    var ls = spawn(cmd, ['install'], opts);
    ls.stdout.on('data', function (data) {
        logger.log(data + '');
    });
    ls.stderr.on('data', function (data) {
        logger.error('child error: ' + data + '');
    });
    ls.on('error', function () {
        logger.error('错误安装第三方包！');
    });
    ls.on('close', function (code) {
        if (code !== 0) {
            logger.warn('child exists with code: ' + code);
            return;
        }
        logger.success('完成安装第三方包！');
    });
}