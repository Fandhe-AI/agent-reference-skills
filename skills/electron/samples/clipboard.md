---
source: https://github.com/electron/electron/tree/v44.8.0/docs/fiddles/system/clipboard
---

# Clipboard (Copy and Paste Text)

Read and write the system clipboard text from the main process on behalf of the renderer.

```js
// main.js
const { app, BrowserWindow, ipcMain, clipboard } = require('electron/main')
const path = require('node:path')

let mainWindow = null

function createWindow () {
  const windowOptions = {
    width: 600,
    height: 400,
    title: 'Clipboard paste',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  }

  mainWindow = new BrowserWindow(windowOptions)
  mainWindow.loadFile('index.html')

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

ipcMain.handle('clipboard:readText', () => {
  return clipboard.readText()
})

ipcMain.handle('clipboard:writeText', (event, text) => {
  clipboard.writeText(text)
})

app.whenReady().then(() => {
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
// preload.js (copy fiddle)
const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('clipboard', {
  writeText: (text) => ipcRenderer.invoke('clipboard:writeText', text)
})
```

```js
// renderer.js (copy fiddle)
const copyBtn = document.getElementById('copy-to')
const copyInput = document.getElementById('copy-to-input')

copyBtn.addEventListener('click', () => {
  if (copyInput.value !== '') copyInput.value = ''
  copyInput.placeholder = 'Copied! Paste here to see.'
  window.clipboard.writeText('Electron Demo!')
})
```

## Notes

- The fiddle is split into `copy` and `paste` apps; the main file above is the paste one (it handles both `readText` and `writeText`), and the preload / renderer shown are the copy one. The paste preload also exposes `readText` over `clipboard:readText`.
- The clipboard module is used in the main process here and reached via IPC with a narrow `contextBridge` API.
- Distance: this is the OS clipboard API of Electron, not a Web UI component (ark-ui / chakra-ui).
