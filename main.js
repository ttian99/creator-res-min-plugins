'use strict';
var gulpTools = require('./lib/gulpfile');

module.exports = {
  load() {
    // execute when package loaded
    Editor.log('== res-min load ==');
    console.log = Editor.log;
  },

  unload() {
    // execute when package unloaded
    Editor.log('== res-min unload ==');
  },

  // register your ipc messages here
  messages: {
    'open'() {
      // open entry panel registered in package.json
      Editor.Panel.open('res-min');
    },
    'res-min'() {
      Editor.log('Hello World!');
      // send ipc message to panel
      // Editor.Ipc.sendToPanel('res-min', 'res-min:hello');
      Editor.log('res-min!');
      gulpTools();
    },
    'clicked'() {
      Editor.log('Button clicked!');
      gulpTools();
    }
  },
};