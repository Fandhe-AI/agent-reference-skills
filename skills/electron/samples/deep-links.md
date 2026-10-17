---
source: https://www.electronjs.org/docs/latest/tutorial/launch-app-from-url-in-another-app
---

# Deep Links (Default Protocol Handler)

Register the app as the handler for a custom protocol (`electron-fiddle://`) and react to launch URLs on each OS.

```js
const { app, BrowserWindow, shell } = require('electron')

const path = require('node:path')

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('electron-fiddle', process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('electron-fiddle')
}
```

Windows and Linux (`second-instance`):

```js
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
    // the commandLine is array of strings in which last element is deep link url
    dialog.showErrorBox('Welcome Back', `You arrived from: ${commandLine.pop()}`)
  })

  // Create mainWindow, load the rest of the app, etc...
  app.whenReady().then(() => {
    createWindow()
    // Check for deep link on cold start
    if (process.argv.length >= 2) {
      const lastArg = process.argv[process.argv.length - 1]
      if (lastArg.startsWith('electron-fiddle://')) {
        dialog.showErrorBox('Welcome Back', `You arrived from: ${lastArg}`)
      }
    }
  })
}
```

macOS (`open-url`):

```js
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
})

// Handle the protocol. In this case, we choose to show an Error Box.
app.on('open-url', (event, url) => {
  dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`)
})
```

Packaging with Electron Forge:

```json
{
  "config": {
    "forge": {
      "packagerConfig": {
        "protocols": [
          {
            "name": "Electron Fiddle",
            "schemes": ["electron-fiddle"]
          }
        ]
      },
      "makers": [
        {
          "name": "@electron-forge/maker-deb",
          "config": {
            "mimeType": ["x-scheme-handler/electron-fiddle"]
          }
        }
      ]
    }
  }
}
```

## Notes

- The snippets are the tutorial's excerpts of `docs/fiddles/system/protocol-handler/launch-app-from-URL-in-another-app`; they assume `mainWindow`, `createWindow`, and `dialog` are defined as in the full fiddle (import `dialog` from `electron`).
- On macOS and Linux this works only for a packaged app; `Info.plist` / `.desktop` files must declare the protocol (Forge `protocols` / maker `mimeType`).
- On Windows, when running through the default Electron executable (`electron .`) registration must include the app entry path; packaged apps do not need the extra arguments.
- Register the macOS `open-url` listener during initial startup, before waiting for `ready`, or a launch URL may be missed.
- Distance: store/OS-level URL scheme registration is covered by apple-distribution and windows-packaging-publish; `protocol` (the Electron module) is for in-app custom schemes, a different feature.
