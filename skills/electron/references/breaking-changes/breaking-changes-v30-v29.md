---
source: https://www.electronjs.org/docs/latest/breaking-changes#breaking-api-changes-300
---

# Breaking API Changes (30.0, 29.0)

All breaking changes listed for Electron 30.0 and 29.0, verbatim from the official document.

## Breaking API Changes (30.0)

### Behavior Changed: cross-origin iframes now use Permission Policy to access features

Cross-origin iframes must now specify features available to a given `iframe` via the `allow`
attribute in order to access them.

See [documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#allow) for
more information.

### Removed: The `--disable-color-correct-rendering` switch

This switch was never formally documented but its removal is being noted here regardless. Chromium itself now has better support for color spaces so this flag should not be needed.

### Behavior Changed: `BrowserView.setAutoResize` behavior on macOS

In Electron 30, BrowserView is now a wrapper around the new [WebContentsView](https://www.electronjs.org/docs/latest/api/web-contents-view) API.

Previously, the `setAutoResize` function of the `BrowserView` API was backed by [autoresizing](https://developer.apple.com/documentation/appkit/nsview/1483281-autoresizingmask?language=objc) on macOS, and by a custom algorithm on Windows and Linux.
For simple use cases such as making a BrowserView fill the entire window, the behavior of these two approaches was identical.
However, in more advanced cases, BrowserViews would be autoresized differently on macOS than they would be on other platforms, as the custom resizing algorithm for Windows and Linux did not perfectly match the behavior of macOS's autoresizing API.
The autoresizing behavior is now standardized across all platforms.

If your app uses `BrowserView.setAutoResize` to do anything more complex than making a BrowserView fill the entire window, it's likely you already had custom logic in place to handle this difference in behavior on macOS.
If so, that logic will no longer be needed in Electron 30 as autoresizing behavior is consistent.

### Deprecated: `BrowserView`

The [`BrowserView`](https://www.electronjs.org/docs/latest/api/browser-view) class has been deprecated and
replaced by the new [`WebContentsView`](https://www.electronjs.org/docs/latest/api/web-contents-view) class.

`BrowserView` related methods in [`BrowserWindow`](https://www.electronjs.org/docs/latest/api/browser-window) have
also been deprecated:

```js
BrowserWindow.fromBrowserView(browserView)
win.setBrowserView(browserView)
win.getBrowserView()
win.addBrowserView(browserView)
win.removeBrowserView(browserView)
win.setTopBrowserView(browserView)
win.getBrowserViews()
```

### Removed: `params.inputFormType` property on `context-menu` on `WebContents`

The `inputFormType` property of the params object in the `context-menu`
event from `WebContents` has been removed. Use the new `formControlType`
property instead.

### Removed: `process.getIOCounters()`

Chromium has removed access to this information.

## Breaking API Changes (29.0)

### Behavior Changed: `ipcRenderer` can no longer be sent over the `contextBridge`

Attempting to send the entire `ipcRenderer` module as an object over the `contextBridge` will now result in
an empty object on the receiving side of the bridge. This change was made to remove / mitigate
a security footgun. You should not directly expose ipcRenderer or its methods over the bridge.
Instead, provide a safe wrapper like below:

```js
contextBridge.exposeInMainWorld('app', {
  onEvent: (cb) => ipcRenderer.on('foo', (e, ...args) => cb(args))
})
```

### Removed: `renderer-process-crashed` event on `app`

The `renderer-process-crashed` event on `app` has been removed.
Use the new `render-process-gone` event instead.

```js
// Removed
app.on('renderer-process-crashed', (event, webContents, killed) => {
  /* ... */
})

// Replace with
app.on('render-process-gone', (event, webContents, details) => {
  /* ... */
})
```

### Removed: `crashed` event on `WebContents` and `<webview>`

The `crashed` events on `WebContents` and `<webview>` have been removed.
Use the new `render-process-gone` event instead.

```js
// Removed
win.webContents.on('crashed', (event, killed) => {
  /* ... */
})
webview.addEventListener('crashed', (event) => {
  /* ... */
})

// Replace with
win.webContents.on('render-process-gone', (event, details) => {
  /* ... */
})
webview.addEventListener('render-process-gone', (event) => {
  /* ... */
})
```

### Removed: `gpu-process-crashed` event on `app`

The `gpu-process-crashed` event on `app` has been removed.
Use the new `child-process-gone` event instead.

```js
// Removed
app.on('gpu-process-crashed', (event, killed) => {
  /* ... */
})

// Replace with
app.on('child-process-gone', (event, details) => {
  /* ... */
})
```

## Notes

- Affected API areas: cross-origin iframes (Permission Policy `allow` attribute); `BrowserView` (deprecated in 30.0, replaced by `WebContentsView`) and `BrowserWindow.fromBrowserView` / `setBrowserView` / `getBrowserView` / `addBrowserView` / `removeBrowserView` / `setTopBrowserView` / `getBrowserViews`; `context-menu` `params.inputFormType` (removed, use `formControlType`); `process.getIOCounters()`; `contextBridge` + `ipcRenderer`; `renderer-process-crashed` / `crashed` / `gpu-process-crashed` events (removed in 29.0; see also the deprecations in 28.0).
- `BrowserView` / `WebContentsView` and `<webview>` entries concern Electron's embedded web content views; WebView2 in WinUI is covered by windows-winui-controls and webview testing by playwright.

## Related

- [Breaking API Changes (32.0, 31.0)](./breaking-changes-v32-v31.md)
- [Breaking API Changes (28.0)](./breaking-changes-v28.md)
