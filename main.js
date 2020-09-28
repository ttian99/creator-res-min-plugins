'use strict';

// 数据管理类
const mgr = require('./lib/mgr.js');

module.exports = {
  load() {
    // 加载config
    var mgr = require('./lib/mgr.js');
    mgr.loadCfg();
    // 监听构建
    var onBeforeBuildFinish = require('./lib/onBeforeBuildFinish');
    Editor.Builder.on('before-change-files', onBeforeBuildFinish);
  },

  unload() {
    // 取消监听
    var onBeforeBuildFinish = require('./lib/onBeforeBuildFinish');
    Editor.Builder.off('before-change-files', onBeforeBuildFinish);
  },

  // register your ipc messages here
  messages: {
    // 打开面板
    'open'() {
      Editor.Panel.open('res-min');
    },
    'install'() {
      Editor.info('安装res-min插件的第三方依赖包');
      // install();
    },
    'reload'() {
      Editor.info('重启插件');
    },

    'get-config'(event) {
      const json = mgr.getCfg();
      if (event.reply) {
        event.reply(null, json);
      }
    },
    'set-config'(event, data) {
      mgr.setCfg(data);
      mgr.saveCfg();
    }
  }
};
