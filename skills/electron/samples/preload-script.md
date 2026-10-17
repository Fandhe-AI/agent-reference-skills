---
source: https://www.electronjs.org/docs/latest/tutorial/tutorial-preload
---

# Preload Script with contextBridge

Expose selected versions and a `ping()` IPC call to the renderer through a preload script, without exposing `ipcRenderer` itself.

```js
// preload.js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping')
  // we can also expose variables, not just functions
})
```

```js
// main.js
const { app, BrowserWindow, ipcMain } = require('electron/main')

const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile('index.html')
}
app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  createWindow()
})
```

```js
// renderer.js
const func = async () => {
  const response = await window.versions.ping()
  console.log(response) // prints out 'pong'
}

func()
```

## Notes

- Never expose the whole `ipcRenderer` module via `contextBridge`; wrap each call in a helper function so the renderer cannot send arbitrary IPC messages.
- Register `ipcMain.handle` before loading the HTML so the handler exists when the renderer calls `invoke`.
- Since Electron 20 preload scripts are sandboxed by default: a polyfilled `require` with Electron renderer modules, `events`, `timers`, `url`, and polyfilled globals `Buffer`, `process`, `clearImmediate`, `setImmediate`.
- The tutorial's `renderer.js` reads `versions.chrome()` etc. and writes them into an element with id `info`; see the `docs/fiddles/tutorial-preload` fiddle for the full set.
