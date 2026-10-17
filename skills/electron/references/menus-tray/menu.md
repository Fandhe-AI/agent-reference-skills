---
source: https://www.electronjs.org/docs/latest/api/menu
---

# Menu

Create application menus and context menus. Process: Main.

## Signature / Usage

```js
new Menu()

Menu.setApplicationMenu(menu)
Menu.getApplicationMenu()
Menu.sendActionToFirstResponder(action) // macOS
Menu.buildFromTemplate(template)

menu.popup([options])
menu.closePopup([window])
menu.append(menuItem)
menu.getMenuItemById(id)
menu.insert(pos, menuItem)
```

## Static Methods

| Method | Platform | Description |
| --- | --- | --- |
| `Menu.setApplicationMenu(menu)` (`menu`: Menu \| null) | | Sets `menu` as the application menu on macOS. On Windows and Linux, the `menu` will be set as each window's top menu. Passing `null` will suppress the default menu; on Windows and Linux this also removes the menu bar from the window. |
| `Menu.getApplicationMenu()` | | Returns `Menu \| null` - the application menu, if set, or `null`. |
| `Menu.sendActionToFirstResponder(action)` (`action`: string) | macOS | Sends the `action` to the first responder of application. Used for emulating default macOS menu behaviors; usually you would use the `role` property of a `MenuItem`. |
| `Menu.buildFromTemplate(template)` (`template`: (MenuItemConstructorOptions \| MenuItem)[]) | | Returns `Menu`. Other fields attached to a template element become properties of the constructed menu item. |

## Instance Methods

| Method | Description |
| --- | --- |
| `menu.popup([options])` | Pops up this menu as a context menu in the `BaseWindow`. |
| `menu.closePopup([window])` | Closes the context menu in the `window` (`BaseWindow`, optional; default is the focused window). |
| `menu.append(menuItem)` | Appends the `menuItem` to the menu. |
| `menu.getMenuItemById(id)` | Returns `MenuItem \| null` - the item with the specified `id`. |
| `menu.insert(pos, menuItem)` | Inserts the `menuItem` to the `pos` (Integer) position of the menu. |

## Options / Props

`menu.popup([options])` - `options` Object (optional):

| Name | Type | Description |
| --- | --- | --- |
| window | BaseWindow (optional) | Default is the focused window. |
| frame | WebFrameMain (optional) | Provide the relevant frame if you want certain OS-level features such as Writing Tools on macOS to function correctly. Typically `params.frame` from the `context-menu` event on a WebContents, or the `focusedFrame` property of a WebContents. |
| x | number (optional) | Default is the current mouse cursor position. Must be declared if `y` is declared. |
| y | number (optional) | Default is the current mouse cursor position. Must be declared if `x` is declared. |
| positioningItem | number (optional) _macOS_ | The index of the menu item to be positioned under the mouse cursor at the specified coordinates. Default is -1. |
| sourceType | string (optional) _Windows_ _Linux_ | Should map to the `menuSourceType` provided by the `context-menu` event. Not recommended to set manually; only provide values received from other APIs or leave `undefined`. Can be `none`, `mouse`, `keyboard`, `touch`, `touchMenu`, `longPress`, `longTap`, `touchHandle`, `stylus`, `adjustSelection`, or `adjustSelectionReset`. |
| callback | Function (optional) | Called when menu is closed. |

## Instance Events

| Event | Description |
| --- | --- |
| `menu-will-show` (`event`: Event) | Emitted when `menu.popup()` is called. |
| `menu-will-close` (`event`: Event) | Emitted when a popup is closed either manually or with `menu.closePopup()`. |

## Instance Properties

- `menu.items` - A `MenuItem[]` array containing the menu's items. Each `Menu` consists of multiple `MenuItem` instances and each `MenuItem` can nest a `Menu` into its `submenu` property.

## Notes

- The presentation of menus varies by OS: under Windows and Linux, menus are visually similar to Chromium; under macOS, these will be native menus.
- On Linux, the menu bar uses GTK theme colors when GTK is available. If GTK cannot initialize, it uses Chromium's built-in light or dark menu colors, following `nativeTheme.shouldUseDarkColors`.
- On Windows and Linux, a `&` in the top-level item name indicates which letter gets a generated accelerator (`&File` gives `Alt-F`; the character is underlined and `&` is not displayed). Escape with a preceding `&` (`&&File` displays `&File`).
- The default menu is created automatically if the app does not set one. It contains standard items such as `File`, `Edit`, `View`, and `Window`.
- The `Menu` returned by `Menu.getApplicationMenu()` doesn't support dynamic addition or removal of menu items; instance properties can still be dynamically modified.
- Electron's built-in classes cannot be subclassed in user code.
- Distinction: this is the Electron API for OS-native application / context menus created in the main process. Web UI menu components belong to ark-ui / chakra-ui / fandhe-frontend; native-toolkit equivalents belong to android-compose-components, windows-winui-controls and apple-appkit (NSMenu).
- Guides: https://www.electronjs.org/docs/latest/tutorial/menus and https://www.electronjs.org/docs/latest/tutorial/context-menu

## Related

- [MenuItem](./menu-item.md)
- [Tray](./tray.md)
- [Dock](./dock.md)
