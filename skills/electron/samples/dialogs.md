---
source: https://github.com/electron/electron/tree/v44.8.0/docs/fiddles/native-ui/dialogs
---

# Native Dialogs (Open, Save, Message, Error)

Open native file, save, message, and error dialogs from main-process IPC handlers.

```js
// open-file-or-directory: main.js (excerpt)
ipcMain.handle('open-file-dialog', async () => {
  const options = {
    properties: ['openFile', 'openDirectory']
  }
  return (await dialog.showOpenDialog(options)).filePaths
})
```

```js
// save-dialog: main.js (excerpt)
ipcMain.handle('save-dialog', async () => {
  const options = {
    title: 'Save an Image',
    filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }]
  }
  return (await dialog.showSaveDialog(options)).filePath
})
```

```js
// information-dialog: main.js (excerpt)
ipcMain.handle('open-information-dialog', async () => {
  const options = {
    type: 'info',
    title: 'Information',
    message: "This is an information dialog. Isn't it nice?",
    buttons: ['Yes', 'No']
  }
  return (await dialog.showMessageBox(options)).response
})
```

```js
// error-dialog: main.js (excerpt)
ipcMain.on('open-error-dialog', () => {
  dialog.showErrorBox('An Error Message', 'Demonstrating an error message.')
})
```

## Notes

- Each excerpt sits in a `main.js` that imports `const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron/main')` and loads a window with a preload script; the fiddles' preload scripts bridge each channel with `ipcRenderer.invoke` / `send` (see the `ipc-invoke-handle` sample for the pattern).
- `showOpenDialog`, `showSaveDialog`, and `showMessageBox` return Promises in these fiddles; the `error-dialog` fiddle's main file still contains older callback-style `showMessageBox` / `showOpenDialog` calls, which are not reproduced here.
- Distance: `dialog` is Electron's main-process API for OS-native dialogs; Web UI dialog components are in ark-ui / chakra-ui, native dialog APIs in apple-appkit and windows-winui-controls.
