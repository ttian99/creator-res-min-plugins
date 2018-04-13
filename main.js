'use strict';

module.exports = {
  load () {
    // execute when package loaded
    Editor.log('== res-min load ==');
  },

  unload () {
    // execute when package unloaded
    Editor.log('== res-min unload ==');
  },

  // register your ipc messages here
  messages: {
    'open' () {
      // open entry panel registered in package.json
      Editor.Panel.open('res-min');
    },
    'say-hello' () {
      Editor.log('Hello World!');
      // send ipc message to panel
      Editor.Ipc.sendToPanel('res-min', 'res-min:hello');
    },
    'clicked' () {
      Editor.log('Button clicked!');
    }
  },
};