var app = require('app')  // Module to control application life.
var BrowserWindow = require('browser-window')  // Module to create native browser window.

// Report crashes to our server.
require('crash-reporter').start()

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function () {
  var screen = require('screen')
  var size = screen.getPrimaryDisplay().workAreaSize
  // Create the browser window.
  // mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow = new BrowserWindow({ width: size.width, height: size.height })

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html')

  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.webContents.send('ping', 'whoooooooh!')
  })

  mainWindow.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  // check screen information

  // screen events
  screen.on('display-added', function (event, newDisplay) {
    console.log('added a new display')
  })

  screen.on('display-removed', function (event, oldDisplay) {
    console.log('removed a display')
  })

  screen.on('display-metrics-changed', function (event, display, changedMetrics) {
    console.log('display-metrics-changed')
  })
  // screen info
  var cursor = screen.getCursorScreenPoint()
  console.log(cursor)
  var display = screen.getPrimaryDisplay()
  console.log(display)
})

var ipc = require('ipc')

ipc.on('asynchronous-message', function (event, arg) {
  console.log(arg)  // prints "ping"
  event.sender.send('asynchronous-reply', 'asynchronous pong')
})

ipc.on('synchronous-message', function (event, arg) {
  console.log(arg)  // prints "ping"
  event.returnValue = 'synchronous pong'
})
