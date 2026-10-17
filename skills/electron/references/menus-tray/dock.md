---
source: https://www.electronjs.org/docs/latest/api/dock
---

# Dock (macOS)

Control your app in the macOS dock. Process: Main. This class is not exported from the `'electron'` module; it is only available as a return value of other methods in the Electron API (`app.dock`).

## Signature / Usage

```js
dock.bounce([type])
dock.cancelBounce(id)
dock.downloadFinished(filePath)
dock.setBadge(text)
dock.getBadge()
dock.hide()
dock.show()
dock.isVisible()
dock.setMenu(menu)
dock.getMenu()
dock.setIcon(image)
```

## Instance Methods

All methods are macOS only.

| Method | Description |
| --- | --- |
| `dock.bounce([type])` | `type` string (optional): `critical` or `informational` (default). Returns `Integer` - an ID representing the request. `critical` bounces until the application becomes active or the request is canceled. `informational` bounces for one second, but the request remains active until the app becomes active or the request is canceled. |
| `dock.cancelBounce(id)` | `id` Integer. Cancel the bounce of `id`. |
| `dock.downloadFinished(filePath)` | `filePath` string. Bounces the Downloads stack if the filePath is inside the Downloads folder. |
| `dock.setBadge(text)` | `text` string. Sets the string to be displayed in the dock's badging area. |
| `dock.getBadge()` | Returns `string` - The badge string of the dock. |
| `dock.hide()` | Hides the dock icon. |
| `dock.show()` | Returns `Promise<void>` - Resolves when the dock icon is shown. |
| `dock.isVisible()` | Returns `boolean` - Whether the dock icon is visible. |
| `dock.setMenu(menu)` | `menu` Menu. Sets the application's dock menu. |
| `dock.getMenu()` | Returns `Menu \| null` - The application's dock menu. |
| `dock.setIcon(image)` | `image` (NativeImage \| string). Sets the image associated with this dock icon. |

## Notes

- `dock.bounce` can only be used while the app is not focused; when the app is focused it returns -1.
- `dock.setBadge` requires that your application has the permission to display notifications for the method to work.
- Known issue: calling `dock.hide()` within one second of a previous call will have no effect. Workaround: ensure at least one second has elapsed between calls, for example by deferring with a `setTimeout` of 1100ms or more after a previous call.
- `MenuItem` badges are not displayed in Dock menus.
- Distinction: macOS-only Electron wrapper around the dock. Native AppKit dock APIs belong to apple-appkit.
- Guide: https://www.electronjs.org/docs/latest/tutorial/macos-dock

## Related

- [Menu](./menu.md)
- [MenuItem](./menu-item.md)
- [app.dock](../app/app-properties.md)
