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

Windows advanced notifications with Toast XML (main process; new in the v45.3.2 tutorial, replaces the userland `electron-windows-notifications` recommendation of v44.8.0):

```js
const { Notification } = require('electron')

const xml = `
<toast>
  <visual>
    <binding template="ToastGeneric">
      <text>Notification Title</text>
      <text>Notification body text</text>
    </binding>
  </visual>
  <actions>
    <action content="Confirm" arguments="action=confirm" />
    <action content="Dismiss" arguments="action=dismiss" />
  </actions>
</toast>`

const notification = new Notification({ toastXml: xml })
notification.show()
```

## Notes

- Main-process `Notification` objects do not appear until `show()` is called.
- Windows: the app needs a Start Menu shortcut with an AppUserModelID and a ToastActivatorCLSID. In development you may need `app.setAppUserModelId()` yourself (the page suggests `app.setAppUserModelId(process.execPath)` after pinning `electron.exe` to Start).
- macOS: the app must be code-signed or notification events fail (unsigned binaries emit `failed`); notifications are limited to 256 bytes.
- Windows `toastXml` (v45): the `toastXml` option accepts an XML string conforming to the Microsoft Toast XML Schema and supersedes the other notification options. Call `app.setAppUserModelId()` before showing notifications; local `<image src="..." />` paths must be absolute `file:///` URLs (for example `url.pathToFileURL(imagePath).toString()`); XML-escape dynamic strings (`&amp;`, `&lt;`, `&gt;`, `&quot;`, `&apos;`); a malformed XML string emits `failed` on the `Notification`; clicking an action button emits `action` with the action index (use `activationType="protocol"` on `<action>` for protocol activation). The official snippet above does not call `app.setAppUserModelId()`. Source: https://github.com/electron/electron/blob/v45.3.2/docs/tutorial/notifications.md
- Linux: notifications use `libnotify` (Desktop Notifications Specification).
- Distance: these are Electron's cross-platform wrappers. Native notification stacks are in apple-app-services (UserNotifications / APNs), android-platform-core, and windows-app-sdk (App Notifications).
