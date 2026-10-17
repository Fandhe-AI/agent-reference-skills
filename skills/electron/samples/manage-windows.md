---
source: https://github.com/electron/electron/tree/v44.8.0/docs/fiddles/windows/manage-windows
---

# Manage Windows (New Window, Bounds Events, Focus Events)

Open additional BrowserWindows from IPC and report bounds and focus changes back to the main window.

New window on request:

```js
const path = require('node:path')
const { pathToFileURL } = require('node:url')

let mainWindow // assigned in createWindow()
const APP_URL = pathToFileURL(path.join(__dirname, 'index.html')).href
const ALLOWED_URLS = new Set(['https://electronjs.org/'])

function clampSize (value, fallback) {
  return Number.isInteger(value) && value >= 200 && value <= 1600 ? value : fallback
}

ipcMain.on('new-window', (event, args = {}) => {
  // Only accept messages from the main frame of the app's own index.html
  if (!mainWindow || event.sender !== mainWindow.webContents ||
      event.senderFrame !== event.sender.mainFrame ||
      event.senderFrame.url !== APP_URL) return

  let target
  try {
    target = new URL(args.url)
  } catch {
    return
  }
  if (target.protocol !== 'https:' || !ALLOWED_URLS.has(target.href)) return

  const win = new BrowserWindow({
    width: clampSize(args.width, 400),
    height: clampSize(args.height, 320)
  })
  win.loadURL(target.href)
})
```

Report size and position changes:

```js
ipcMain.on('create-demo-window', (event) => {
  const win = new BrowserWindow({ width: 400, height: 275 })

  function updateReply () {
    event.sender.send('bounds-changed', {
      size: win.getSize(),
      position: win.getPosition()
    })
  }

  win.on('resize', updateReply)
  win.on('move', updateReply)
  win.loadURL('https://electronjs.org')
})
```

Focus, blur, and close events:

```js
// mainWindow: declared in the first block, assigned inside createWindow()
let demoWindow

function sendToMain (channel) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send(channel)
  }
}

ipcMain.on('show-demo-window', () => {
  if (demoWindow) {
    demoWindow.focus()
    return
  }
  demoWindow = new BrowserWindow({ width: 600, height: 400 })
  demoWindow.loadURL('https://electronjs.org')
  demoWindow.on('close', () => {
    demoWindow = undefined
    sendToMain('window-close')
  })
  demoWindow.on('focus', () => {
    sendToMain('window-focus')
  })
  demoWindow.on('blur', () => {
    sendToMain('window-blur')
  })
})

ipcMain.on('focus-demo-window', () => {
  if (demoWindow) demoWindow.focus()
})
```

## Notes

- Excerpts of the `new-window`, `manage-window-state`, and `window-events` fiddles under `docs/fiddles/windows/manage-windows`. Register these `ipcMain` listeners once at module top level (not inside `createWindow()`), so re-creating the window on macOS `activate` does not add duplicate listeners; `mainWindow` is a module-scope variable assigned in `createWindow()` (as in the `first-app` sample). Unlike the upstream fiddle, which registers them inside `createWindow()`.
- Unlike the upstream fiddle, which passes `url` / `width` / `height` to `BrowserWindow` and `loadURL` without validation, this sample adds a sender check, a URL allowlist, and size validation (do not trust renderer input). The sender check matches the main window's `WebContents`, its main frame, and the exact URL of the app's `index.html`, per the Electron Security checklist on validating the sender of IPC messages.
- The fiddles' main windows also block navigation with `will-navigate` and open the URL externally via `shell.openExternal`.
- Distance: window management here is the Electron `BrowserWindow` API, not WinUI / AppKit window management (windows-winui-ui, apple-appkit).
