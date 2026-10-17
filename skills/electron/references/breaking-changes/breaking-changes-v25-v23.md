---
source: https://www.electronjs.org/docs/latest/breaking-changes#breaking-api-changes-250
---

# Breaking API Changes (25.0 - 23.0)

All breaking changes listed for Electron 25.0, 24.0 and 23.0, verbatim from the official document.

## Signature / Usage

From "Deprecated: `BrowserWindow.setTrafficLightPosition(position)`" (25.0):

```js
// Deprecated in Electron 25
win.setTrafficLightPosition({ x: 10, y: 10 })
win.setTrafficLightPosition({ x: 0, y: 0 })

// Replace with
win.setWindowButtonPosition({ x: 10, y: 10 })
win.setWindowButtonPosition(null)
```

## Breaking API Changes (25.0)

### Deprecated: `protocol.{un,}{register,intercept}{Buffer,String,Stream,File,Http}Protocol` and `protocol.isProtocol{Registered,Intercepted}`

The `protocol.register*Protocol` and `protocol.intercept*Protocol` methods have
been replaced with [`protocol.handle`](https://www.electronjs.org/docs/latest/api/protocol#protocolhandlescheme-handler).

The new method can either register a new protocol or intercept an existing
protocol, and responses can be of any type.

```js
// Deprecated in Electron 25
protocol.registerBufferProtocol('some-protocol', () => {
  callback({ mimeType: 'text/html', data: Buffer.from('<h5>Response</h5>') })
})

// Replace with
protocol.handle('some-protocol', () => {
  return new Response(
    Buffer.from('<h5>Response</h5>'), // Could also be a string or ReadableStream.
    { headers: { 'content-type': 'text/html' } }
  )
})
```

```js
// Deprecated in Electron 25
protocol.registerHttpProtocol('some-protocol', () => {
  callback({ url: 'https://electronjs.org' })
})

// Replace with
protocol.handle('some-protocol', () => {
  return net.fetch('https://electronjs.org')
})
```

```js
// Deprecated in Electron 25
protocol.registerFileProtocol('some-protocol', () => {
  callback({ filePath: '/path/to/my/file' })
})

// Replace with
protocol.handle('some-protocol', () => {
  return net.fetch('file:///path/to/my/file')
})
```

### Deprecated: `BrowserWindow.setTrafficLightPosition(position)`

`BrowserWindow.setTrafficLightPosition(position)` has been deprecated, the
`BrowserWindow.setWindowButtonPosition(position)` API should be used instead
which accepts `null` instead of `{ x: 0, y: 0 }` to reset the position to
system default.

```js
// Deprecated in Electron 25
win.setTrafficLightPosition({ x: 10, y: 10 })
win.setTrafficLightPosition({ x: 0, y: 0 })

// Replace with
win.setWindowButtonPosition({ x: 10, y: 10 })
win.setWindowButtonPosition(null)
```

### Deprecated: `BrowserWindow.getTrafficLightPosition()`

`BrowserWindow.getTrafficLightPosition()` has been deprecated, the
`BrowserWindow.getWindowButtonPosition()` API should be used instead
which returns `null` instead of `{ x: 0, y: 0 }` when there is no custom
position.

```js
// Deprecated in Electron 25
const pos = win.getTrafficLightPosition()
if (pos.x === 0 && pos.y === 0) {
  // No custom position.
}

// Replace with
const ret = win.getWindowButtonPosition()
if (ret === null) {
  // No custom position.
}
```

## Breaking API Changes (24.0)

### API Changed: `nativeImage.createThumbnailFromPath(path, size)`

The `maxSize` parameter has been changed to `size` to reflect that the size passed in will be the size the thumbnail created. Previously, Windows would not scale the image up if it were smaller than `maxSize`, and
macOS would always set the size to `maxSize`. Behavior is now the same across platforms.

Updated Behavior:

```js
// a 128x128 image.
const imagePath = path.join('path', 'to', 'capybara.png')

// Scaling up a smaller image.
const upSize = { width: 256, height: 256 }
nativeImage.createThumbnailFromPath(imagePath, upSize).then((result) => {
  console.log(result.getSize()) // { width: 256, height: 256 }
})

// Scaling down a larger image.
const downSize = { width: 64, height: 64 }
nativeImage.createThumbnailFromPath(imagePath, downSize).then((result) => {
  console.log(result.getSize()) // { width: 64, height: 64 }
})
```

Previous Behavior (on Windows):

```js
// a 128x128 image
const imagePath = path.join('path', 'to', 'capybara.png')
const size = { width: 256, height: 256 }
nativeImage.createThumbnailFromPath(imagePath, size).then((result) => {
  console.log(result.getSize()) // { width: 128, height: 128 }
})
```

## Breaking API Changes (23.0)

### Behavior Changed: Draggable Regions on macOS

The implementation of draggable regions (using the CSS property `-webkit-app-region: drag`) has changed on macOS to bring it in line with Windows and Linux. Previously, when a region with `-webkit-app-region: no-drag` overlapped a region with `-webkit-app-region: drag`, the `no-drag` region would always take precedence on macOS, regardless of CSS layering. That is, if a `drag` region was above a `no-drag` region, it would be ignored. Beginning in Electron 23, a `drag` region on top of a `no-drag` region will correctly cause the region to be draggable.

Additionally, the `customButtonsOnHover` BrowserWindow property previously created a draggable region which ignored the `-webkit-app-region` CSS property. This has now been fixed (see [#37210](https://github.com/electron/electron/issues/37210#issuecomment-1440509592) for discussion).

As a result, if your app uses a frameless window with draggable regions on macOS, the regions which are draggable in your app may change in Electron 23.

### Removed: Windows 7 / 8 / 8.1 support

[Windows 7, Windows 8, and Windows 8.1 are no longer supported](https://www.electronjs.org/blog/windows-7-to-8-1-deprecation-notice). Electron follows the planned Chromium deprecation policy, which will [deprecate Windows 7 support beginning in Chromium 109](https://support.google.com/chrome/thread/185534985/sunsetting-support-for-windows-7-8-8-1-in-early-2023?hl=en).

Older versions of Electron will continue to run on these operating systems, but Windows 10 or later will be required to run Electron v23.0.0 and higher.

### Removed: BrowserWindow `scroll-touch-*` events

The deprecated `scroll-touch-begin`, `scroll-touch-end` and `scroll-touch-edge`
events on BrowserWindow have been removed. Instead, use the newly available
[`input-event` event](https://www.electronjs.org/docs/latest/api/web-contents#event-input-event) on WebContents.

```js
// Removed in Electron 23.0
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

### Removed: `webContents.incrementCapturerCount(stayHidden, stayAwake)`

The `webContents.incrementCapturerCount(stayHidden, stayAwake)` function has been removed.
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

### Removed: `webContents.decrementCapturerCount(stayHidden, stayAwake)`

The `webContents.decrementCapturerCount(stayHidden, stayAwake)` function has been removed.
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

## Notes

- Affected API areas: `protocol.register*Protocol` / `protocol.intercept*Protocol` / `protocol.isProtocolRegistered` / `isProtocolIntercepted` (deprecated in 25.0; use `protocol.handle`); `BrowserWindow.setTrafficLightPosition` / `getTrafficLightPosition` (deprecated in 25.0, removed in 28.0); `nativeImage.createThumbnailFromPath`; draggable regions (`-webkit-app-region`) and `customButtonsOnHover`; Windows 7 / 8 / 8.1 support; BrowserWindow `scroll-touch-*` events; `webContents.incrementCapturerCount` / `decrementCapturerCount`.
- The `protocol.handle` / `net.fetch` entries concern Electron's custom URL schemes; server-side HTTP request handling is covered by fastify and hono.
- Draggable regions and frameless window entries concern Electron `BrowserWindow`; native window APIs are covered by windows-winui-ui and apple-appkit.

## Related

- [Breaking API Changes (27.0, 26.0)](./breaking-changes-v27-v26.md)
- [Breaking API Changes (22.0 - 15.0)](./breaking-changes-v22-v15.md)
