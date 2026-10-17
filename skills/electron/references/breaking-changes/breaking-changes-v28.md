---
source: https://www.electronjs.org/docs/latest/breaking-changes#breaking-api-changes-280
---

# Breaking API Changes (28.0)

All breaking changes listed for Electron 28.0, verbatim from the official document.

## Breaking API Changes (28.0)

### Behavior Changed: `WebContents.backgroundThrottling` set to false affects all `WebContents` in the host `BrowserWindow`

`WebContents.backgroundThrottling` set to false will disable frames throttling
in the `BrowserWindow` for all `WebContents` displayed by it.

### Removed: `BrowserWindow.setTrafficLightPosition(position)`

`BrowserWindow.setTrafficLightPosition(position)` has been removed, the
`BrowserWindow.setWindowButtonPosition(position)` API should be used instead
which accepts `null` instead of `{ x: 0, y: 0 }` to reset the position to
system default.

```js
// Removed in Electron 28
win.setTrafficLightPosition({ x: 10, y: 10 })
win.setTrafficLightPosition({ x: 0, y: 0 })

// Replace with
win.setWindowButtonPosition({ x: 10, y: 10 })
win.setWindowButtonPosition(null)
```

### Removed: `BrowserWindow.getTrafficLightPosition()`

`BrowserWindow.getTrafficLightPosition()` has been removed, the
`BrowserWindow.getWindowButtonPosition()` API should be used instead
which returns `null` instead of `{ x: 0, y: 0 }` when there is no custom
position.

```js
// Removed in Electron 28
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

### Removed: `ipcRenderer.sendTo()`

The `ipcRenderer.sendTo()` API has been removed. It should be replaced by setting up a [`MessageChannel`](https://www.electronjs.org/docs/latest/tutorial/message-ports#setting-up-a-messagechannel-between-two-renderers) between the renderers.

The `senderId` and `senderIsMainFrame` properties of `IpcRendererEvent` have been removed as well.

### Removed: `app.runningUnderRosettaTranslation`

The `app.runningUnderRosettaTranslation` property has been removed.
Use `app.runningUnderARM64Translation` instead.

```js
// Removed
console.log(app.runningUnderRosettaTranslation)
// Replace with
console.log(app.runningUnderARM64Translation)
```

### Deprecated: `renderer-process-crashed` event on `app`

The `renderer-process-crashed` event on `app` has been deprecated.
Use the new `render-process-gone` event instead.

```js
// Deprecated
app.on('renderer-process-crashed', (event, webContents, killed) => {
  /* ... */
})

// Replace with
app.on('render-process-gone', (event, webContents, details) => {
  /* ... */
})
```

### Deprecated: `params.inputFormType` property on `context-menu` on `WebContents`

The `inputFormType` property of the params object in the `context-menu`
event from `WebContents` has been deprecated. Use the new `formControlType`
property instead.

### Deprecated: `crashed` event on `WebContents` and `<webview>`

The `crashed` events on `WebContents` and `<webview>` have been deprecated.
Use the new `render-process-gone` event instead.

```js
// Deprecated
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

### Deprecated: `gpu-process-crashed` event on `app`

The `gpu-process-crashed` event on `app` has been deprecated.
Use the new `child-process-gone` event instead.

```js
// Deprecated
app.on('gpu-process-crashed', (event, killed) => {
  /* ... */
})

// Replace with
app.on('child-process-gone', (event, details) => {
  /* ... */
})
```

## Notes

- Affected API areas: `WebContents.backgroundThrottling`; `BrowserWindow.setTrafficLightPosition` / `getTrafficLightPosition` (removed; use `setWindowButtonPosition` / `getWindowButtonPosition`); `ipcRenderer.sendTo()` (removed; use `MessageChannel`) and `IpcRendererEvent.senderId` / `senderIsMainFrame`; `app.runningUnderRosettaTranslation` (removed; use `app.runningUnderARM64Translation`); crash events (`renderer-process-crashed`, `crashed`, `gpu-process-crashed` deprecated in 28.0 and removed in 29.0); `context-menu` `params.inputFormType` (deprecated here, removed in 30.0).
- Window button position entries concern Electron's `BrowserWindow` on macOS; native window APIs are covered by apple-appkit.

## Related

- [Breaking API Changes (30.0, 29.0)](./breaking-changes-v30-v29.md)
- [Breaking API Changes (27.0, 26.0)](./breaking-changes-v27-v26.md)
