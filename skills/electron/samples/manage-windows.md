---
source: https://github.com/electron/electron/tree/v44.8.0/docs/fiddles/windows/manage-windows
---

# Manage Windows (New Window, Bounds Events, Focus Events)

Open additional BrowserWindows from IPC and report bounds and focus changes back to the main window.

New window on request:

```js
ipcMain.on('new-window', (event, { url, width, height }) => {
  const win = new BrowserWindow({ width, height })
  win.loadURL(url)
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
// module scope: assigned inside createWindow()
let mainWindow
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

- Excerpts of the `new-window`, `manage-window-state`, and `window-events` fiddles under `docs/fiddles/windows/manage-windows`. Register these `ipcMain` listeners once at module top level (not inside `createWindow()`), so re-creating the window on macOS `activate` does not add duplicate listeners; `mainWindow` is a module-scope variable assigned in `createWindow()` (as in the `first-app` sample).
- Unlike the upstream fiddle, which registers them inside `createWindow()`.
- The fiddles' main windows also block navigation with `will-navigate` and open the URL externally via `shell.openExternal`.
- Distance: window management here is the Electron `BrowserWindow` API, not WinUI / AppKit window management (windows-winui-ui, apple-appkit).
