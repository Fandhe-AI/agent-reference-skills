---
source: https://www.electronjs.org/docs/latest/tutorial/recent-documents
---

# Recent Documents

Add files to the Windows JumpList / macOS Dock recent documents list and clear it on exit.

```js
const { app, BrowserWindow } = require('electron/main')
const fs = require('node:fs')
const path = require('node:path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

const fileName = 'recently-used.md'
fs.writeFile(fileName, 'Lorem Ipsum', () => {
  app.addRecentDocument(path.join(__dirname, fileName))
})

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  app.clearRecentDocuments()
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

macOS "Open Recent" application menu items:

```json
{
  "submenu":[
    {
      "label":"Open Recent",
      "role":"recentdocuments",
      "submenu":[
        {
          "label":"Clear Recent",
          "role":"clearrecentdocuments"
        }
      ]
    }
  ]
}
```

```js
const { app, Menu } = require('electron')

const template = [
  // Menu template here
]
const menu = Menu.buildFromTemplate(template)

app.whenReady().then(() => {
  Menu.setApplicationMenu(menu)
})
```

## Notes

- Source fiddle: `docs/fiddles/features/recent-documents`. `app.getRecentDocuments()` returns the current list.
- Windows: the app must be registered as a handler of the document's file type, otherwise the file does not show in the JumpList; clicking an entry starts a new instance with the path as a command-line argument.
- macOS: set the application menu after `ready`, or the `recentdocuments` item is disabled. Selecting an item emits the `open-file` event on `app`.
- Distance: the JumpList itself is a Windows shell feature (windows-platform-integration); the Dock is the macOS Dock (apple-appkit).
