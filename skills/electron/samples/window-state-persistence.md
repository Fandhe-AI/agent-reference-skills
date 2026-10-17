---
source: https://www.electronjs.org/docs/latest/tutorial/window-state-persistence
---

# Window State Persistence

Save and restore a window's bounds and display mode across restarts with the `windowStatePersistence` option.

```js
const { app, BrowserWindow } = require('electron')

function createWindow() {
  const win = new BrowserWindow({
    name: 'main-window',
    width: 800,
    height: 600,
    windowStatePersistence: true
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)
```

Selective persistence:

```js
const { app, BrowserWindow } = require('electron')

function createWindow() {
  const win = new BrowserWindow({
    name: 'main-window',
    width: 800,
    height: 600,
    windowStatePersistence: {
      bounds: true, // Save position and size (default: true)
      displayMode: false // Don't save maximized/fullscreen/kiosk state (default: true)
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)
```

Clearing saved state:

```js
const { BrowserWindow } = require('electron')

// Clear saved state for a specific window
BrowserWindow.clearPersistedState('main-window')

// Now when you create a window with this name,
// it will use the default constructor options
const win = new BrowserWindow({
  name: 'main-window',
  width: 800,
  height: 600,
  windowStatePersistence: true
})
```

## Notes

- A unique `name` in the constructor options is required; it is the key for the stored state.
- Electron restores state at creation (adapting to multi-monitor changes), saves on every change, and emits `persisted-state-restored` after a successful restore.
- Available on both `BaseWindow` and `BrowserWindow`.
- Distance: this is built into Electron windows; no external package is needed.
