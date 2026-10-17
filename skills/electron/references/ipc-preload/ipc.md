---
source: https://www.electronjs.org/docs/latest/tutorial/ipc
---

# Inter-Process Communication guide

Processes communicate by passing messages through developer-defined "channels" with the `ipcMain` and `ipcRenderer` modules. Channels are **arbitrary** (any name) and **bidirectional** (the same channel name can be used on both modules). Because the main and renderer processes have different responsibilities, IPC is the only way to perform many common tasks, such as calling a native API from the UI or triggering changes in web contents from native menus.

## Signature / Usage

Pattern 1: renderer to main (one-way) with `ipcRenderer.send` / `ipcMain.on`.

```js
// main.js (Main Process)
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

function handleSetTitle(event, title) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
}

function createWindow() {
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
})
```

```js
// preload.js (Preload Script)
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title)
})
```

```js
// renderer.js (Renderer Process)
const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
  const title = titleInput.value
  window.electronAPI.setTitle(title)
})
```

## Pattern 2: Renderer to main (two-way)

Use `ipcRenderer.invoke` paired with `ipcMain.handle` to call a main process module and wait for a result. The return value is returned as a Promise to the original `invoke` call.

```js
// main.js (Main Process)
async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({})
  if (!canceled) {
    return filePaths[0]
  }
}

app.whenReady().then(() => {
  ipcMain.handle('dialog:openFile', handleFileOpen)
  createWindow()
})
```

```js
// preload.js (Preload Script)
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile')
})
```

```js
// renderer.js (Renderer Process)
const btn = document.getElementById('btn')
const filePathElement = document.getElementById('filePath')

btn.addEventListener('click', async () => {
  const filePath = await window.electronAPI.openFile()
  filePathElement.innerText = filePath
})
```

- The `dialog:` prefix on the channel name has no effect on the code; it is only a namespace for readability.
- Errors thrown through `handle` in the main process are serialized and only the `message` property of the original error is provided to the renderer (electron/electron#24427).

### Legacy two-way approaches

`ipcRenderer.invoke` was added in Electron 7. The following are documented for historical purposes; use `invoke` whenever possible.

`ipcRenderer.send` + `event.reply` (the recommended async two-way approach before Electron 7):

```js
// preload.js
const { ipcRenderer } = require('electron')

ipcRenderer.on('asynchronous-reply', (_event, arg) => {
  console.log(arg) // prints "pong" in the DevTools console
})
ipcRenderer.send('asynchronous-message', 'ping')
```

```js
// main.js
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping" in the Node console
  event.reply('asynchronous-reply', 'pong')
})
```

Downsides: a second `ipcRenderer.on` listener is needed for the response, and there is no obvious way to pair the reply to the original message.

`ipcRenderer.sendSync` + `event.returnValue`:

```js
// main.js
ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping" in the Node console
  event.returnValue = 'pong'
})
```

```js
// preload.js
const result = ipcRenderer.sendSync('synchronous-message', 'ping')
console.log(result) // prints "pong" in the DevTools console
```

The docs recommend **avoiding** `sendSync` for performance reasons: it blocks the renderer process until a reply is received.

## Pattern 3: Main to renderer

Messages must be sent to a renderer through its `WebContents` instance, whose `send` method works like `ipcRenderer.send`.

```js
// main.js (Main Process)
const menu = Menu.buildFromTemplate([
  {
    label: app.name,
    submenu: [
      {
        click: () => mainWindow.webContents.send('update-counter', 1),
        label: 'Increment'
      },
      {
        click: () => mainWindow.webContents.send('update-counter', -1),
        label: 'Decrement'
      }
    ]
  }
])
Menu.setApplicationMenu(menu)
```

```js
// preload.js (Preload Script)
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (_event, value) => callback(value))
})
```

```js
// renderer.js (Renderer Process)
const counter = document.getElementById('counter')

window.electronAPI.onUpdateCounter((value) => {
  const oldValue = Number(counter.innerText)
  const newValue = oldValue + value
  counter.innerText = newValue.toString()
})
```

- Do not pass the callback straight to `ipcRenderer.on`: that leaks `ipcRenderer` via `event.sender`. Use a custom handler that invokes the callback only with the desired arguments.
- In a minimal example, `ipcRenderer.on` can be called directly in the preload script instead of exposing it over the context bridge, at the cost of flexibility (the listener cannot directly interact with renderer code).
- There is no `invoke` equivalent for main-to-renderer IPC. To reply, send a message back from inside the `ipcRenderer.on` callback (e.g. `ipcRenderer.send('counter-value', value)` handled by `ipcMain.on('counter-value', ...)` in main).

## Pattern 4: Renderer to renderer

There is no direct way to send messages between renderer processes with `ipcMain` and `ipcRenderer`. Two options:

- Use the main process as a message broker (renderer -> main -> other renderer).
- Pass a `MessagePort` from the main process to both renderers for direct communication after setup (see [message-ports](./message-ports.md)).

## Object serialization

IPC uses the HTML standard Structured Clone Algorithm, so only certain types can be passed. Not serializable: DOM objects (e.g. `Element`, `Location`, `DOMMatrix`), Node.js objects backed by C++ classes (e.g. `process.env`, some members of `Stream`), and Electron objects backed by C++ classes (e.g. `WebContents`, `BrowserWindow`, `WebFrame`).

## Notes

- Do not expose the whole `ipcRenderer.send` / `invoke` / `on` API through `contextBridge` for security reasons; expose one narrow function per channel.
- Always load the matching `index.html` and `preload.js` entry points when following the examples.
- The original guide also embeds Electron Fiddle projects `docs/fiddles/ipc/pattern-1`, `pattern-2`, `pattern-3` (see the official page).
- `Menu` / `dialog` appear here only as main-process native APIs used to trigger or serve IPC. For Web UI menu or dialog components, see ark-ui / chakra-ui / fandhe-frontend; for native OS UI frameworks see apple-appkit / windows-winui-controls.

## Related

- [ipcMain](./ipc-main.md)
- [ipcRenderer](./ipc-renderer.md)
- [contextBridge](./context-bridge.md)
- [Context Isolation](./context-isolation.md)
- [MessagePorts in Electron](./message-ports.md)
- [IPC event structures](./ipc-event-structures.md)
