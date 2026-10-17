---
source: https://www.electronjs.org/docs/latest/tutorial/notifications
---

# Notifications

Show OS notifications from the main process with the `Notification` module, or from the renderer with the web Notifications API.

Main process:

```js
const { app, BrowserWindow, Notification } = require('electron/main')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

function showNotification () {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

app.whenReady().then(createWindow).then(showNotification)

app.on('window-all-closed', () => {
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

Renderer process:

```js
const NOTIFICATION_TITLE = 'Title'
const NOTIFICATION_BODY = 'Notification from the Renderer process. Click to log to console.'
const CLICK_MESSAGE = 'Notification clicked!'

new window.Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
  .onclick = () => { document.getElementById('output').innerText = CLICK_MESSAGE }
```

## Notes

- Main-process `Notification` objects do not appear until `show()` is called.
- Windows: the app needs a Start Menu shortcut with an AppUserModelID and a ToastActivatorCLSID. In development you may need `app.setAppUserModelId()` yourself (the page suggests `app.setAppUserModelId(process.execPath)` after pinning `electron.exe` to Start).
- macOS: the app must be code-signed or notification events fail (unsigned binaries emit `failed`); notifications are limited to 256 bytes.
- Linux: notifications use `libnotify` (Desktop Notifications Specification).
- Distance: these are Electron's cross-platform wrappers. Native notification stacks are in apple-app-services (UserNotifications / APNs), android-platform-core, and windows-app-sdk (App Notifications).
