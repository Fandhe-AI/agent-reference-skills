---
source: https://www.electronjs.org/docs/latest/tutorial/ipc
---

# IPC: Renderer to Main (Two-Way)

Request/response from the renderer to the main process with `ipcRenderer.invoke` and `ipcMain.handle` (Pattern 2), here opening a native file dialog.

```js
// main.js
const { app, BrowserWindow, ipcMain, dialog } = require('electron/main')
const path = require('node:path')

async function handleFileOpen () {
  const { canceled, filePaths } = await dialog.showOpenDialog()
  if (!canceled) {
    return filePaths[0]
  }
}

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  ipcMain.handle('dialog:openFile', handleFileOpen)
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
```

```js
// preload.js
const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile')
})
```

```js
// renderer.js
const btn = document.getElementById('btn')
const filePathElement = document.getElementById('filePath')

btn.addEventListener('click', async () => {
  const filePath = await window.electronAPI.openFile()
  filePathElement.innerText = filePath
})
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Dialog</title>
  </head>
  <body>
    <button type="button" id="btn">Open a File</button>
    File path: <strong id="filePath"></strong>
    <script src='./renderer.js'></script>
  </body>
</html>
```

## Notes

- Source fiddle: `docs/fiddles/ipc/pattern-2`. `ipcMain.handle` returns a value (or Promise) that resolves the renderer's `invoke` promise.
- The channel name `dialog:openFile` is a convention; the `ipcMain.handle` and `ipcRenderer.invoke` strings must match.
- Distance: `dialog` is the Electron main-process API for OS-native dialogs; Web UI dialog components are in ark-ui / chakra-ui.
