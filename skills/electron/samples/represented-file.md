---
source: https://www.electronjs.org/docs/latest/tutorial/represented-file
---

# Representing Files in a BrowserWindow (macOS)

Show a represented file icon and an edited indicator in the macOS title bar.

```js
const { app, BrowserWindow } = require('electron/main')
const os = require('node:os')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.setRepresentedFilename(os.homedir())
  win.setDocumentEdited(true)

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```

## Notes

- macOS only: `win.setRepresentedFilename` shows the file icon in the title bar and a path popup on Command-click / Control-click; `win.setDocumentEdited` marks the document as modified.
- Source fiddle: `docs/fiddles/features/represented-file`.
- Distance: Electron wrappers over NSWindow properties; native equivalents are in apple-appkit.
