---
source: https://www.electronjs.org/docs/latest/api/web-contents#instance-properties
---

# WebContents instance properties

Instance properties of `WebContents` (Process: Main): `ipc`, audio/caret/zoom state, `id`, `session`, `navigationHistory`, `debugger`, frames and more.

## Signature / Usage

```js
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })
win.webContents.audioMuted = true
console.log(win.webContents.id, win.webContents.mainFrame.url)
```

## Instance Properties

### `contents.ipc` _Readonly_

An `IpcMain` scoped to just IPC messages sent from this WebContents.

IPC messages sent with `ipcRenderer.send`, `ipcRenderer.sendSync` or `ipcRenderer.postMessage` will be delivered in the following order:

1. `contents.on('ipc-message')`
2. `contents.mainFrame.ipc.on(channel)`
3. `contents.ipc.on(channel)`
4. `ipcMain.on(channel)`

Handlers registered with `invoke` will be checked in the following order. The first one that is defined will be called, the rest will be ignored.

1. `contents.mainFrame.ipc.handle(channel)`
2. `contents.ipc.handle(channel)`
3. `ipcMain.handle(channel)`

A handler or event listener registered on the WebContents will receive IPC messages sent from any frame, including child frames. In most cases, only the main frame can send IPC messages. However, if the `nodeIntegrationInSubFrames` option is enabled, it is possible for child frames to send IPC messages also. In that case, handlers should check the `senderFrame` property of the IPC event to ensure that the message is coming from the expected frame. Alternatively, register handlers on the appropriate frame directly using the `WebFrameMain.ipc` interface.

| Property | Type | Description |
| --- | --- | --- |
| `contents.audioMuted` | boolean | Determines whether this page is muted. |
| `contents.caretBrowsingEnabled` | boolean | Determines whether caret browsing is enabled for this page. |
| `contents.userAgent` | string | Determines the user agent for this web page. |
| `contents.zoomLevel` | number | Determines the zoom level for this web contents. |
| `contents.zoomFactor` | number | Determines the zoom factor for this web contents. |
| `contents.zoomMode` | string | Determines the zoom mode for this web contents. |
| `contents.frameRate` | Integer | Sets the frame rate of the web contents. Only values between 1 and 240 are accepted. Only applicable if offscreen rendering is enabled. |
| `contents.id` _Readonly_ | Integer | Unique ID of this WebContents. Each ID is unique among all `WebContents` instances of the entire Electron application. |
| `contents.session` _Readonly_ | Session | A `Session` used by this webContents. |
| `contents.navigationHistory` _Readonly_ | NavigationHistory | A `NavigationHistory` used by this webContents. |
| `contents.hostWebContents` _Readonly_ | WebContents \| null | A `WebContents` instance that might own this `WebContents`. |
| `contents.devToolsWebContents` _Readonly_ | WebContents \| null | The DevTools `WebContents` associated with a given `WebContents`. |
| `contents.debugger` _Readonly_ | Debugger | A `Debugger` instance for this webContents. |
| `contents.backgroundThrottling` | boolean | Whether this WebContents will throttle animations and timers when the page becomes backgrounded. This also affects the Page Visibility API. |
| `contents.mainFrame` _Readonly_ | WebFrameMain | The top frame of the page's frame hierarchy. |
| `contents.opener` _Readonly_ | WebFrameMain \| null | The frame that opened this WebContents, either with open(), or by navigating a link with a target attribute. |
| `contents.focusedFrame` _Readonly_ | WebFrameMain \| null | The currently focused frame in this WebContents. Can be the top frame, an inner `<iframe>`, or `null` if nothing is focused. |

## Notes

* The upstream v44.8.0 docs list these as `contents.mainFrame.on/handle(channel)` and `contents.handle(channel)`; the registration APIs are on the `ipc` property (`contents.ipc`, `WebFrameMain.ipc`).
* `contents.caretBrowsingEnabled`: when enabled, a movable cursor is placed in the page's text, allowing the user to navigate and select content with the keyboard. Changes apply to the live page without reloading it. A `<webview>` guest inherits this value from its embedder when it is created and then tracks it independently, so disabling caret browsing on the embedder leaves an existing guest enabled. While any `WebContents` in the process has caret browsing enabled, assistive technology is notified process-wide that caret browsing is active, so that screen readers report the caret's position as it moves. That notification is only withdrawn once every `WebContents` that enabled caret browsing has either disabled it or been destroyed.
* `contents.zoomLevel`: the original size is 0 and each increment above or below represents zooming 20% larger or smaller to default limits of 300% and 50% of original size, respectively. The formula is `scale := 1.2 ^ level`. `contents.zoomFactor` is the zoom percent divided by 100, so 300% = 3.0. See `contents.setZoomMode` for the available `zoomMode` values.
* `contents.zoomLevel` limits: in v44.8.0, `webContents.setZoomLevel` / `setZoomFactor` clamp to the range Chromium can display (25% to 500%, about -7.6 to 8.8; factor 0.25 to 5.0). The "default limits of 300% and 50%" wording above is older text left in the upstream docs; see [Methods: scripting, zoom](./web-contents-methods-scripting-zoom.md).
* `contents.devToolsWebContents`: users should never store this object because it may become `null` when the DevTools has been closed.
* `contents.backgroundThrottling`: behavior changed — `WebContents.backgroundThrottling` set to false affects all `WebContents` in the host `BrowserWindow`.

## Related

* [Methods: scripting, zoom](./web-contents-methods-scripting-zoom.md)
* [NavigationHistory](./navigation-history.md)
* [Debugger](./debugger.md)
* [webFrameMain](./web-frame-main.md)
