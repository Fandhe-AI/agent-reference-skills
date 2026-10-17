---
source: https://www.electronjs.org/docs/latest/tutorial/ipc
---

# IPC: Renderer to Main (One-Way)

Fire-and-forget message from the renderer to the main process with `ipcRenderer.send` and `ipcMain.on` (Pattern 1).

```js
// main.js
const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

function handleSetTitle (event, title) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
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
  ipcMain.on('set-title', handleSetTitle)
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
  setTitle: (title) => ipcRenderer.send('set-title', title)
})
```

```js
// renderer.js
const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
  const title = titleInput.value
  window.electronAPI.setTitle(title)
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
    <title>Hello World!</title>
  </head>
  <body>
    Title: <input id="title"/>
    <button id="btn" type="button">Set</button>
    <script src="./renderer.js"></script>
  </body>
</html>
```

## Notes

- Source fiddle: `docs/fiddles/ipc/pattern-1`. Use this pattern when no reply is needed; use `ipcRenderer.invoke` / `ipcMain.handle` when the renderer needs a result.
- The handler gets `event.sender` (the `WebContents`); `BrowserWindow.fromWebContents` maps it back to the window.
- Expose a narrow wrapper (`setTitle`) through `contextBridge`, not `ipcRenderer` itself.
