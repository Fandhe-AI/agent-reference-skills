---
source: https://www.electronjs.org/docs/latest/api/share-menu
---

# ShareMenu (macOS)

Create a Share Menu on macOS, used to share information from the current context to apps, social media accounts, and other services. Process: Main.

## Signature / Usage

```js
new ShareMenu(sharingItem)

shareMenu.popup([options])
shareMenu.closePopup([browserWindow])
```

## Options / Props

`new ShareMenu(sharingItem)` - `sharingItem` SharingItem - the item to share.

SharingItem Object:

| Name | Type | Description |
| --- | --- | --- |
| texts | string[] (optional) | An array of text to share. |
| filePaths | string[] (optional) | An array of files to share. |
| urls | string[] (optional) | An array of URLs to share. |

`shareMenu.popup([options])` - `options` PopupOptions (optional):

| Name | Type | Description |
| --- | --- | --- |
| browserWindow | BrowserWindow (optional) | Default is the focused window. |
| x | number (optional) | Default is the current mouse cursor position. Must be declared if `y` is declared. |
| y | number (optional) | Default is the current mouse cursor position. Must be declared if `x` is declared. |
| positioningItem | number (optional) _macOS_ | The index of the menu item to be positioned under the mouse cursor at the specified coordinates. Default is -1. |
| callback | Function (optional) | Called when menu is closed. |

`shareMenu.closePopup([browserWindow])` - closes the context menu in the `browserWindow` (default is the focused window).

## Notes

- `shareMenu.popup` pops up this menu as a context menu in the `BrowserWindow`.
- To include the share menu as a submenu of other menus, use the `shareMenu` role of `MenuItem`.
- History: added - https://github.com/electron/electron/pull/25629
- Electron's built-in classes cannot be subclassed in user code.
- Distinction: Electron wrapper of the macOS Share Menu; the native AppKit sharing APIs belong to apple-appkit.
- SharingItem source: https://www.electronjs.org/docs/latest/api/structures/sharing-item

## Related

- [MenuItem](./menu-item.md)
- [Menu](./menu.md)
