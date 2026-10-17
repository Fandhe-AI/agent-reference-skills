---
source: https://github.com/electron/electron/tree/v44.8.0/docs/fiddles/media/screenshot
---

# Take a Screenshot of the Screen

Capture the whole screen with `desktopCapturer.getSources` and save it as a PNG.

```js
// main.js
const { BrowserWindow, app, screen, ipcMain, desktopCapturer, shell } = require('electron/main')
const fs = require('node:fs').promises
const os = require('node:os')
const path = require('node:path')

let mainWindow = null

function determineScreenShotSize (devicePixelRatio) {
  const screenSize = screen.getPrimaryDisplay().workAreaSize
  const maxDimension = Math.max(screenSize.width, screenSize.height)
  return {
    width: maxDimension * devicePixelRatio,
    height: maxDimension * devicePixelRatio
  }
}

async function takeScreenshot (devicePixelRatio) {
  const thumbSize = determineScreenShotSize(devicePixelRatio)
  const options = { types: ['screen'], thumbnailSize: thumbSize }

  const sources = await desktopCapturer.getSources(options)
  for (const source of sources) {
    const sourceName = source.name.toLowerCase()
    if (sourceName === 'entire screen' || sourceName === 'screen 1') {
      const screenshotPath = path.join(os.tmpdir(), 'screenshot.png')

      await fs.writeFile(screenshotPath, source.thumbnail.toPNG())
      shell.openExternal(`file://${screenshotPath}`)

      return `Saved screenshot to: ${screenshotPath}`
    }
  }
}

ipcMain.handle('take-screenshot', (event, devicePixelRatio) => takeScreenshot(devicePixelRatio))

function createWindow () {
  const windowOptions = {
    width: 600,
    height: 300,
    title: 'Take a Screenshot',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  }

  mainWindow = new BrowserWindow(windowOptions)
  mainWindow.loadFile('index.html')

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(() => {
  createWindow()
})
```

```js
// preload.js
const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  takeScreenshot: () => ipcRenderer.invoke('take-screenshot', window.devicePixelRatio)
})
```

```js
// renderer.js
const screenshot = document.getElementById('screen-shot')
const screenshotMsg = document.getElementById('screenshot-path')

screenshot.addEventListener('click', async () => {
  screenshotMsg.textContent = 'Gathering screens...'
  screenshotMsg.textContent = await window.electronAPI.takeScreenshot()
})
```

## Notes

- Source fiddle: `docs/fiddles/media/screenshot/take-screenshot`. The `index.html` needs elements with ids `screen-shot` and `screenshot-path`.
- The thumbnail size is scaled by `devicePixelRatio` so the PNG matches physical resolution.
- The fiddle matches the source named `entire screen` or `screen 1` (localized names may differ on non-English systems).
- Screen capture may require OS screen-recording permission (e.g. macOS); the page does not cover it, so check the `desktopCapturer` reference.
