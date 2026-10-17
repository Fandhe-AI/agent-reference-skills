---
source: https://www.electronjs.org/docs/latest/tutorial/offscreen-rendering
---

# Offscreen Rendering

Render a BrowserWindow into bitmaps with the `paint` event and save a frame as PNG.

```js
const { app, BrowserWindow } = require('electron/main')
const fs = require('node:fs')
const path = require('node:path')

app.disableHardwareAcceleration()

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      offscreen: true
    }
  })

  win.loadURL('https://github.com')
  win.webContents.on('paint', (event, dirty, image) => {
    fs.writeFileSync('ex.png', image.toPNG())
  })
  win.webContents.setFrameRate(60)
  console.log(`The screenshot has been successfully saved to ${path.join(process.cwd(), 'ex.png')}`)
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

- Source fiddle: `docs/fiddles/features/offscreen-rendering`.
- `app.disableHardwareAcceleration()` selects the software output device mode (faster frame generation than the GPU shared-memory-bitmap mode, but no GPU features such as WebGL).
- With `webPreferences.offscreen.useSharedTexture` set to `true` frames go to GPU shared textures (advanced, needs a native Node module); the default `false` gives `NativeImage` bitmaps and a maximum frame rate of 240.
- Only the dirty area is passed to `paint`; no frames are generated when the page is idle. An offscreen window is always frameless.
- The sample loads a remote URL and writes `ex.png` into the current directory; change both for real use.
