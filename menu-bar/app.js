const menubar = require('menubar')

var mb = menubar({dir: __dirname})

mb.on('ready', function ready() {
  console.log('app is ready')
})

mb.on('create-window', function () {
  console.log('creating window')
})

mb.on('after-create-window', function() {
  console.log('created window')
})

mb.on('show', function() {
  console.log('window.show is called')
})

mb.on('after-show', function() {
  console.log('window is shown')
})

mb.on('hide', function() {
  console.log('window.hide is called')
})

mb.on('after-hide', function() {
  console.log('window is hided')
})
