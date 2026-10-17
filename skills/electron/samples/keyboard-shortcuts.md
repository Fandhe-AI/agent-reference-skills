---
source: https://www.electronjs.org/docs/latest/tutorial/keyboard-shortcuts
---

# Keyboard Shortcuts

Define local shortcuts with menu accelerators, global shortcuts with `globalShortcut`, and intercept keys in the main process.

Local (menu accelerator):

```js
const { dialog, Menu, MenuItem } = require('electron/main')

const menu = new Menu()

// The first submenu needs to be the app menu on macOS
if (process.platform === 'darwin') {
  const appMenu = new MenuItem({ role: 'appMenu' })
  menu.append(appMenu)
}

// highlight-start
const submenu = Menu.buildFromTemplate([
  {
    label: 'Open a Dialog',
    click: () => dialog.showMessageBox({ message: 'Hello World!' }),
    accelerator: 'CommandOrControl+Alt+R'
  }
])
menu.append(new MenuItem({ label: 'Custom Menu', submenu }))
// highlight-end

Menu.setApplicationMenu(menu)
```

Global (works when the app is not focused):

```js
const { app, dialog, globalShortcut } = require('electron/main')

app.whenReady().then(() => {
  globalShortcut.register('CommandOrControl+Alt+R', () => {
    dialog.showMessageBox({ message: 'Hello World!' })
  })
})

app.on('will-quit', () => {
  globalShortcut.unregister('CommandOrControl+Alt+R')
})
```

Intercept from the main process before the renderer sees the event:

```js
const { app, BrowserWindow } = require('electron/main')

app.whenReady().then(() => {
  const win = new BrowserWindow()

  win.loadFile('index.html')
  win.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.key.toLowerCase() === 'i') {
      console.log('Pressed Control+I')
      event.preventDefault()
    }
  })
})
```

## Notes

- Accelerators are case-insensitive strings of modifiers and one key joined with `+`. Prefer `CommandOrControl` over `Command`, and `Alt` over `Option`, for cross-platform code.
- Accelerators on menu items keep working when the item is hidden (macOS: set `acceleratorWorksWhenHidden: false` to disable); on Windows/Linux `registerAccelerator: false` shows but disables it.
- The official global snippets are excerpts; `globalShortcut.register` must be called after the app is ready, so this sample wraps it in `app.whenReady()` and unregisters in `will-quit`.
- On macOS, `globalShortcut` has a long-standing bug with non-QWERTY keyboard layouts (electron/electron#19747). Unregister globals on `will-quit` with `globalShortcut.unregisterAll()` as the `docs/fiddles/menus/shortcuts` fiddle does.
- Renderer-side shortcuts use the DOM `keyup` / `keydown` events (fiddle `docs/fiddles/features/keyboard-shortcuts/web-apis`).
- Distance: `dialog` / `Menu` here are Electron main-process native APIs, not Web UI components (ark-ui / chakra-ui).
