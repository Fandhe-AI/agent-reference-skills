---
source: https://www.electronjs.org/docs/latest/tutorial/application-menu
---

# Application Menu

Set the single top-level application menu with `Menu.setApplicationMenu`, using standard OS menu roles and a per-window override.

```js
const { shell } = require('electron/common')
const { app, Menu } = require('electron/main')

const template = [
  ...(process.platform === 'darwin' ? [{ role: 'appMenu' }] : []),
  { role: 'fileMenu' },
  { role: 'editMenu' },
  { role: 'viewMenu' },
  { role: 'windowMenu' },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
```

Override the menu for one window (Linux / Windows):

```js
const { BrowserWindow, Menu } = require('electron/main')

const win = new BrowserWindow()
const menu = Menu.buildFromTemplate([
  {
    label: 'my custom menu',
    submenu: [{ role: 'copy' }, { role: 'paste' }]
  }
])
win.setMenu(menu)
```

## Notes

- Each top-level item of an application menu must be a submenu. If `Menu.setApplicationMenu` is never called, Electron sets a default menu.
- On macOS the first submenu always has the app name as its label (use the `appMenu` role); the menu lives in the system menu bar. On Windows and Linux it appears at the top of each BaseWindow.
- `win.setMenu` / `win.removeMenu` apply only to Linux and Windows.
- Distance: this is the OS-native menu API in the Electron main process. Web UI menu components belong to ark-ui / chakra-ui; native menus in other stacks are in apple-appkit and windows-winui-controls.
