const { app, BrowserWindow } = require('electron');
app.commandLine.appendSwitch('disable-site-isolation-trials')

const path = require('path');
const url = require('url');

function createWindow () {
const mainWindow = new BrowserWindow({
 width: 800,
 height: 600,
webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
    enableRemoteModule: true,
}
})

/*mainWindow.loadURL(
url.format({
pathname: path.join(__dirname, 'index.html'),
protocol: 'file:',
slashes: true
})
)*/
mainWindow.loadFile('index.html')
mainWindow.on('closed', function () {
mainWindow = null
 })
}




app.whenReady().then(() => {

createWindow()

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        enableRemoteModule: false,
        sandbox: true
      }
    });
  
    // Load your app's HTML file
    mainWindow.loadFile('index.html');
  });


app.on('activate', function () {

if (BrowserWindow.getAllWindows().length === 0) createWindow()

})

})


app.on('window-all-closed', function () {

if (process.platform !== 'darwin') app.quit()

})