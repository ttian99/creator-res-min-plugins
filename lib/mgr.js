var Fs = require('fs');
var Path = require('path');
const logger = require('./logger');

var mgr = {
    cfg: {
        // 自动压缩配置
        "enable": false,
        "enableCache": false,
        "jpgQuality": 70,
        "pngMinQuality": 50,
        "pngMaxQuality": 70,
        // 手动压缩配置
        "srcPath": '',
        "dstPath": ''
    },

    getCfgPath() {
        // 配置文件路径信息
        var configFileName = 'res-min-config.json';
        var configDirPath = 'local';
        var projectPath = Editor.Project.path || Editor.projectPath;
        var configFilePath = Path.join(projectPath, configDirPath, configFileName);
        return configFilePath;
    },

    loadCfg() {
        try {     
            var url = this.getCfgPath();
            if (!Fs.existsSync(url)) {
                logger.failed('没有配置文件!');
                this.saveCfg();
                return;
            }
            var jsonStr = Fs.readFileSync(url, { encoding: 'utf8' });
            const json = JSON.parse(jsonStr);
            this.setCfg(json);
            logger.success('加载配置: ', jsonStr);
        } catch (error) {
            logger.failed('加载配置失败', error);;
        }
    },
    saveCfg() {
        try {
            var json = this.cfg;
            var jsonStr = JSON.stringify(json);
            var url = this.getCfgPath();
            Fs.writeFileSync(url, jsonStr, { encoding: 'utf8' });
            logger.success('保存配置: ', jsonStr);
        } catch (error) {
            logger.failed('保存配置失败', error);
        }
    },

    getCfg() {
        return this.cfg;
    },
    setCfg(data, save) {
        if (!data) return;
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                this.cfg[key] = data[key];
            }
        }
        save && this.saveCfg();
    }
}
module.exports = mgr;