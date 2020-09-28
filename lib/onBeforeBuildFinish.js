var resMin = require('./res-min.js');
var mgr = require('./mgr.js');
const logger = require('./logger.js');

function onBeforeBuildFinish(options, callback) {
    logger.log('Building ' + options.platform + ' to ' + options.dest); // 你可以在控制台输出点什么
    try {
        var opts = mgr.getCfg();
        logger.log('opts', opts);
        if (opts.enable) {
            var dir = options.dest;
            logger.log('自动压缩资源路径：' + dir);
            
            resMin(dir, opts, callback);
        } else {
            callback();
        }
    } catch (error) {
        logger.error('== 错误resMin ===');
        logger.error(error);
    }
}
module.exports = onBeforeBuildFinish;