var app = require('app')  // Module to control application life.
var BrowserWindow = require('browser-window')  // Module to create native browser window.
var Menu = require('menu')
var Tray = require('tray')
var path = require('path')

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
var appIcon = null

app.on('ready', function () {
  var screen = require('screen')
  var size = screen.getPrimaryDisplay().workAreaSize
  // Create the browser window.
  // mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow = new BrowserWindow({ width: size.width, height: size.height })

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html')

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  // tray
  var iconPath = path.join(__dirname, 'IconTemplate.png')
  appIcon = new Tray(iconPath);
  var contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' },
  ]);
  appIcon.setToolTip('This is my application.');
  appIcon.setContextMenu(contextMenu);

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
