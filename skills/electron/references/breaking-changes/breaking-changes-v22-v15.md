---
source: https://www.electronjs.org/docs/latest/breaking-changes#breaking-api-changes-220
---

# Breaking API Changes (22.0 - 15.0)

All breaking changes listed for Electron 22.0 through 15.0, verbatim from the official document.

## Signature / Usage

From "Deprecated: `webContents.incrementCapturerCount(stayHidden, stayAwake)`" (22.0):

```js
const w = new BrowserWindow({ show: false })

// Removed in Electron 23
w.webContents.incrementCapturerCount()
w.capturePage().then((image) => {
  console.log(image.toDataURL())
  w.webContents.decrementCapturerCount()
})

// Replace with
w.capturePage().then((image) => {
  console.log(image.toDataURL())
})
```

## Breaking API Changes (22.0)

### Deprecated: `webContents.incrementCapturerCount(stayHidden, stayAwake)`

`webContents.incrementCapturerCount(stayHidden, stayAwake)` has been deprecated.
It is now automatically handled by `webContents.capturePage` when a page capture completes.

```js
const w = new BrowserWindow({ show: false })

// Removed in Electron 23
w.webContents.incrementCapturerCount()
w.capturePage().then((image) => {
  console.log(image.toDataURL())
  w.webContents.decrementCapturerCount()
})

// Replace with
w.capturePage().then((image) => {
  console.log(image.toDataURL())
})
```

### Deprecated: `webContents.decrementCapturerCount(stayHidden, stayAwake)`

`webContents.decrementCapturerCount(stayHidden, stayAwake)` has been deprecated.
It is now automatically handled by `webContents.capturePage` when a page capture completes.

```js
const w = new BrowserWindow({ show: false })

// Removed in Electron 23
w.webContents.incrementCapturerCount()
w.capturePage().then((image) => {
  console.log(image.toDataURL())
  w.webContents.decrementCapturerCount()
})

// Replace with
w.capturePage().then((image) => {
  console.log(image.toDataURL())
})
```

### Removed: WebContents `new-window` event

The `new-window` event of WebContents has been removed. It is replaced by [`webContents.setWindowOpenHandler()`](https://www.electronjs.org/docs/latest/api/web-contents#contentssetwindowopenhandlerhandler).

```js
// Removed in Electron 22
webContents.on('new-window', (event) => {
  event.preventDefault()
})

// Replace with
webContents.setWindowOpenHandler((details) => {
  return { action: 'deny' }
})
```

### Removed: `<webview>` `new-window` event

The `new-window` event of `<webview>` has been removed. There is no direct replacement.

```js
// Removed in Electron 22
webview.addEventListener('new-window', (event) => {})
```

```js
// Replace with

// main.js
mainWindow.webContents.on('did-attach-webview', (event, wc) => {
  wc.setWindowOpenHandler((details) => {
    mainWindow.webContents.send('webview-new-window', wc.id, details)
    return { action: 'deny' }
  })
})

// preload.js
const { ipcRenderer } = require('electron')
ipcRenderer.on('webview-new-window', (e, webContentsId, details) => {
  console.log('webview-new-window', webContentsId, details)
  document.getElementById('webview').dispatchEvent(new Event('new-window'))
})

// renderer.js
document.getElementById('webview').addEventListener('new-window', () => {
  console.log('got new-window event')
})
```

### Deprecated: BrowserWindow `scroll-touch-*` events

The `scroll-touch-begin`, `scroll-touch-end` and `scroll-touch-edge` events on
BrowserWindow are deprecated. Instead, use the newly available
[`input-event` event](https://www.electronjs.org/docs/latest/api/web-contents#event-input-event) on WebContents.

```js
// Deprecated
win.on('scroll-touch-begin', scrollTouchBegin)
win.on('scroll-touch-edge', scrollTouchEdge)
win.on('scroll-touch-end', scrollTouchEnd)

// Replace with
win.webContents.on('input-event', (_, event) => {
  if (event.type === 'gestureScrollBegin') {
    scrollTouchBegin()
  } else if (event.type === 'gestureScrollUpdate') {
    scrollTouchEdge()
  } else if (event.type === 'gestureScrollEnd') {
    scrollTouchEnd()
  }
})
```

## Breaking API Changes (21.0)

### Behavior Changed: V8 Memory Cage enabled

The V8 memory cage has been enabled, which has implications for native modules
which wrap non-V8 memory with `ArrayBuffer` or `Buffer`. See the
[blog post about the V8 memory cage](https://www.electronjs.org/blog/v8-memory-cage) for
more details.

### API Changed: `webContents.printToPDF()`

`webContents.printToPDF()` has been modified to conform to [`Page.printToPDF`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-printToPDF) in the Chrome DevTools Protocol. This has been changed in order to
address changes upstream that made our previous implementation untenable and rife with bugs.

**Arguments Changed**

- `pageRanges`

**Arguments Removed**

- `printSelectionOnly`
- `marginsType`
- `headerFooter`
- `scaleFactor`

**Arguments Added**

- `headerTemplate`
- `footerTemplate`
- `displayHeaderFooter`
- `margins`
- `scale`
- `preferCSSPageSize`

Adapted (not in the official docs): the official snippet calls `printToPDF` on the `webContents` module; this version uses a `BrowserWindow`'s `webContents` instance.

```js
// Main process
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.webContents
  .printToPDF({
    landscape: true,
    displayHeaderFooter: true,
    printBackground: true,
    scale: 2,
    pageSize: 'Ledger',
    margins: {
      top: 2,
      bottom: 2,
      left: 2,
      right: 2
    },
    pageRanges: '1-5, 8, 11-13',
    headerTemplate: '<h1>Title</h1>',
    footerTemplate: '<div><span class="pageNumber"></span></div>',
    preferCSSPageSize: true
  })
  .then((data) => {
    fs.writeFile(pdfPath, data, (error) => {
      if (error) throw error
      console.log(`Wrote PDF successfully to ${pdfPath}`)
    })
  })
  .catch((error) => {
    console.log(`Failed to write PDF to ${pdfPath}: `, error)
  })
```

## Breaking API Changes (20.0)

### Removed: macOS 10.11 / 10.12 support

macOS 10.11 (El Capitan) and macOS 10.12 (Sierra) are no longer supported by [Chromium](https://chromium-review.googlesource.com/c/chromium/src/+/3646050).

Older versions of Electron will continue to run on these operating systems, but macOS 10.13 (High Sierra)
or later will be required to run Electron v20.0.0 and higher.

### Default Changed: renderers without `nodeIntegration: true` are sandboxed by default

Previously, renderers that specified a preload script defaulted to being
unsandboxed. This meant that by default, preload scripts had access to Node.js.
In Electron 20, this default has changed. Beginning in Electron 20, renderers
will be sandboxed by default, unless `nodeIntegration: true` or `sandbox: false`
is specified.

If your preload scripts do not depend on Node, no action is needed. If your
preload scripts _do_ depend on Node, either refactor them to remove Node usage
from the renderer, or explicitly specify `sandbox: false` for the relevant
renderers.

### Removed: `skipTaskbar` on Linux

On X11, `skipTaskbar` sends a `_NET_WM_STATE_SKIP_TASKBAR` message to the X11
window manager. There is not a direct equivalent for Wayland, and the known
workarounds have unacceptable tradeoffs (e.g. Window.is_skip_taskbar in GNOME
requires unsafe mode), so Electron is unable to support this feature on Linux.

### API Changed: `session.setDevicePermissionHandler(handler)`

The handler invoked when `session.setDevicePermissionHandler(handler)` is used
has a change to its arguments.  This handler no longer is passed a frame
[`WebFrameMain`](https://www.electronjs.org/docs/latest/api/web-frame-main), but instead is passed the `origin`, which
is the origin that is checking for device permission.

## Breaking API Changes (19.0)

### Removed: IA32 Linux binaries

This is a result of Chromium 102.0.4999.0 dropping support for IA32 Linux.
This concludes the [removal of support for IA32 Linux](https://www.electronjs.org/docs/latest/breaking-changes#removed-ia32-linux-support).

## Breaking API Changes (18.0)

### Removed: `nativeWindowOpen`

Prior to Electron 15, `window.open` was by default shimmed to use
`BrowserWindowProxy`. This meant that `window.open('about:blank')` did not work
to open synchronously scriptable child windows, among other incompatibilities.
Since Electron 15, `nativeWindowOpen` has been enabled by default.

See the documentation for [window.open in Electron](https://www.electronjs.org/docs/latest/api/window-open)
for more details.

## Breaking API Changes (17.0)

### Removed: `desktopCapturer.getSources` in the renderer

The `desktopCapturer.getSources` API is now only available in the main process.
This has been changed in order to improve the default security of Electron
apps.

If you need this functionality, it can be replaced as follows:

```js
// Main process
const { ipcMain, desktopCapturer } = require('electron')

ipcMain.handle('DESKTOP_CAPTURER_GET_SOURCES', (event, opts) => desktopCapturer.getSources(opts))
```

```js
// Renderer process
const { ipcRenderer } = require('electron')

const desktopCapturer = {
  getSources: (opts) => ipcRenderer.invoke('DESKTOP_CAPTURER_GET_SOURCES', opts)
}
```

However, you should consider further restricting the information returned to
the renderer; for instance, displaying a source selector to the user and only
returning the selected source.

### Deprecated: `nativeWindowOpen`

Prior to Electron 15, `window.open` was by default shimmed to use
`BrowserWindowProxy`. This meant that `window.open('about:blank')` did not work
to open synchronously scriptable child windows, among other incompatibilities.
Since Electron 15, `nativeWindowOpen` has been enabled by default.

See the documentation for [window.open in Electron](https://www.electronjs.org/docs/latest/api/window-open)
for more details.

## Breaking API Changes (16.0)

### Behavior Changed: `crashReporter` implementation switched to Crashpad on Linux

The underlying implementation of the `crashReporter` API on Linux has changed
from Breakpad to Crashpad, bringing it in line with Windows and Mac. As a
result of this, child processes are now automatically monitored, and calling
`process.crashReporter.start` in Node child processes is no longer needed (and
is not advisable, as it will start a second instance of the Crashpad reporter).

There are also some subtle changes to how annotations will be reported on
Linux, including that long values will no longer be split between annotations
appended with `__1`, `__2` and so on, and instead will be truncated at the
(new, longer) annotation value limit.

### Deprecated: `desktopCapturer.getSources` in the renderer

Usage of the `desktopCapturer.getSources` API in the renderer has been
deprecated and will be removed. This change improves the default security of
Electron apps.

See [here](https://www.electronjs.org/docs/latest/breaking-changes#removed-desktopcapturergetsources-in-the-renderer) for details on
how to replace this API in your app.

## Breaking API Changes (15.0)

### Default Changed: `nativeWindowOpen` defaults to `true`

Prior to Electron 15, `window.open` was by default shimmed to use
`BrowserWindowProxy`. This meant that `window.open('about:blank')` did not work
to open synchronously scriptable child windows, among other incompatibilities.
`nativeWindowOpen` is no longer experimental, and is now the default.

See the documentation for [window.open in Electron](https://www.electronjs.org/docs/latest/api/window-open)
for more details.

### Deprecated: `app.runningUnderRosettaTranslation`

The `app.runningUnderRosettaTranslation` property has been deprecated.
Use `app.runningUnderARM64Translation` instead.

```js
// Deprecated
console.log(app.runningUnderRosettaTranslation)
// Replace with
console.log(app.runningUnderARM64Translation)
```

## Notes

- Affected API areas: `webContents.incrementCapturerCount` / `decrementCapturerCount` (deprecated 22.0, removed 23.0); `new-window` events on WebContents and `<webview>` (removed 22.0; use `setWindowOpenHandler` / `did-attach-webview`); BrowserWindow `scroll-touch-*` events (deprecated 22.0, removed 23.0); V8 memory cage (21.0, native modules); `webContents.printToPDF` options (21.0); renderer sandbox default (20.0); `skipTaskbar` on Linux (removed 20.0); `session.setDevicePermissionHandler` (20.0); `nativeWindowOpen` (default true in 15.0, deprecated 17.0, removed 18.0); `desktopCapturer.getSources` in the renderer (deprecated 16.0, removed 17.0); `crashReporter` on Linux (Crashpad, 16.0); `app.runningUnderRosettaTranslation` (deprecated 15.0, removed 28.0).
- IA32 Linux: the 19.0 entry links to `#removed-ia32-linux-support`, which is the `Removed: IA32 Linux support` entry in the 3.0 section (see [v14-v2](./breaking-changes-v14-v2.md)).
- Adapted (not in the official docs): in the 21.0 `webContents.printToPDF()` example the official snippet calls `printToPDF` on the `webContents` module; this page uses a `BrowserWindow`'s `webContents` instance.
- The `<webview>` entries concern the Electron webview tag; WebView2 in WinUI is covered by windows-winui-controls and webview testing by playwright.

## Related

- [Breaking API Changes (25.0 - 23.0)](./breaking-changes-v25-v23.md)
- [Breaking API Changes (14.0 - 2.0, legacy)](./breaking-changes-v14-v2.md)
