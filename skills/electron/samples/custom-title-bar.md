---
source: https://www.electronjs.org/docs/latest/tutorial/custom-title-bar
---

# Custom Title Bar

Hide the OS title bar, restore native window controls on Windows and Linux, and draw an HTML title bar with a safe area.

```js
// main.js
const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    // remove the default titlebar
    titleBarStyle: 'hidden',
    // expose window controls in Windows/Linux
    ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {})
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'">
    <link href="./styles.css" rel="stylesheet">
    <title>Custom Titlebar App</title>
  </head>
  <body>
	  <!-- mount your title bar at the top of you application's body tag -->
    <div class="titlebar">Cool titlebar</div>
  </body>
</html>
```

```css
/* styles.css */
body {
  margin: 0;
}
.titlebar {
  background: blue;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  app-region: drag;
  
  margin-left: env(titlebar-area-x, 0);
  width:       env(titlebar-area-width, 100%);
  height:      env(titlebar-area-height, 30px);
  box-sizing: border-box;
  border: 1px dashed red;
}
```

Customize the window controls (`titleBarOverlay` as an object):

```js
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({
  titleBarStyle: 'hidden',
  titleBarOverlay: {
    color: '#2f3241',
    symbolColor: '#74b1be',
    height: 60
  }
})
```

macOS traffic lights:

```js
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({
  titleBarStyle: 'hidden',
  trafficLightPosition: { x: 10, y: 10 }
})
```

## Notes

- Source fiddles: `docs/fiddles/features/window-customization/custom-title-bar/*` (safe-area variant shown).
- A hidden title bar leaves the window undraggable until the HTML title bar sets `app-region: drag`; buttons inside it need `app-region: no-drag`.
- `titleBarOverlay` requires `titleBarStyle` other than `default`; `height` must be an integer, `color` / `symbolColor` accept `rgba()`, `hsla()`, `#RRGGBBAA`.
- macOS alternatives from the page: `titleBarStyle: 'customButtonsOnHover'`, `'hiddenInset'`, and `win.setWindowButtonVisibility(false)`.
- Distance: this customizes an Electron `BrowserWindow`; native title-bar APIs are in windows-winui-ui (AppWindow title bar) and apple-appkit (NSWindow).
