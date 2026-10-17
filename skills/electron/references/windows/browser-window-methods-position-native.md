---
source: https://www.electronjs.org/docs/latest/api/browser-window#winsetalwaysontopflag-level-relativelevel
---

# BrowserWindow methods: always-on-top, position, title, native handle

Instance methods of `BrowserWindow` for z-order, position, title, kiosk, native handle and Windows message hooks, macOS document state, and `capturePage`. Process: Main.

## Signature / Usage

```js
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

const toolbarRect = document.getElementById('toolbar').getBoundingClientRect()
win.setSheetOffset(toolbarRect.height)
```

(The snippet above is the verbatim official `win.setSheetOffset` example. `document` does not exist in the main process; in practice, measure the toolbar height in the renderer (preload/renderer) and send it to main over IPC (`ipcRenderer.send` / `ipcMain.on`).)

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` boolean
* `level` string (optional) _macOS_ _Windows_ - Values include `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and ~~`dock`~~ (Deprecated). The default is `floating` when `flag` is true. The `level` is reset to `normal` when the flag is false. Note that from `floating` to `status` included, the window is placed below the Dock on macOS and below the taskbar on Windows. From `pop-up-menu` to a higher it is shown above the Dock on macOS and above the taskbar on Windows. See the macOS docs (window levels) for more details.
* `relativeLevel` Integer (optional) _macOS_ - The number of layers higher to set this window relative to the given `level`. The default is `0`. Note that Apple discourages setting levels higher than 1 above `screen-saver`.

Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.

Not supported on Wayland (Linux).

#### `win.isAlwaysOnTop()`

Returns `boolean` - Whether the window is always on top of other windows.

Not supported on Wayland (Linux).

#### `win.moveAbove(mediaSourceId)`

* `mediaSourceId` string - Window id in the format of DesktopCapturerSource's id. For example "window:1869:0".

Moves window above the source window in the sense of z-order. If the `mediaSourceId` is not of type window or if the window does not exist then this method throws an error.

#### `win.moveTop()`

Moves window to top(z-order) regardless of focus.

Not supported on Wayland (Linux).

#### `win.center()`

Moves window to the center of the screen.

Not supported on Wayland (Linux).

#### `win.setPosition(x, y[, animate])`

* `x` Integer
* `y` Integer
* `animate` boolean (optional) _macOS_

Moves window to `x` and `y`.

Not supported on Wayland (Linux).

#### `win.getPosition()`

Returns `Integer[]` - Contains the window's current position.

On Wayland, this method will return `[0, 0]` as introspecting or programmatically changing the global window coordinates is prohibited.

#### `win.setTitle(title)`

* `title` string

Changes the title of native window to `title`.

#### `win.getTitle()`

Returns `string` - The title of the native window.

The title of the web page can be different from the title of the native window.

#### `win.setSheetOffset(offsetY[, offsetX])` _macOS_

* `offsetY` Float
* `offsetX` Float (optional)

Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar.

#### `win.flashFrame(flag)`

* `flag` boolean

Starts or stops flashing the window to attract user's attention.

#### `win.setSkipTaskbar(skip)` _macOS_ _Windows_

* `skip` boolean

Makes the window not show in the taskbar.

#### `win.setKiosk(flag)`

* `flag` boolean

Enters or leaves kiosk mode.

#### `win.isKiosk()`

Returns `boolean` - Whether the window is in kiosk mode.

#### `win.isTabletMode()` _Windows_

Returns `boolean` - Whether the window is in Windows 10 tablet mode.

Since Windows 10 users can use their PC as tablet (https://support.microsoft.com/en-us/help/17210/windows-10-use-your-pc-like-a-tablet), under this mode apps can choose to optimize their UI for tablets, such as enlarging the titlebar and hiding titlebar buttons.

This API returns whether the window is in tablet mode, and the `resize` event can be used to listen to changes to tablet mode.

#### `win.getMediaSourceId()`

Returns `string` - Window id in the format of DesktopCapturerSource's id. For example "window:1324:0".

More precisely the format is `window:id:other_id` where `id` is `HWND` on Windows, `CGWindowID` (`uint64_t`) on macOS and `Window` (`unsigned long`) on Linux. `other_id` is used to identify web contents (tabs) so within the same top level window.

#### `win.getNativeWindowHandle()`

Returns `Buffer` - The platform-specific handle of the window.

The native type of the handle is `HWND` on Windows, `NSView*` on macOS, and `Window` (`unsigned long`) on Linux.

#### `win.hookWindowMessage(message, callback)` _Windows_

* `message` Integer
* `callback` Function
  * `wParam` Buffer - The `wParam` provided to the WndProc
  * `lParam` Buffer - The `lParam` provided to the WndProc

Hooks a windows message. The `callback` is called when the message is received in the WndProc.

#### `win.isWindowMessageHooked(message)` _Windows_

* `message` Integer

Returns `boolean` - `true` or `false` depending on whether the message is hooked.

#### `win.unhookWindowMessage(message)` _Windows_

* `message` Integer

Unhook the window message.

#### `win.unhookAllWindowMessages()` _Windows_

Unhooks all of the window messages.

#### `win.setRepresentedFilename(filename)` _macOS_

* `filename` string

Sets the pathname of the file the window represents, and the icon of the file will show in window's title bar.

#### `win.getRepresentedFilename()` _macOS_

Returns `string` - The pathname of the file the window represents.

#### `win.setDocumentEdited(edited)` _macOS_

* `edited` boolean

Specifies whether the window's document has been edited, and the icon in title bar will become gray when set to `true`.

#### `win.isDocumentEdited()` _macOS_

Returns `boolean` - Whether the window's document has been edited.

#### `win.focusOnWebView()`

#### `win.blurWebView()`

#### `win.capturePage([rect, opts])`

* `rect` Rectangle (optional) - The bounds to capture
* `opts` Object (optional)
  * `stayHidden` boolean (optional) - Keep the page hidden instead of visible. Default is `false`.
  * `stayAwake` boolean (optional) - Keep the system awake instead of allowing it to sleep. Default is `false`.

Returns `Promise<NativeImage>` - Resolves with a NativeImage

Captures a snapshot of the page within `rect`. Omitting `rect` will capture the whole visible page. If the page is not visible, `rect` may be empty. The page is considered visible when its browser window is hidden and the capturer count is non-zero. If you would like the page to stay hidden, you should ensure that `stayHidden` is set to true.

## Notes

* The official `win.setSheetOffset` example reads `document` in main-process code, where `document` does not exist. Measure the toolbar height in the renderer and send it to main over IPC (`ipcRenderer.send` / `ipcMain.on`).
* `win.flashFrame(bool)` flashes the dock icon continuously on macOS (behavior change recorded in the original docs history; see breaking-changes pages).
* Taskbar-related: `setSkipTaskbar`, `flashFrame`, `hookWindowMessage` operate on the Windows taskbar button / WndProc of an Electron window. For native Windows taskbar, jump list and shell integration outside Electron see windows-platform-integration.
* Distinct from native window APIs: for WinUI 3 AppWindow see windows-winui-ui, for NSWindow see apple-appkit.

## Related

* [BrowserWindow methods: state, bounds, size](./browser-window-methods-state-bounds.md)
* [BrowserWindow methods: loading, menu, progress bar, thumbar](./browser-window-methods-content-taskbar.md)
* [Window options](./window-options.md)
