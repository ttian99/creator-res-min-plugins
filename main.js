'use strict';

var fs = require('fs-extra');
var task = require('./lib/task.js');

module.exports = {

  load() { // execute when package loaded

  },

  unload() {
    // execute when package unloaded
  },

  // register your ipc messages here
  messages: {
    // 打开面板
    'open'() {
      Editor.Panel.open('res-min');
    },
    'install'() {
      Editor.info('安装res-min插件的第三方依赖包');
      task.install();
    },
    'qqplay'() {
      Editor.log('qqplay!');
    },
    // 压缩图片
    'image-min'(event, resPath) {
      Editor.log('image-min 开始压缩');
      let fileUrl = Editor.url('packages://res-min/config/config.json')
      fs.readJson(fileUrl, (err, json) => {
        if (err) return Editor.error(err);
        Editor.info('get json success');
        Editor.info(json);
        var opts = json;
        Editor.log('image-min 开始压缩 路径:' + resPath + ', 参数：' + JSON.stringify(opts));
        task.resMin(resPath, opts, function () {
          Editor.success('image-min 压缩完成');
        });
      });
    },
    // 保存配置信息
    'save-config'(event, json) {
      Editor.info('配置信息保存');
      Editor.info(JSON.stringify(json));
      var fileUrl = Editor.url('packages://res-min/config/config.json');
      fs.writeJson(fileUrl, json, function (err) {
          if (err) return Editor.error(err)
          Editor.log('配置信息保存成功!');
      });
    },
    // 编译完成的消息
    'editor:build-finished'(event, arg) {
      Editor.log('editor:build-finished');
	    var fileUrl = Editor.url('packages://res-min/config/config.json');
      fs.readJson(fileUrl, (err, json) => {
        if (err) return Editor.error(err);
        Editor.info('get json success');
        Editor.info(json);
        if (json.isAutoResMin) {
          // 自动压缩 
          Editor.Ipc.sendToMain('res-min:image-min', arg.dest);
        } else {
          Editor.log('自动压缩配置为false!!');
        }
      });
    }
  }
};