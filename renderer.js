// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const { BrowserWindow } = require('electron').remote
const path = require('path')

const newWindowBtn = document.getElementById('new-window')

newWindowBtn.addEventListener('click', (event) => {
    const modalPath = path.join('file://', __dirname, 'sections/window/photo.html')
    let win = new BrowserWindow({
        width: 600, height: 400,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
        }
    })

    win.on('close', () => { win = null })
    win.loadURL(modalPath)
    win.show()
    // // Open the DevTools.
    // win.webContents.openDevTools()
})
