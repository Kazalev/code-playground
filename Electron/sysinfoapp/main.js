const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

let win;

const createWindow = () => {
    // Create BrowserWindow
    win = new BrowserWindow({
        width: 800, height: 600, icon: __dirname + '/img/gear.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // Load index.html

    win.loadFile('index.html')

    // win.loadURL(url.format({
    //     pathname: path.join(__dirname, 'index.html'),
    //     protocol: 'file:',
    //     slashes: true
    // }))

    // Open devtools
    win.webContents.openDevTools()

    // 
    win.on('closed', () => {
        win = null
    })
}

// Run create window function
app.whenReady().then(() => {
    createWindow()
})

// app.on('ready', createWindow)

// Quit when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})