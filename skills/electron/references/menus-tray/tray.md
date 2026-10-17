---
source: https://www.electronjs.org/docs/latest/api/tray
---

# Tray

Add icons and context menus to the system's notification area. Process: Main. `Tray` is an EventEmitter.

## Signature / Usage

```js
const { app, Menu, Tray } = require('electron')

let tray = null
app.whenReady().then(() => {
  tray = new Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
})
```

## Options / Props

`new Tray(image, [guid])`:

| Name | Type | Description |
| --- | --- | --- |
| image | NativeImage \| string | Icon of the tray. |
| guid | string (optional) _Windows_ _macOS_ | A unique string used to identify the tray icon. Must adhere to UUID format. |

Instance events:

| Event | Platform | Arguments | Description |
| --- | --- | --- | --- |
| `click` | | `event` KeyboardEvent, `bounds` Rectangle, `position` Point | Emitted when the tray icon is clicked. On Linux emitted when the tray icon receives an activation, which might not necessarily be left mouse click. |
| `right-click` | macOS, Windows | `event`, `bounds` | Emitted when the tray icon is right clicked. |
| `double-click` | macOS, Windows | `event`, `bounds` | Emitted when the tray icon is double clicked. |
| `middle-click` | Windows | `event`, `bounds` | Emitted when the tray icon is middle clicked. |
| `balloon-show` | Windows | | Emitted when the tray balloon shows. |
| `balloon-click` | Windows | | Emitted when the tray balloon is clicked. |
| `balloon-closed` | Windows | | Emitted when the tray balloon is closed because of timeout or user manually closes it. |
| `drop` | macOS | | Emitted when any dragged items are dropped on the tray icon. |
| `drop-files` | macOS | `event`, `files` string[] | Emitted when dragged files are dropped in the tray icon. |
| `drop-text` | macOS | `event`, `text` string | Emitted when dragged text is dropped in the tray icon. |
| `drag-enter` | macOS | | Emitted when a drag operation enters the tray icon. |
| `drag-leave` | macOS | | Emitted when a drag operation exits the tray icon. |
| `drag-end` | macOS | | Emitted when a drag operation ends on the tray or ends at another location. |
| `mouse-up` | macOS | `event`, `position` Point | Emitted when the mouse is released from clicking the tray icon. Not emitted if a context menu is set with `tray.setContextMenu`, as a result of macOS-level constraints. |
| `mouse-down` | macOS | `event`, `position` | Emitted when the mouse clicks the tray icon. |
| `mouse-enter` | macOS, Windows | `event`, `position` | Emitted when the mouse enters the tray icon. |
| `mouse-leave` | macOS, Windows | `event`, `position` | Emitted when the mouse exits the tray icon. |
| `mouse-move` | macOS, Windows | `event`, `position` | Emitted when the mouse moves in the tray icon. |

Instance methods:

| Method | Platform | Description |
| --- | --- | --- |
| `tray.destroy()` | | Destroys the tray icon immediately. |
| `tray.setImage(image)` | | Sets the `image` (NativeImage \| string) associated with this tray icon. |
| `tray.setPressedImage(image)` | macOS | Sets the `image` associated with this tray icon when pressed. |
| `tray.setToolTip(toolTip)` | | Sets the hover text; an empty string removes the tooltip. |
| `tray.setTitle(title[, options])` | macOS | Sets the title displayed next to the tray icon in the status bar (Support ANSI colors). `options.fontType` (string, optional): `monospaced` or `monospacedDigit`; `monospaced` is available in macOS 10.15+; when blank the default system font is used. |
| `tray.getTitle()` | macOS | Returns `string` - the title displayed next to the tray icon. |
| `tray.setIgnoreDoubleClickEvents(ignore)` | macOS | Ignoring double click events allows detecting every individual click. Default false. |
| `tray.getIgnoreDoubleClickEvents()` | macOS | Returns `boolean`. |
| `tray.displayBalloon(options)` | Windows | Displays a tray balloon (see options below). |
| `tray.removeBalloon()` | Windows | Removes a tray balloon. |
| `tray.focus()` | Windows | Returns focus to the taskbar notification area. Use it when a notification area icon completes its UI operation (e.g. user presses ESC to cancel a shortcut menu). |
| `tray.popUpContextMenu([menu, position])` | macOS, Windows | Pops up the context menu of the tray icon. When `menu` (Menu, optional) is passed it is shown instead of the tray icon's context menu. `position` (Point, optional) is only available on Windows, default (0, 0). |
| `tray.closeContextMenu()` | macOS, Windows | Closes an open context menu, as set by `tray.setContextMenu()`. |
| `tray.setContextMenu(menu)` | | Sets the context menu (`Menu \| null`) for this icon. |
| `tray.getBounds()` | macOS, Windows | Returns `Rectangle` - the bounds of this tray icon. |
| `tray.getGUID()` | macOS, Windows | Returns `string \| null` - the GUID used to identify the tray icon, or null if none is set. |
| `tray.isDestroyed()` | | Returns `boolean` - whether the tray icon is destroyed. |

`tray.displayBalloon(options)` (Windows) options:

| Name | Type | Description |
| --- | --- | --- |
| icon | NativeImage \| string (optional) | Icon to use when `iconType` is `custom`. |
| iconType | string (optional) | `none`, `info`, `warning`, `error` or `custom`. Default is `custom`. |
| title | string | |
| content | string | |
| largeIcon | boolean (optional) | The large version of the icon should be used. Default `true`. Maps to `NIIF_LARGE_ICON`. |
| noSound | boolean (optional) | Do not play the associated sound. Default `false`. Maps to `NIIF_NOSOUND`. |
| respectQuietTime | boolean (optional) | Do not display the balloon notification if the user is in "quiet time". Default `false`. Maps to `NIIF_RESPECT_QUIET_TIME`. |

## Notes

- Linux: the tray icon uses StatusNotifierItem by default; when not available in the desktop environment `GtkStatusIcon` is used. The StatusNotifierItem spec does not specify which action causes an activation (left click in some environments, double left click in others). For changes made to individual `MenuItem`s to take effect you have to call `setContextMenu` again.
- macOS: icons passed to the constructor should be Template Images. For non-grainy retina icons the `@2x` image should be 144dpi; if bundling with webpack ensure file names are not mangled or hashed - the filename needs to end in `Template` and the `@2x` image needs the same filename as the standard image. 16x16 (72dpi) and 32x32@2x (144dpi) work well for most icons.
- Windows: `ICO` icons are recommended. If the executable is signed and the signature contains an organization in the subject line, the GUID is permanently associated with that signature (tray position persists even if the path changes). If not code-signed, the GUID is associated with the executable path; changing the path breaks tray icon creation and a new GUID must be used. Use the GUID parameter only with a code-signed executable. Multiple tray icons each need a separate GUID. On macOS the `guid` lets the icon retain its position between relaunches.
- Electron's built-in classes cannot be subclassed in user code.
- Distinction: this is the Electron `Tray` class (notification area / menu bar status item). Windows-native taskbar, notification area and jump list APIs belong to windows-platform-integration.
- Guide: https://www.electronjs.org/docs/latest/tutorial/tray

## Related

- [Menu](./menu.md)
- [Taskbar structures](./taskbar-structures.md)
- [Dock](./dock.md)
