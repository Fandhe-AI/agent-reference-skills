---
source: https://www.electronjs.org/docs/latest/api/browser-window#instance-methods
---

# BrowserWindow methods: visibility, state, bounds, size

Instance methods of `BrowserWindow` covering closing, focus, visibility, maximize/minimize/fullscreen, background color, bounds and size. Process: Main. Some methods are only available on specific operating systems and are labeled as such.

## Signature / Usage

```js
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

// set all bounds properties
win.setBounds({ x: 440, y: 225, width: 800, height: 600 })

// set a single bounds property
win.setBounds({ width: 100 })

// { x: 440, y: 225, width: 100, height: 600 }
console.log(win.getBounds())
```

### Instance Methods

#### `win.destroy()`

Force closing the window, the `unload` and `beforeunload` event won't be emitted for the web page, and `close` event will also not be emitted for this window, but it guarantees the `closed` event will be emitted.

#### `win.close()`

Try to close the window. This has the same effect as a user manually clicking the close button of the window. The web page may cancel the close though. See the `close` event ([browser-window-events.md](./browser-window-events.md)).

#### `win.focus()`

Focuses on the window.

On Wayland (Linux), the desktop environment may show a notification or flash the app icon if the window or app is not already focused.

#### `win.blur()`

Removes focus from the window.

Not supported on Wayland (Linux).

#### `win.isFocused()`

Returns `boolean` - Whether the window is focused.

#### `win.isDestroyed()`

Returns `boolean` - Whether the window is destroyed.

#### `win.show()`

Shows and gives focus to the window.

#### `win.showInactive()`

Shows the window but doesn't focus on it.

Not supported on Wayland (Linux).

#### `win.hide()`

Hides the window.

#### `win.isVisible()`

Returns `boolean` - Whether the window is visible to the user in the foreground of the app.

#### `win.isModal()`

Returns `boolean` - Whether current window is a modal window.

#### `win.maximize()`

Maximizes the window. This will also show (but not focus) the window if it isn't being displayed already.

#### `win.unmaximize()`

Unmaximizes the window.

#### `win.isMaximized()`

Returns `boolean` - Whether the window is maximized.

#### `win.minimize()`

Minimizes the window. On some platforms the minimized window will be shown in the Dock.

#### `win.restore()`

Restores the window from minimized state to its previous state.

#### `win.isMinimized()`

Returns `boolean` - Whether the window is minimized.

#### `win.setFullScreen(flag)`

* `flag` boolean

Sets whether the window should be in fullscreen mode.

On macOS, fullscreen transitions take place asynchronously. If further actions depend on the fullscreen state, use the 'enter-full-screen' or 'leave-full-screen' events.

#### `win.isFullScreen()`

Returns `boolean` - Whether the window is in fullscreen mode.

On macOS, fullscreen transitions take place asynchronously. When querying for a BrowserWindow's fullscreen status, you should ensure that either the 'enter-full-screen' or 'leave-full-screen' events have been emitted.

#### `win.setSimpleFullScreen(flag)` _macOS_

* `flag` boolean

Enters or leaves simple fullscreen mode.

Simple fullscreen mode emulates the native fullscreen behavior found in versions of macOS prior to Lion (10.7).

#### `win.isSimpleFullScreen()` _macOS_

Returns `boolean` - Whether the window is in simple (pre-Lion) fullscreen mode.

#### `win.isNormal()`

Returns `boolean` - Whether the window is in normal state (not maximized, not minimized, not in fullscreen mode).

#### `win.setAspectRatio(aspectRatio[, extraSize])`

* `aspectRatio` Float - The aspect ratio to maintain for some portion of the content view.
* `extraSize` Size (optional) _macOS_ - The extra size not to be included while maintaining the aspect ratio.

This will make a window maintain an aspect ratio. The extra size allows a developer to have space, specified in pixels, not included within the aspect ratio calculations. This API already takes into account the difference between a window's size and its content size.

Consider a normal window with an HD video player and associated controls. Perhaps there are 15 pixels of controls on the left edge, 25 pixels of controls on the right edge and 50 pixels of controls below the player. In order to maintain a 16:9 aspect ratio (standard aspect ratio for HD @1920x1080) within the player itself we would call this function with arguments of 16/9 and { width: 40, height: 50 }. The second argument doesn't care where the extra width and height are within the content view--only that they exist. Sum any extra width and height areas you have within the overall content view.

The aspect ratio is not respected when window is resized programmatically with APIs like `win.setSize`.

To reset an aspect ratio, pass 0 as the `aspectRatio` value: `win.setAspectRatio(0)`.

#### `win.setBackgroundColor(backgroundColor)`

* `backgroundColor` string - Color in Hex, RGB, RGBA, HSL, HSLA or named CSS color format. The alpha channel is optional for the hex type.

Examples of valid `backgroundColor` values:

* Hex
  * #fff (shorthand RGB)
  * #ffff (shorthand ARGB)
  * #ffffff (RGB)
  * #ffffffff (ARGB)
* RGB
  * `rgb\(([\d]+),\s*([\d]+),\s*([\d]+)\)`
    * e.g. rgb(255, 255, 255)
* RGBA
  * `rgba\(([\d]+),\s*([\d]+),\s*([\d]+),\s*([\d.]+)\)`
    * e.g. rgba(255, 255, 255, 1.0)
* HSL
  * `hsl\((-?[\d.]+),\s*([\d.]+)%,\s*([\d.]+)%\)`
    * e.g. hsl(200, 20%, 50%)
* HSLA
  * `hsla\((-?[\d.]+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)`
    * e.g. hsla(200, 20%, 50%, 0.5)
* Color name
  * Options are listed in SkParseColor.cpp (https://source.chromium.org/chromium/chromium/src/+/main:third_party/skia/src/utils/SkParseColor.cpp;l=11-152;drc=eea4bf52cb0d55e2a39c828b017c80a5ee054148)
  * Similar to CSS Color Module Level 3 keywords, but case-sensitive.
    * e.g. `blueviolet` or `red`

Sets the background color of the window. See "Setting the `backgroundColor` property" in [browser-window-overview.md](./browser-window-overview.md).

#### `win.previewFile(path[, displayName])` _macOS_

* `path` string - The absolute path to the file to preview with QuickLook. This is important as Quick Look uses the file name and file extension on the path to determine the content type of the file to open.
* `displayName` string (optional) - The name of the file to display on the Quick Look modal view. This is purely visual and does not affect the content type of the file. Defaults to `path`.

Uses Quick Look to preview a file at a given path.

#### `win.closeFilePreview()` _macOS_

Closes the currently open Quick Look panel.

#### `win.setBounds(bounds[, animate])`

* `bounds` Partial\<Rectangle\>
* `animate` boolean (optional) _macOS_

Resizes and moves the window to the supplied bounds. Any properties that are not supplied will default to their current values.

On Wayland (Linux), has the same limitations as `setSize` and `setPosition`.

On macOS, the y-coordinate value cannot be smaller than the Tray height. The tray height has changed over time and depends on the operating system, but is between 20-40px. Passing a value lower than the tray height will result in a window that is flush to the tray.

#### `win.getBounds()`

Returns `Rectangle` - The `bounds` of the window as `Object`.

On macOS, the y-coordinate value returned will be at minimum the Tray height. For example, calling `win.setBounds({ x: 25, y: 20, width: 800, height: 600 })` with a tray height of 38 means that `win.getBounds()` will return `{ x: 25, y: 38, width: 800, height: 600 }`.

On Wayland, this method will return `{ x: 0, y: 0, ... }` as introspecting or programmatically changing the global window coordinates is prohibited.

#### `win.getBackgroundColor()`

Returns `string` - Gets the background color of the window in Hex (`#RRGGBB`) format.

See "Setting the `backgroundColor` property" in [browser-window-overview.md](./browser-window-overview.md).

The alpha value is _not_ returned alongside the red, green, and blue values.

#### `win.setContentBounds(bounds[, animate])`

* `bounds` Rectangle
* `animate` boolean (optional) _macOS_

Resizes and moves the window's client area (e.g. the web page) to the supplied bounds.

On Wayland (Linux), has the same limitations as `setContentSize` and `setPosition`.

#### `win.getContentBounds()`

Returns `Rectangle` - The `bounds` of the window's client area as `Object`.

#### `win.getNormalBounds()`

Returns `Rectangle` - Contains the window bounds of the normal state

Whatever the current state of the window (maximized, minimized or in fullscreen), this function always returns the position and size of the window in normal state. In normal state, `getBounds` and `getNormalBounds` return the same `Rectangle`.

#### `win.setEnabled(enable)`

* `enable` boolean

Disable or enable the window.

#### `win.isEnabled()`

Returns `boolean` - whether the window is enabled.

#### `win.setSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` boolean (optional) _macOS_

Resizes the window to `width` and `height`. If `width` or `height` are below any set minimum size constraints the window will snap to its minimum size.

On Wayland (Linux), may not work as some window managers restrict programmatic window resizing.

#### `win.getSize()`

Returns `Integer[]` - Contains the window's width and height.

#### `win.setContentSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` boolean (optional) _macOS_

Resizes the window's client area (e.g. the web page) to `width` and `height`.

On Wayland (Linux), may not work as some window managers restrict programmatic window resizing.

#### `win.getContentSize()`

Returns `Integer[]` - Contains the window's client area's width and height.

#### `win.setMinimumSize(width, height)`

* `width` Integer
* `height` Integer

Sets the minimum size of window to `width` and `height`.

#### `win.getMinimumSize()`

Returns `Integer[]` - Contains the window's minimum width and height.

#### `win.setMaximumSize(width, height)`

* `width` Integer
* `height` Integer

Sets the maximum size of window to `width` and `height`.

#### `win.getMaximumSize()`

Returns `Integer[]` - Contains the window's maximum width and height.

#### `win.setResizable(resizable)`

* `resizable` boolean

Sets whether the window can be manually resized by the user.

#### `win.isResizable()`

Returns `boolean` - Whether the window can be manually resized by the user.

#### `win.setMovable(movable)` _macOS_ _Windows_

* `movable` boolean

Sets whether the window can be moved by user. On Linux does nothing.

#### `win.isMovable()` _macOS_ _Windows_

Returns `boolean` - Whether the window can be moved by user.

On Linux always returns `true`.

#### `win.setMinimizable(minimizable)` _macOS_ _Windows_

* `minimizable` boolean

Sets whether the window can be manually minimized by user. On Linux does nothing.

#### `win.isMinimizable()` _macOS_ _Windows_

Returns `boolean` - Whether the window can be manually minimized by the user.

On Linux always returns `true`.

#### `win.setMaximizable(maximizable)` _macOS_ _Windows_

* `maximizable` boolean

Sets whether the window can be manually maximized by user. On Linux does nothing.

#### `win.isMaximizable()` _macOS_ _Windows_

Returns `boolean` - Whether the window can be manually maximized by user.

On Linux always returns `true`.

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` boolean

Sets whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### `win.isFullScreenable()`

Returns `boolean` - Whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### `win.setClosable(closable)` _macOS_ _Windows_

* `closable` boolean

Sets whether the window can be manually closed by user. On Linux does nothing.

#### `win.isClosable()` _macOS_ _Windows_

Returns `boolean` - Whether the window can be manually closed by user.

On Linux always returns `true`.

#### `win.setHiddenInMissionControl(hidden)` _macOS_

* `hidden` boolean

Sets whether the window will be hidden when the user toggles into mission control.

#### `win.isHiddenInMissionControl()` _macOS_

Returns `boolean` - Whether the window will be hidden when the user toggles into mission control.

## Notes

* Distinct from native window APIs: this is Electron's main-process `BrowserWindow`. For WinUI 3 AppWindow see windows-winui-ui, for NSWindow see apple-appkit.

## Related

* [BrowserWindow static methods and instance properties](./browser-window-static-properties.md)
* [BrowserWindow methods: always-on-top, position, title, native handle](./browser-window-methods-position-native.md)
* [BaseWindow properties and methods](./base-window-properties-methods.md)
