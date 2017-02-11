
var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var net = require('net');



var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});


// single instance with argumment from segund instance
const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();

    var arq = "./media/default.mp4";

    // title and video from player
    if (commandLine.length >= 3) {

          arq = commandLine[2];

          try {

              var barCount = arq.split('/').length;
              var nameFile = arq.split('/')[barCount - 1];

          } catch(exception) {}
    }

    mainWindow.focus();
    mainWindow.rendererSide = {media: arq};
    mainWindow.title = "MonikVideos";
    mainWindow.reload();
  }

});

// close segund instance
if (shouldQuit) {
  app.quit();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {

  var arq = "./media/default.mp4";

  if (process.argv.length >= 3) {

        arq = process.argv[2];

        // title and video from player
        try {

            var barCount = arq.split('/').length;
            var nameFile = arq.split('/')[barCount - 1];

        } catch(exception) {}
  }

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 840,
    height: 480,
    frame: true,
    //transparent: true,
    title: "MonikVideos",
    minWidth: 420,
    minHeight: 240,
    icon: __dirname + '/applications/icon.png'
  });

  mainWindow.setMenu(null);
  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/app/index.html');

  mainWindow.rendererSide = {media: arq};

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

});
