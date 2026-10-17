---
source: https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app
---

# First Electron App

Minimal app: load a local HTML page into a BrowserWindow and handle the window lifecycle on each OS.

```json
{
  "name": "my-electron-app",
  "version": "1.0.0",
  "description": "Hello World!",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Jane Doe",
  "license": "MIT",
  "devDependencies": {
    "electron": "23.1.3"
  }
}
```

```js
// main.js
const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

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
    <h1>Hello World!</h1>
    <p>
        We are using Node.js <span id="node-version"></span>,
        Chromium <span id="chrome-version"></span>,
        and Electron <span id="electron-version"></span>.
    </p>
</body>
</html>
```

```js
// preload.js
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
```

```sh
npm install electron --save-dev
npm run start
```

## Notes

- The code is the `docs/fiddles/quick-start` fiddle (also referenced by `tutorial-first-app`). The `package.json` is the tutorial's example; the pinned `electron` version in it is the tutorial's, not the current release.
- BrowserWindows can only be created after the app `ready` event; use `app.whenReady()` rather than `app.on('ready')`.
- Electron must be a `devDependencies` entry; the packaging step bundles the binary.
- Yarn Berry and pnpm need `nodeLinker: node-modules` / `nodeLinker: hoisted` so `node_modules` is physically on disk for packaging.
- Distance: `BrowserWindow` here is an Electron main-process class creating a native window; it is unrelated to `windows-winui-ui` (AppWindow) and `apple-appkit` (NSWindow).
