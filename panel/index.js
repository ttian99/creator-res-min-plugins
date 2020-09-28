let fs = require('fs-extra');
var mgr = require(Editor.url('packages://res-min/lib/mgr.js'));
var logger = require(Editor.url('packages://res-min/lib/logger.js'));
// const mgr = require(Editor.url('packages://res-min/lib/mgr.js'));

// 引入electron的对话框: https://electronjs.org/docs/api/dialog
// let { dialog } = require('electron').remote;

Editor.Panel.extend({

  // 使用独立的 HTML 和 CSS 文件
  style: fs.readFileSync(Editor.url('packages://res-min/panel/index.css', 'utf8')),
  template: fs.readFileSync(Editor.url('packages://res-min/panel/index.html', 'utf8')),

  ready() {
    // 获取配置
    Editor.Ipc.sendToMain('res-min:get-config', function (error, answer) {
      if (error) {
        logger.failed('加载自动压缩配置失败');
        logger.error(error);
        return;
      }
      logger.success('自动压缩配置', answer);
      this.initVue(answer);
    }.bind(this));
  },
  // 关闭面板保存配置
  close() {
    // Editor.Ipc.sendToMain('res-min:save-config', config)
  },
  messages: {

  },

  initVue(json) {
    new window.Vue({
      el: this.shadowRoot,
      data: {
        // 自动压缩配置
        enable: json.enable,
        enableCache: json.enableCache,
        jpgQuality: json.jpgQuality,
        pngMinQuality: json.pngMinQuality,
        pngMaxQuality: json.pngMaxQuality,
        // 手动压缩配置
        srcPath: json.srcPath,
        dstPath: json.dstPath,
      },
      methods: {
        onClickSaveConfig() {
          var json = {
            enable: this.enable,
            enableCache: this.enableCache,
            jpgQuality: this.jpgQuality,
            pngMinQuality: this.pngMinQuality,
            pngMaxQuality: this.pngMaxQuality,
            // 手动压缩配置
            srcPath: this.srcPath,
            dstPath: this.dstPath,
          }
          Editor.Ipc.sendToMain('res-min:set-config', json);
        },
        onClickCompress() {
          logger.info('onClickCompress = ' + JSON.stringify(this.data));

        },
        onClickSrcPath() {
          logger.info('onClickSrcPath = ' + JSON.stringify(this.srcPath));

          try {
            let srcPath = Editor.Dialog.openFile({
              title: '选择压缩资源目录',
              defaultPath: Editor.Project.path || Editor.projectPath,
              properties: ['openDirectory'],
            });
            if (srcPath == '-1') {
              srcPath = '';
              logger.log('取消选择');
            }
            this.srcPath = srcPath;
          } catch (error) {
            logger.failed(error);
          }
        },
        onClickDstPath() {
          logger.info('onClickDstPath = ' + JSON.stringify(this.dstPath));
          try {
            let dstPath = Editor.Dialog.openFile({
              title: '选择压缩资源目录',
              defaultPath: Editor.Project.path || Editor.projectPath,
              properties: ['openDirectory'],
            });
            if (dstPath == '-1') {
              dstPath = '';
              logger.log('取消选择');
            }
            this.dstPath = dstPath;
          } catch (error) {
            logger.failed(error);
          }
        }
      }
    });
  }
});
