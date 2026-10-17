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
let demoWindow
ipcMain.on('show-demo-window', () => {
  if (demoWindow) {
    demoWindow.focus()
    return
  }
  demoWindow = new BrowserWindow({ width: 600, height: 400 })
  demoWindow.loadURL('https://electronjs.org')
  demoWindow.on('close', () => {
    demoWindow = undefined
    mainWindow.webContents.send('window-close')
  })
  demoWindow.on('focus', () => {
    mainWindow.webContents.send('window-focus')
  })
  demoWindow.on('blur', () => {
    mainWindow.webContents.send('window-blur')
  })
})

ipcMain.on('focus-demo-window', () => {
  if (demoWindow) demoWindow.focus()
})
```

## Notes

- Excerpts of the `new-window`, `manage-window-state`, and `window-events` fiddles under `docs/fiddles/windows/manage-windows`; each sits inside the standard `main.js` (`app.whenReady`, `activate`, `window-all-closed`) and inside `createWindow()` where `mainWindow` is defined, as in the `first-app` sample.
- The fiddles' main windows also block navigation with `will-navigate` and open the URL externally via `shell.openExternal`.
- Distance: window management here is the Electron `BrowserWindow` API, not WinUI / AppKit window management (windows-winui-ui, apple-appkit).
