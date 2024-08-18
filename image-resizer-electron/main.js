const path = require('path');
const os = require('os');
const fs = require('fs');
const resizeImg = require('resize-img')
const { app, BrowserWindow, Menu, ipcMain, shell } = require('electron');


process.env.NODE_ENV = 'production'; //change to development when in development mode for dev tools to open by default

//checks if process is running on Mac, used for closing the application when windows are closed.
const isMac = process.platform === 'darwin';
const isDev = process.env.NODE_ENV !== 'production';

let mainWindow;


//creates Main Window
function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: 'Image Resizer',
        width: isDev ? 1000 : 500,
        height: 800,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    //Open devtools if in dev environment
    if(isDev) {
        mainWindow.webContents.openDevTools();
    }
    
    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

//Create About Window
function createAboutWindow() {
    const aboutWindow = new BrowserWindow({
        title: 'About Image Resizer',
        width: 300,
        height: 300,
    });
    aboutWindow.loadFile(path.join(__dirname, './renderer/about.html'));


}

// App is ready
app.whenReady().then(() => {
    createMainWindow();

    // implementation of menu
    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

    //removes mainWindow global variable from memory on 'closed'
    mainWindow.on('closed', () => (mainWindow = null));

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    })
});

//menu template
const menu = [
    ...(isMac ? [{
        label: app.name,
        submenu: [
            {
                label: 'About',
                click: createAboutWindow
            }
        ]
    }] : []),
    {
        role: 'fileMenu',
    },
    ...(!isMac ? [{
        label: 'Help',
        submenu: [
            {
                label: 'About',
                click: createAboutWindow
            },
        ],
    }] : []),

];

//respond to ipcRenderer 'image:resize' event
ipcMain.on('image:resize', (e, options) => {
    options.dest = path.join(os.homedir(), 'imageresizer');
    resizeImage(options);
});

//Resizes the inputted image
async function resizeImage( { imgPath, width, height, dest }) {
    try {
        const newPath = await resizeImg(fs.readFileSync(imgPath), {
            width: +width,
            height: +height
        });

        //filename is the same as original file name
        const filename = path.basename(imgPath);

        //create destination folder (if it doesn't exist)
        if(!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }

        //write the new image to the destination folder
        fs.writeFileSync(path.join(dest, filename), newPath);

        //send success message to the renderer
        mainWindow.webContents.send('image:done');
        //open destination folder
        shell.openPath(dest);
    } catch (error) {
        console.log(error);
    }
}

//when windows get closed, application should stop running (unless Mac)
app.on('window-all-closed', () => {
    if(!isMac) {
        app.quit();
    }
});