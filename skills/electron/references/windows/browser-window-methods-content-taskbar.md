---
source: https://www.electronjs.org/docs/latest/api/browser-window#winloadurlurl-options
---

# BrowserWindow methods: loading, menu, progress bar, thumbar, shadow, icon

Instance methods of `BrowserWindow` for loading content, window menu, taskbar progress / overlay / thumbnail toolbar, shadow, opacity, shape, accent color, icon, menu bar visibility, snapping and workspaces. Process: Main.

## Signature / Usage

```js
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

const url = require('node:url').format({
  protocol: 'file',
  slashes: true,
  pathname: require('node:path').join(__dirname, 'index.html')
})

win.loadURL(url)
```

#### `win.loadURL(url[, options])`

* `url` string
* `options` Object (optional)
  * `httpReferrer` (string | Referrer) (optional) - An HTTP Referrer URL.
  * `userAgent` string (optional) - A user agent originating the request.
  * `extraHeaders` string (optional) - Extra headers separated by "\n"
  * `postData` (UploadRawData | UploadFile)[] (optional)
  * `baseURLForDataURL` string (optional) - Base URL (with trailing path separator) for files to be loaded by the data URL. This is needed only if the specified `url` is a data URL and needs to load other files.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see `did-finish-load`), and rejects if the page fails to load (see `did-fail-load`). A noop rejection handler is already attached, which avoids unhandled rejection errors. If the existing page has a beforeUnload handler, `did-fail-load` will be called unless `will-prevent-unload` is handled.

Same as `webContents.loadURL(url[, options])`.

The `url` can be a remote address (e.g. `http://`) or a path to a local HTML file using the `file://` protocol.

To ensure that file URLs are properly formatted, it is recommended to use Node's `url.format` method (see the snippet at the top).

You can load a URL using a `POST` request with URL-encoded data by doing the following:

```js
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.loadURL('http://localhost:8000/post', {
  postData: [
    {
      type: 'rawData',
      bytes: Buffer.from('hello=world')
    }
  ],
  extraHeaders: 'Content-Type: application/x-www-form-urlencoded'
})
```

#### `win.loadFile(filePath[, options])`

* `filePath` string
* `options` Object (optional)
  * `query` Record\<string, string\> (optional) - Passed to `url.format()`.
  * `search` string (optional) - Passed to `url.format()`.
  * `hash` string (optional) - Passed to `url.format()`.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see `did-finish-load`), and rejects if the page fails to load (see `did-fail-load`).

Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application. See the `webContents` docs for more information.

#### `win.reload()`

Same as `webContents.reload`.

#### `win.setMenu(menu)` _Linux_ _Windows_

* `menu` Menu | null

Sets the `menu` as the window's menu bar.

#### `win.removeMenu()` _Linux_ _Windows_

Remove the window's menu bar.

#### `win.setProgressBar(progress[, options])`

* `progress` Double
* `options` Object (optional)
  * `mode` string _Windows_ - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.

Sets progress value in progress bar. Valid range is [0, 1.0].

Remove progress bar when progress < 0; Change to indeterminate mode when progress > 1.

On Windows, a mode can be passed. Accepted values are `none`, `normal`, `indeterminate`, `error`, and `paused`. If you call `setProgressBar` without a mode set (but with a value within the valid range), `normal` will be assumed.

On Linux, the progress bar shows on docks and taskbars that support the LauncherEntry D-Bus API. It is associated with the app's `.desktop` file, so `app.setDesktopName` must match the name of the app's actual `.desktop` file. Indeterminate mode is not supported.

#### `win.setOverlayIcon(overlay, description)` _Windows_

* `overlay` NativeImage | null - the icon to display on the bottom right corner of the taskbar icon. If this parameter is `null`, the overlay is cleared
* `description` string - a description that will be provided to Accessibility screen readers

Sets a 16 x 16 pixel overlay onto the current taskbar icon, usually used to convey some sort of application status or to passively notify the user.

#### `win.invalidateShadow()` _macOS_

Invalidates the window shadow so that it is recomputed based on the current window shape.

`BrowserWindows` that are transparent can sometimes leave behind visual artifacts on macOS. This method can be used to clear these artifacts when, for example, performing an animation.

#### `win.setHasShadow(hasShadow)`

* `hasShadow` boolean

Sets whether the window should have a shadow.

#### `win.hasShadow()`

Returns `boolean` - Whether the window has a shadow.

#### `win.setOpacity(opacity)`

* `opacity` number - between 0.0 (fully transparent) and 1.0 (fully opaque)

Sets the opacity of the window. Out of bound number values are clamped to the [0, 1] range.

#### `win.getOpacity()`

Returns `number` - between 0.0 (fully transparent) and 1.0 (fully opaque).

#### `win.setShape(rects)` _Windows_ _Linux_ _Experimental_

* `rects` Rectangle[] - Sets a shape on the window. Passing an empty list reverts the window to being rectangular.

Setting a window shape determines the area within the window where the system permits drawing and user interaction. Outside of the given region, no pixels will be drawn and no mouse events will be registered. Mouse events outside of the region will not be received by that window, but will fall through to whatever is behind the window.

#### `win.setThumbarButtons(buttons)` _Windows_

* `buttons` ThumbarButton[]

Returns `boolean` - Whether the buttons were added successfully

Add a thumbnail toolbar with a specified set of buttons to the thumbnail image of a window in a taskbar button layout. Returns a `boolean` object indicates whether the thumbnail has been added successfully.

The number of buttons in thumbnail toolbar should be no greater than 7 due to the limited room. Once you setup the thumbnail toolbar, the toolbar cannot be removed due to the platform's limitation. But you can call the API with an empty array to clean the buttons.

The `buttons` is an array of `Button` objects:

* `Button` Object
  * `icon` NativeImage - The icon showing in thumbnail toolbar.
  * `click` Function
  * `tooltip` string (optional) - The text of the button's tooltip.
  * `flags` string[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

The `flags` is an array that can include following `string`s:

* `enabled` - The button is active and available to the user.
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `dismissonclick` - When the button is clicked, the thumbnail window closes immediately.
* `nobackground` - Do not draw a button border, use only the image.
* `hidden` - The button is not shown to the user.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.

#### `win.setThumbnailClip(region)` _Windows_

* `region` Rectangle - Region of the window

Sets the region of the window to show as the thumbnail image displayed when hovering over the window in the taskbar. You can reset the thumbnail to be the entire window by specifying an empty region: `{ x: 0, y: 0, width: 0, height: 0 }`.

#### `win.setThumbnailToolTip(toolTip)` _Windows_

* `toolTip` string

Sets the toolTip that is displayed when hovering over the window thumbnail in the taskbar.

#### `win.setAppDetails(options)` _Windows_

* `options` Object
  * `appId` string (optional) - Window's App User Model ID (https://learn.microsoft.com/en-us/windows/win32/shell/appids). It has to be set, otherwise the other options will have no effect.
  * `appIconPath` string (optional) - Window's Relaunch Icon (https://learn.microsoft.com/en-us/windows/win32/properties/props-system-appusermodel-relaunchiconresource).
  * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. Default is `0`.
  * `relaunchCommand` string (optional) - Window's Relaunch Command (https://learn.microsoft.com/en-us/windows/win32/properties/props-system-appusermodel-relaunchcommand).
  * `relaunchDisplayName` string (optional) - Window's Relaunch Display Name (https://learn.microsoft.com/en-us/windows/win32/properties/props-system-appusermodel-relaunchdisplaynameresource).

Sets the properties for the window's taskbar button.

`relaunchCommand` and `relaunchDisplayName` must always be set together. If one of those properties is not set, then neither will be used.

#### `win.setAccentColor(accentColor)` _Windows_

* `accentColor` boolean | string | null - The accent color for the window. By default, follows user preference in System Settings. To reset to system default, pass `null`.

Sets the system accent color and highlighting of active window border.

The `accentColor` parameter accepts the following values:

* **Color string** - Like `true`, but sets a custom accent color using standard CSS color formats (Hex, RGB, RGBA, HSL, HSLA, or named colors). Alpha values in RGBA/HSLA formats are ignored and the color is treated as fully opaque.
* **`true`** - Enable accent color highlighting for the window with the system accent color regardless of whether accent colors are enabled for windows in System `Settings.`
* **`false`** - Disable accent color highlighting for the window regardless of whether accent colors are currently enabled for windows in System Settings.
* **`null`** - Reset window accent color behavior to follow behavior set in System Settings.

Examples:

```js
const win = new BrowserWindow({ frame: false })

// Set red accent color.
win.setAccentColor('#ff0000')

// RGB format (alpha ignored if present).
win.setAccentColor('rgba(255,0,0,0.5)')

// Enable accent color, using the color specified in System Settings.
win.setAccentColor(true)

// Disable accent color.
win.setAccentColor(false)

// Reset window accent color behavior to follow behavior set in System Settings.
win.setAccentColor(null)
```

#### `win.getAccentColor()` _Windows_

Returns `string | boolean` - the system accent color and highlighting of active window border in Hex RGB format.

If a color has been set for the window that differs from the system accent color, the window accent color will be returned. Otherwise, a boolean will be returned, with `true` indicating that the window uses the global system accent color, and `false` indicating that accent color highlighting is disabled for this window.

#### `win.showDefinitionForSelection()` _macOS_

Same as `webContents.showDefinitionForSelection()`.

#### `win.setIcon(icon)` _Windows_ _Linux_

* `icon` NativeImage | string

Changes window icon.

#### `win.setWindowButtonVisibility(visible)` _macOS_

* `visible` boolean

Sets whether the window traffic light buttons should be visible.

#### `win.setAutoHideMenuBar(hide)` _Windows_ _Linux_

* `hide` boolean

Sets whether the window menu bar should hide itself automatically. Once set the menu bar will only show when users press the single `Alt` key.

If the menu bar is already visible, calling `setAutoHideMenuBar(true)` won't hide it immediately.

#### `win.isMenuBarAutoHide()` _Windows_ _Linux_

Returns `boolean` - Whether menu bar automatically hides itself.

#### `win.setMenuBarVisibility(visible)` _Windows_ _Linux_

* `visible` boolean

Sets whether the menu bar should be visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### `win.isMenuBarVisible()` _Windows_ _Linux_

Returns `boolean` - Whether the menu bar is visible.

#### `win.isSnapped()` _Windows_

Returns `boolean` - whether the window is arranged via Snap (https://support.microsoft.com/en-us/windows/snap-your-windows-885a9b1e-a983-a3b1-16cd-c531795e6241).

The window is snapped via buttons shown when the mouse is hovered over window maximize button, or by dragging it to the edges of the screen.

#### `win.setVisibleOnAllWorkspaces(visible[, options])` _macOS_ _Linux_

* `visible` boolean
* `options` Object (optional)
  * `visibleOnFullScreen` boolean (optional) _macOS_ - Sets whether the window should be visible above fullscreen windows.
  * `skipTransformProcessType` boolean (optional) _macOS_ - Calling setVisibleOnAllWorkspaces will by default transform the process type between UIElementApplication and ForegroundApplication to ensure the correct behavior. However, this will hide the window and dock for a short time every time it is called. If your window is already of type UIElementApplication, you can bypass this transformation by passing true to skipTransformProcessType.

Sets whether the window should be visible on all workspaces.

This API does nothing on Windows.

#### `win.isVisibleOnAllWorkspaces()` _macOS_ _Linux_

Returns `boolean` - Whether the window is visible on all workspaces.

This API always returns false on Windows.

## Notes

* Taskbar-related (`setProgressBar`, `setOverlayIcon`, `setThumbarButtons`, `setThumbnailClip`, `setThumbnailToolTip`, `setAppDetails`): these configure the taskbar button of an Electron window. For native Windows taskbar, jump list and shell integration outside Electron see windows-platform-integration.
* `win.setMenu` / `win.removeMenu` take an Electron `Menu` (OS-native menu built in the main process); for Web UI menu components see ark-ui / chakra-ui / fandhe-frontend, for WinUI menus see windows-winui-controls, for NSMenu see apple-appkit.

## Related

* [BrowserWindow methods: always-on-top, position, title, native handle](./browser-window-methods-position-native.md)
* [BrowserWindow methods: mouse events, content protection, tabs, vibrancy](./browser-window-methods-advanced.md)
* [Window options](./window-options.md)
