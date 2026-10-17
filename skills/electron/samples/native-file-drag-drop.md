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

// iconForDragAndDrop.png is assumed to be bundled with the app
const iconName = path.join(__dirname, 'iconForDragAndDrop.png')

// Writable location for the files to drag (__dirname is read-only inside app.asar)
const dragDir = () => path.join(app.getPath('userData'), 'drag-and-drop')

app.whenReady().then(() => {
  // Create new files to copy - you can also copy existing files.
  fs.mkdirSync(dragDir(), { recursive: true })
  fs.writeFileSync(path.join(dragDir(), 'drag-and-drop-1.md'), '# First file to test drag and drop')
  fs.writeFileSync(path.join(dragDir(), 'drag-and-drop-2.md'), '# Second file to test drag and drop')
  createWindow()
})

const allowedFiles = new Set(['drag-and-drop-1.md', 'drag-and-drop-2.md'])

ipcMain.on('ondragstart', (event, fileName) => {
  // Ignore anything the renderer sends that is not in the allowlist
  if (!allowedFiles.has(fileName)) return

  event.sender.startDrag({
    file: path.join(dragDir(), fileName),
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
- The official fiddle downloads its drag icon over HTTPS at startup; this sample uses a bundled local icon instead to avoid an unhandled network fetch without error handling.
- The official fiddle writes the drag files next to main.js (`__dirname`); this sample writes them under `app.getPath('userData')` after `app.whenReady()` because `__dirname` is inside the read-only `app.asar` once packaged, and `startDrag` needs a real file on disk.
- Dragging files into the app uses the standard HTML Drag and Drop web API.
