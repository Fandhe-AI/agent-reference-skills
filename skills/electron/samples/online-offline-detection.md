---
source: https://www.electronjs.org/docs/latest/tutorial/online-offline-events
---

# Online/Offline Event Detection

Show a connection status indicator in the renderer with `navigator.onLine`, or query `net.isOnline()` in the main process.

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
</head>
<body>
    <h1>Connection status: <strong id='status'></strong></h1>
    <script src="renderer.js"></script>
</body>
</html>
```

```js
// renderer.js
const updateOnlineStatus = () => {
  document.getElementById('status').innerHTML = navigator.onLine ? 'online' : 'offline'
}

window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)

updateOnlineStatus()
```

```js
// main.js
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const onlineStatusWindow = new BrowserWindow()

  onlineStatusWindow.loadFile('index.html')
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

Main process check:

```js
const { net } = require('electron')

// Method 1: Using net.isOnline()
const isOnline = net.isOnline()
console.log('Online status:', isOnline)

// Method 2: Using net.online property
console.log('Online status:', net.online)
```

## Notes

- `navigator.onLine` (and `net.isOnline()` / `net.online`) is `false` only when all network requests are guaranteed to fail; `true` does not prove Internet access (e.g. virtual Ethernet adapters that are always connected).
- The `net` module is available only after the app emits `ready`.
- Source fiddle: `docs/fiddles/features/online-detection`.
- Distance: `net` here is the Electron main-process networking module; HTTP server frameworks are in fastify / hono.
