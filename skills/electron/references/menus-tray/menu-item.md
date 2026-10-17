---
source: https://www.electronjs.org/docs/latest/api/menu-item
---

# MenuItem

Add items to native application menus and context menus. Process: Main. See Menu for examples.

## Signature / Usage

```js
new MenuItem(options)

// click(menuItem, window, event)
//   menuItem: MenuItem
//   window: BaseWindow | undefined (not defined if no window is open)
//   event: KeyboardEvent
```

## Options / Props

`new MenuItem(options)` - `options` Object:

| Name | Type | Description |
| --- | --- | --- |
| click | Function (optional) | Called with `click(menuItem, window, event)` when the menu item is clicked. |
| role | string (optional) | Defines the action of the menu item; when specified the `click` property will be ignored. Values: `undo`, `redo`, `cut`, `copy`, `paste`, `pasteAndMatchStyle`, `delete`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `toggleSpellChecker`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideOthers`, `unhide`, `quit`, `showSubstitutions`, `toggleSmartQuotes`, `toggleSmartDashes`, `toggleTextReplacement`, `startSpeaking`, `stopSpeaking`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu`, `shareMenu`, `recentDocuments`, `toggleTabBar`, `selectNextTab`, `selectPreviousTab`, `showAllTabs`, `mergeAllWindows`, `clearRecentDocuments`, `moveTabToNewWindow` or `windowMenu`. |
| type | string (optional) | `normal`, `separator`, `submenu`, `checkbox`, `radio`, `header` (macOS 14 and up only), `palette` (macOS 14 and up only). |
| label | string (optional) | |
| accessibilityLabel | string (optional) _macOS_ | |
| sublabel | string (optional) _macOS_ | Available in macOS >= 14.4. |
| toolTip | string (optional) _macOS_ | Hover text for this menu item. |
| accelerator | string (optional) | An Accelerator string. |
| icon | (NativeImage \| string) (optional) | A NativeImage or the file path of an icon. |
| enabled | boolean (optional) | If false, the menu item will be greyed out and unclickable. |
| acceleratorWorksWhenHidden | boolean (optional) _macOS_ | Default is `true`; when `false` prevents the accelerator from triggering the item if the item is not visible. |
| visible | boolean (optional) | If false, the menu item will be entirely hidden. |
| checked | boolean (optional) | Should only be specified for `checkbox` or `radio` type menu items. |
| registerAccelerator | boolean (optional) _Linux_ _Windows_ | If false, the accelerator won't be registered with the system, but it will still be displayed. Defaults to true. |
| sharingItem | SharingItem (optional) _macOS_ | The item to share when the `role` is `shareMenu`. |
| submenu | (MenuItemConstructorOptions[] \| Menu) (optional) | Should be specified for `submenu` type menu items. If specified, `type: 'submenu'` can be omitted. If the value is not a `Menu` it is converted using `Menu.buildFromTemplate`. |
| id | string (optional) | Unique within a single menu. If defined it can be used as a reference to this item by the position attribute. |
| before | string[] (optional) | Inserts this item before the item with the specified id. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the item should be placed in the same "group" as the referenced item. |
| after | string[] (optional) | Inserts this item after the item with the specified id. If the referenced item doesn't exist the item will be inserted at the end of the menu. |
| beforeGroupContaining | string[] (optional) | Lets a single context menu declare the placement of its containing group before the containing group of the item with the specified id. |
| afterGroupContaining | string[] (optional) | Lets a single context menu declare the placement of its containing group after the containing group of the item with the specified id. |
| badge | MenuItemBadge (optional) _macOS_ | A badge shown alongside the label, either a system-styled count (`alerts`, `updates`, `new-items`) or a custom string. Only available on macOS 14 and up. Not displayed in Dock menus. |

## Instance Properties

| Property | Type | Description |
| --- | --- | --- |
| `menuItem.id` | string | Unique id. Can be dynamically changed. |
| `menuItem.label` | string | Visible label. Can be dynamically changed. |
| `menuItem.accessibilityLabel` _macOS_ | string | Accessibility label (used by assistive technology), if set. Can be dynamically changed. |
| `menuItem.click` | Function | Fired when the MenuItem receives a click event. Can be called with `menuItem.click(event, focusedWindow, focusedWebContents)` (`event`: KeyboardEvent, `focusedWindow`: BaseWindow, `focusedWebContents`: WebContents). |
| `menuItem.submenu` | Menu (optional) | The item's submenu, if present. |
| `menuItem.type` | string | `normal`, `separator`, `submenu`, `checkbox`, `radio`, `header` or `palette` (`header` / `palette`: macOS 14 and up). |
| `menuItem.role` | string (optional) | The item's role, if set (same values as the `role` option, except that the set listed in the property description omits `showSubstitutions`, `toggleSmartQuotes`, `toggleSmartDashes` and `toggleTextReplacement`). |
| `menuItem.accelerator` | Accelerator \| null | The item's accelerator, if set. |
| `menuItem.userAccelerator` _Readonly_ _macOS_ | Accelerator \| null | The item's user-assigned accelerator. Only initialized after the MenuItem has been added to a Menu (via `Menu.buildFromTemplate` or `Menu.append()/insert()`); accessing before returns `null`. |
| `menuItem.icon` | NativeImage \| string (optional) | The item's icon, if set. Can be dynamically changed. |
| `menuItem.sublabel` | string | The item's sublabel. Can be dynamically changed. |
| `menuItem.toolTip` _macOS_ | string | The item's hover text. |
| `menuItem.enabled` | boolean | Whether the item is enabled. Can be dynamically changed. |
| `menuItem.visible` | boolean | Whether the item is visible. Can be dynamically changed. |
| `menuItem.checked` | boolean | Whether the item is checked. Can be dynamically changed. |
| `menuItem.registerAccelerator` _Linux_ _Windows_ | boolean | Whether the accelerator is registered with the system or just displayed. Can be dynamically changed. |
| `menuItem.sharingItem` _macOS_ | SharingItem | The item to share when the `role` is `shareMenu`. Can be dynamically changed. |
| `menuItem.commandId` | number | An item's sequential unique id. |
| `menuItem.menu` | Menu | The Menu that the item is a part of. |
| `menuItem.badge` _macOS_ | MenuItemBadge (optional) | Can be dynamically changed; setting it to `undefined` removes the badge. Only available on macOS 14 and up. |

## MenuItemBadge Object

| Name | Type | Description |
| --- | --- | --- |
| type | string (optional) | Can be `alerts`, `updates`, `new-items` or `none`. Default is `none`. |
| count | number (optional) | The number of items the badge displays. Required for the `alerts`, `updates` and `new-items` types; cannot be used with `none`. |
| content | string (optional) | A custom string to display in the badge. Required for, and only usable with, the `none` type. |

## Notes

- A `checkbox` menu item will toggle the `checked` property on and off when selected. A `radio` menu item will turn on its `checked` property when clicked, and will turn off that property for all adjacent items in the same menu. You can add a `click` function for additional behavior.
- `acceleratorWorksWhenHidden` is macOS-only because accelerators always work when items are hidden on Windows and Linux.
- With the predefined `MenuItemBadge` types (not `none`), the system localizes and pluralizes the badge; for a custom string you must localize and pluralize it yourself. Badges are not displayed in Dock menus, though the same item shows its badge in an application menu.
- Electron's built-in classes cannot be subclassed in user code.
- Distinction: native OS menu item API of Electron. Web UI menu / menu-item components belong to ark-ui / chakra-ui / fandhe-frontend; native-toolkit equivalents belong to android-compose-components, windows-winui-controls and apple-appkit (NSMenuItem).
- Roles guide: https://www.electronjs.org/docs/latest/tutorial/menus#roles

## Related

- [Menu](./menu.md)
- [ShareMenu](./share-menu.md)
- [Dock](./dock.md)
