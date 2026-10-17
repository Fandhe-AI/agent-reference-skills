---
source: https://www.electronjs.org/docs/latest/breaking-changes#breaking-api-changes-320
---

# Breaking API Changes (32.0, 31.0)

All breaking changes listed for Electron 32.0 and 31.0, verbatim from the official document.

## Breaking API Changes (32.0)

### Removed: `File.path`

The nonstandard `path` property of the Web `File` object was added in an early version of Electron as a convenience method for working with native files when doing everything in the renderer was more common. However, it represents a deviation from the standard and poses a minor security risk as well, so beginning in Electron 32.0 it has been removed in favor of the [`webUtils.getPathForFile`](https://www.electronjs.org/docs/latest/api/web-utils#webutilsgetpathforfilefile) method.

```js
// Before (renderer)

const file = document.querySelector('input[type=file]').files[0]
alert(`Uploaded file path was: ${file.path}`)
```

```js
// After (renderer)

const file = document.querySelector('input[type=file]').files[0]
electron.showFilePath(file)

// (preload)
const { contextBridge, webUtils } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  showFilePath(file) {
    // It's best not to expose the full file path to the web content if
    // possible.
    const path = webUtils.getPathForFile(file)
    alert(`Uploaded file path was: ${path}`)
  }
})
```

### Deprecated: `clearHistory`, `canGoBack`, `goBack`, `canGoForward`, `goForward`, `goToIndex`, `canGoToOffset`, `goToOffset` on `WebContents`

The navigation-related APIs are now deprecated.

These APIs have been moved to the `navigationHistory` property of `WebContents` to provide a more structured and intuitive interface for managing navigation history.

```js
// Deprecated
win.webContents.clearHistory()
win.webContents.canGoBack()
win.webContents.goBack()
win.webContents.canGoForward()
win.webContents.goForward()
win.webContents.goToIndex(index)
win.webContents.canGoToOffset()
win.webContents.goToOffset(index)

// Replace with
win.webContents.navigationHistory.clear()
win.webContents.navigationHistory.canGoBack()
win.webContents.navigationHistory.goBack()
win.webContents.navigationHistory.canGoForward()
win.webContents.navigationHistory.goForward()
win.webContents.navigationHistory.canGoToOffset()
win.webContents.navigationHistory.goToOffset(index)
```

### Behavior changed: Directory `databases` in `userData` will be deleted

If you have a directory called `databases` in the directory returned by
`app.getPath('userData')`, it will be deleted when Electron 32 is first run.
The `databases` directory was used by WebSQL, which was removed in Electron 31.
Chromium now performs a cleanup that deletes this directory. See
[issue #45396](https://github.com/electron/electron/issues/45396).

## Breaking API Changes (31.0)

### Removed: `WebSQL` support

Chromium has removed support for WebSQL upstream, transitioning it to Android only. See
[Chromium's intent to remove discussion](https://groups.google.com/a/chromium.org/g/blink-dev/c/fWYb6evVA-w/m/wGI863zaAAAJ)
for more information.

### Behavior Changed: `nativeImage.toDataURL` will preserve PNG colorspace

PNG decoder implementation has been changed to preserve colorspace data, the
encoded data returned from this function now matches it.

See [crbug.com/332584706](https://issues.chromium.org/issues/332584706) for more information.

### Behavior Changed: `window.flashFrame(bool)` will flash dock icon continuously on macOS

This brings the behavior to parity with Windows and Linux. Prior behavior: The first `flashFrame(true)` bounces the dock icon only once (using the [NSInformationalRequest](https://developer.apple.com/documentation/appkit/nsrequestuserattentiontype/nsinformationalrequest) level) and `flashFrame(false)` does nothing. New behavior: Flash continuously until `flashFrame(false)` is called. This uses the [NSCriticalRequest](https://developer.apple.com/documentation/appkit/nsrequestuserattentiontype/nscriticalrequest) level instead. To explicitly use `NSInformationalRequest` to cause a single dock icon bounce, it is still possible to use [`dock.bounce('informational')`](https://www.electronjs.org/docs/latest/api/dock#dockbouncetype-macos).

## Notes

- Affected API areas: Web `File.path` (removed; use `webUtils.getPathForFile`); `WebContents` navigation methods (deprecated; use `webContents.navigationHistory`); `userData/databases` directory cleanup; WebSQL (removed in 31); `nativeImage.toDataURL`; `win.flashFrame` / `dock.bounce` on macOS.
- The `flashFrame` / `dock.bounce` entry concerns Electron's Dock API; native Dock/AppKit APIs are covered by apple-appkit.

## Related

- [Breaking API Changes (34.0, 33.0)](./breaking-changes-v34-v33.md)
- [Breaking API Changes (30.0, 29.0)](./breaking-changes-v30-v29.md)
