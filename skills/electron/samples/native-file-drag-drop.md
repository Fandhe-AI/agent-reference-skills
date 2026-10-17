---
source: https://www.electronjs.org/docs/latest/tutorial/native-file-drag-drop
---

# Native File Drag & Drop

Drag a file out of the web content into the operating system with `webContents.startDrag`.

```js
// preload.js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  startDrag: (fileName) => ipcRenderer.send('ondragstart', fileName)
})
```

```html
<div style="border:2px solid black;border-radius:3px;padding:5px;display:inline-block" draggable="true" id="drag1">Drag me 1</div>
<div style="border:2px solid black;border-radius:3px;padding:5px;display:inline-block" draggable="true" id="drag2">Drag me 2</div>
<script src="renderer.js"></script>
```

```js
// renderer.js
document.getElementById('drag1').ondragstart = (event) => {
  event.preventDefault()
  window.electron.startDrag('drag-and-drop-1.md')
}

document.getElementById('drag2').ondragstart = (event) => {
  event.preventDefault()
  window.electron.startDrag('drag-and-drop-2.md')
}
```

```js
// main.js
const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const fs = require('node:fs')
const https = require('node:https')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

const iconName = path.join(__dirname, 'iconForDragAndDrop.png')
const icon = fs.createWriteStream(iconName)

// Create a new file to copy - you can also copy existing files.
fs.writeFileSync(path.join(__dirname, 'drag-and-drop-1.md'), '# First file to test drag and drop')
fs.writeFileSync(path.join(__dirname, 'drag-and-drop-2.md'), '# Second file to test drag and drop')

https.get('https://img.icons8.com/ios/452/drag-and-drop.png', (response) => {
  response.pipe(icon)
})

app.whenReady().then(createWindow)

const allowedFiles = new Set(['drag-and-drop-1.md', 'drag-and-drop-2.md'])

ipcMain.on('ondragstart', (event, fileName) => {
  // Ignore anything the renderer sends that is not in the allowlist
  if (!allowedFiles.has(fileName)) return

  event.sender.startDrag({
    file: path.join(__dirname, fileName),
    icon: iconName
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```

## Notes

- Source fiddle: `docs/fiddles/features/drag-and-drop`. Call `webContents.startDrag(item)` in response to the DOM `ondragstart` event, relayed over IPC.
- The official code passes the renderer-supplied value straight to `path.join`. This sample adds an allowlist check in main (`allowedFiles`) so a renderer cannot drag arbitrary paths, and follows the fiddle's `drag-and-drop-1.md` / `drag-and-drop-2.md` renderer.
- The renderer must call `event.preventDefault()` so the browser's own drag does not start.
- The fiddle downloads its drag icon over HTTPS at startup; replace that with a local icon file in real apps.
- Dragging files into the app uses the standard HTML Drag and Drop web API.
