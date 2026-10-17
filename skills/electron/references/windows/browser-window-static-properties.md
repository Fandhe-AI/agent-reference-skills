---
source: https://www.electronjs.org/docs/latest/api/browser-window#static-methods
---

# BrowserWindow static methods and instance properties

Static methods of the `BrowserWindow` class and properties of instances created with `new BrowserWindow`. Process: Main.

## Signature / Usage

```js
const { BrowserWindow } = require('electron')
// In this example `win` is our instance
const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```

### Static Methods

The `BrowserWindow` class has the following static methods:

#### `BrowserWindow.getAllWindows()`

Returns `BrowserWindow[]` - An array of all opened browser windows.

#### `BrowserWindow.getFocusedWindow()`

Returns `BrowserWindow | null` - The window that is focused in this application, otherwise returns `null`.

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` WebContents

Returns `BrowserWindow | null` - The window that owns the given `webContents` or `null` if the contents are not owned by a window.

#### `BrowserWindow.fromBrowserView(browserView)` _Deprecated_

* `browserView` BrowserView

The `BrowserView` class is deprecated, and replaced by the new `WebContentsView` class.

Returns `BrowserWindow | null` - The window that owns the given `browserView`. If the given view is not attached to any window, returns `null`.

#### `BrowserWindow.fromId(id)`

* `id` Integer

Returns `BrowserWindow | null` - The window with the given `id`.

### Instance Properties

Objects created with `new BrowserWindow` have the following properties:

#### `win.webContents` _Readonly_

A `WebContents` object this window owns. All web page related events and operations will be done via it.

See the `webContents` documentation for its methods and events.

Reading this property throws `Object has been destroyed` once the window has been destroyed; see `win.isDestroyed()`.

#### `win.id` _Readonly_

A `Integer` property representing the unique ID of the window. Each ID is unique among all `BrowserWindow` instances of the entire Electron application.

#### `win.tabbingIdentifier` _macOS_ _Readonly_

A `string` (optional) property that is equal to the `tabbingIdentifier` passed to the `BrowserWindow` constructor or `undefined` if none was set.

#### `win.autoHideMenuBar` _Linux_ _Windows_

A `boolean` property that determines whether the window menu bar should hide itself automatically. Once set, the menu bar will only show when users press the single `Alt` key.

If the menu bar is already visible, setting this property to `true` won't hide it immediately.

#### `win.simpleFullScreen`

A `boolean` property that determines whether the window is in simple (pre-Lion) fullscreen mode.

#### `win.fullScreen`

A `boolean` property that determines whether the window is in fullscreen mode.

#### `win.focusable` _Windows_ _macOS_

A `boolean` property that determines whether the window is focusable.

#### `win.visibleOnAllWorkspaces` _macOS_ _Linux_

A `boolean` property that determines whether the window is visible on all workspaces.

Always returns false on Windows.

#### `win.shadow`

A `boolean` property that determines whether the window has a shadow.

#### `win.menuBarVisible` _Windows_ _Linux_

A `boolean` property that determines whether the menu bar should be visible.

If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### `win.kiosk`

A `boolean` property that determines whether the window is in kiosk mode.

#### `win.documentEdited` _macOS_

A `boolean` property that specifies whether the window's document has been edited.

The icon in title bar will become gray when set to `true`.

#### `win.representedFilename` _macOS_

A `string` property that determines the pathname of the file the window represents, and the icon of the file will show in window's title bar.

#### `win.title`

A `string` property that determines the title of the native window.

The title of the web page can be different from the title of the native window.

#### `win.minimizable` _macOS_ _Windows_

A `boolean` property that determines whether the window can be manually minimized by user.

On Linux the setter is a no-op, although the getter returns `true`.

#### `win.maximizable` _macOS_ _Windows_

A `boolean` property that determines whether the window can be manually maximized by user.

On Linux the setter is a no-op, although the getter returns `true`.

#### `win.fullScreenable`

A `boolean` property that determines whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### `win.resizable`

A `boolean` property that determines whether the window can be manually resized by user.

#### `win.closable` _macOS_ _Windows_

A `boolean` property that determines whether the window can be manually closed by user.

On Linux the setter is a no-op, although the getter returns `true`.

#### `win.movable` _macOS_ _Windows_

A `boolean` property that determines Whether the window can be moved by user.

On Linux the setter is a no-op, although the getter returns `true`.

#### `win.excludedFromShownWindowsMenu` _macOS_

A `boolean` property that determines whether the window is excluded from the application's Windows menu. `false` by default.

```js
const win = new BrowserWindow({ height: 600, width: 600 })

const template = [
  {
    role: 'windowmenu'
  }
]

win.excludedFromShownWindowsMenu = true

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
```

#### `win.accessibleTitle`

A `string` property that defines an alternative title provided only to accessibility tools such as screen readers. This string is not directly visible to users.

#### `win.snapped` _Windows_ _Readonly_

A `boolean` property that indicates whether the window is arranged via Snap (https://support.microsoft.com/en-us/windows/snap-your-windows-885a9b1e-a983-a3b1-16cd-c531795e6241).

## Notes

* `BrowserView` is deprecated; use `WebContentsView` (see [web-contents-view.md](./web-contents-view.md), [browser-view.md](./browser-view.md)).
* Distinct from native window APIs: this is Electron's main-process `BrowserWindow`. For WinUI 3 AppWindow see windows-winui-ui, for NSWindow see apple-appkit.

## Related

* [BrowserWindow events](./browser-window-events.md)
* [BrowserWindow methods: state, bounds, size](./browser-window-methods-state-bounds.md)
* [WebContentsView](./web-contents-view.md)
