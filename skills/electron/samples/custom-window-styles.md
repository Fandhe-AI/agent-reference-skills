---
source: https://www.electronjs.org/docs/latest/tutorial/custom-window-styles
---

# Custom Window Styles and Interactions

Create frameless and transparent windows, define draggable regions, and make a window click-through.

Frameless window:

```js
const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 300,
    height: 200,
    frame: false
  })
  win.loadURL('https://example.com')
}

app.whenReady().then(() => {
  createWindow()
})
```

Transparent, circular-looking window:

```js
const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 100,
    height: 100,
    resizable: false,
    frame: false,
    transparent: true
  })
  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})
```

```css
body {
    margin: 0;
    padding: 0;
    background-color: rgba(0, 0, 0, 0); /* Transparent background */
}
.white-circle {
    width: 100px;
    height: 100px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    app-region: drag;
    user-select: none;
}
```

Click-through with mouse-move forwarding (macOS and Windows):

```js
const { BrowserWindow, ipcMain } = require('electron')

const path = require('node:path')

const win = new BrowserWindow({
  webPreferences: {
    preload: path.join(__dirname, 'preload.js')
  }
})

ipcMain.on('set-ignore-mouse-events', (event, ignore, options) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  win.setIgnoreMouseEvents(ignore, options)
})
```

```js
// preload.js
const { ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('clickThroughElement')
  el.addEventListener('mouseenter', () => {
    ipcRenderer.send('set-ignore-mouse-events', true, { forward: true })
  })
  el.addEventListener('mouseleave', () => {
    ipcRenderer.send('set-ignore-mouse-events', false)
  })
})
```

## Notes

- Source fiddles: `docs/fiddles/features/window-customization/custom-window-styles/{frameless-windows,transparent-windows}`; the click-through and drag-region snippets come from the Custom Window Interactions page.
- The official preload.js snippet omits the `ipcRenderer` import; `const { ipcRenderer } = require('electron')` is added here.
- Transparent windows: no click-through on transparent areas, not resizable, not transparent while DevTools is open; on Windows they cannot be maximized via system menu or title-bar double-click; on macOS the native shadow is not shown.
- On Wayland, frameless windows get GTK shadows by default; set `hasShadow: false` for no decorations.
- Draggable areas ignore all pointer events; mark buttons `app-region: no-drag`, and avoid custom context menus on draggable areas.
- Distance: Electron `BrowserWindow` options, not WinUI / AppKit window APIs (windows-winui-ui, apple-appkit).
