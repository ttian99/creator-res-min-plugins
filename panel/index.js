let fs = require('fs-extra');
let path = require('path');

// 引入electron的对话框: https://electronjs.org/docs/api/dialog
let { dialog } = require('electron').remote;

let cfg = {};

Editor.Panel.extend({
  style: `
    :host {
      margin: 10px;
    }

    .quality: {
      width: 40px;
    }
  `,

  template: `
  
  <h2>res-min</h2>
  <hr />
  <h3>压缩资源配置</h3>
  <br />
  <input type="checkbox" id="checkbox" v-model="isAutoResMin" @change="onCheckBox1">
  <label for="checkbox">自动压缩{{ isAutoResMin }}</label>
  <br />
  <input type="checkbox" id="checkbox" v-model="cache" @change="onCheckBox2">
  <label for="checkbox">启用缓存{{ cache }}</label>
  <br />
  <label for="text">设置png格式图片的品质(1-100):</label>
  <input class="quality" type="text" v-model="pngQuality"></input>
  <br />
  <label for="text">设置jpg格式图片的品质(1-100):</label>
  <input class="quality" type="text" v-model="jpgQuality"></input>
  <br />
  <hr />
  <button id="btn" @click=onBtnClick>保存配置</button>
  <hr />
  `,

  ready() {
    Editor.log('ready');
    let fileUrl = Editor.url('packages://res-min/config/config.json')
    fs.readJson(fileUrl, (err, json) => {
      if (err) return Editor.error(err);
      Editor.info('get json success');
      Editor.info(JSON.stringify(json));

      cfg = json;

      new window.Vue({
        el: this.shadowRoot,
        data: {
          isAutoResMin: json.isAutoResMin,
          jpgQuality: json.jpgQuality,
          pngQuality: json.pngQuality,
          cache: json.cache
        },
        methods: {
          // 数据变化时的
          onCheckBox1: function () {
            // Editor.info('isAutoResMin = ' + this.isAutoResMin);
          },
          onCheckBox2: function () {
            // Editor.info('cache = ' + this.cache);
          },
          onBtnClick: function () {
            var json = {
              isAutoResMin: this.isAutoResMin,
              jpgQuality: this.jpgQuality,
              pngQuality: this.pngQuality,
              cache: this.cache
            };
            Editor.info('save config: ' + JSON.stringify(json));
            Editor.Ipc.sendToMain('res-min:save-config', json);
          }
        }
      });
    });
  },
  // 关闭面板保存配置
  close() {
    // Editor.Ipc.sendToMain('res-min:save-config', config)
  },
  messages: {

  }
});
