---
source: https://www.electronjs.org/docs/latest/tutorial/progress-bar
---

# Progress Bars (Taskbar / Dock)

Show progress outside the window with `win.setProgressBar`: a Windows taskbar button or the macOS Dock icon.

```js
const { app, BrowserWindow } = require('electron/main')

let progressInterval

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')

  const INCREMENT = 0.03
  const INTERVAL_DELAY = 100 // ms

  let c = 0
  progressInterval = setInterval(() => {
    // update progress bar to next value
    // values between 0 and 1 will show progress, >1 will show indeterminate or stick at 100%
    win.setProgressBar(c)

    // increment or reset progress bar
    if (c < 2) {
      c += INCREMENT
    } else {
      c = (-INCREMENT * 5) // reset to a bit less than 0 to show reset state
    }
  }, INTERVAL_DELAY)
}

app.whenReady().then(createWindow)

// before the app is terminated, clear both timers
app.on('before-quit', () => {
  clearInterval(progressInterval)
})

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

## Notes

- Pass a number between `0` and `1`; a negative value (e.g. `-1`) removes the bar; a value greater than `1` is indeterminate on Windows and clamps to 100% elsewhere.
- Windows: one progress bar per window. macOS: a single progress bar for the application. Linux: not supported.
- Source fiddle: `docs/fiddles/features/progress-bar`.
- Distance: for Windows taskbar-specific features (thumbnail toolbar, overlay icon) see the `windows-taskbar` sample here; native taskbar APIs live in windows-platform-integration.
