---
source: https://www.electronjs.org/docs/latest/tutorial/context-menu
---

# Context Menu

Show a native context menu for editable elements by listening to the `context-menu` event of `webContents` and calling `menu.popup()`.

```js
const { app, BrowserWindow, Menu } = require('electron/main')

function createWindow () {
  const win = new BrowserWindow()
  // highlight-start
  const menu = Menu.buildFromTemplate([
    { role: 'copy' },
    { role: 'cut' },
    { role: 'paste' },
    { role: 'selectall' }
  ])
  win.webContents.on('context-menu', (_event, params) => {
    // only show the context menu if the element is editable
    if (params.isEditable) {
      menu.popup()
    }
  })
  // highlight-end
  win.loadFile('index.html')
}

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

Enable macOS Writing Tools / AutoFill / Services items by associating the frame:

```js
const { BrowserWindow, Menu } = require('electron/main')

const menu = Menu.buildFromTemplate([{ role: 'editMenu' }])
const win = new BrowserWindow()
win.webContents.on('context-menu', (_event, params) => {
  // Whether the context is editable.
  if (params.isEditable) {
    menu.popup({
      // highlight-next-line
      frame: params.frame
    })
  }
})
```

## Notes

- Electron shows no context menu by default; you must trigger `menu.popup` yourself.
- Two trigger options: the main-process `context-menu` event (this sample; `params` has `linkURL`, `isEditable`, etc.) or the DOM `contextmenu` event in the renderer relayed over IPC (fiddle `docs/fiddles/menus/context-menu/dom`).
- On macOS, Writing Tools, AutoFill, and Services items are disabled unless the `WebFrameMain` is passed as `frame`.
- Distance: native OS menu from the Electron main process; Web UI context-menu components are in ark-ui / chakra-ui.
