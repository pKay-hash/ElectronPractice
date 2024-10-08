const { app, BrowserWindow, desktopCapturer, ipcMain } = require('electron');
const remoteMain = require('@electron/remote/main');

const path = require('node:path');


const isMac = process.platform === 'darwin';
remoteMain.initialize();
const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true, 
        enableRemoteModule: true,

    },
  });
  remoteMain.enable(mainWindow.webContents);

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'renderer/index.html'));

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // handle the getSources from the desktopCapturer 
  ipcMain.handle('get-video-sources', async () => {
    const inputSources = await desktopCapturer.getSources({
      types: ['window', 'screen']
    });
    return inputSources;
  });

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
});
