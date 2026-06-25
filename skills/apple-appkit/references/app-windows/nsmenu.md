# NSMenu

An object that manages an app's menus.

## Signature / Usage

```swift
@MainActor
class NSMenu : NSObject

// Build a menu programmatically
let menu = NSMenu(title: "Edit")
menu.addItem(withTitle: "Cut", action: #selector(cut(_:)), keyEquivalent: "x")
menu.addItem(withTitle: "Copy", action: #selector(copy(_:)), keyEquivalent: "c")
menu.addItem(.separator())
NSApplication.shared.mainMenu?.setSubmenu(menu, for: editMenuItem)
```

## Options / Props

| Name / Method | Type | Description |
|---------------|------|-------------|
| `title` | `String` | The menu's title |
| `items` | `[NSMenuItem]` | All menu items in order |
| `numberOfItems` | `Int` | Count of items |
| `delegate` | `NSMenuDelegate?` | Object receiving menu lifecycle callbacks |
| `font` | `NSFont` | Font used to draw menu items |
| `autoenablesItems` | `Bool` | When `true`, items are auto-enabled/disabled via `validateMenuItem(_:)` |
| `supermenu` | `NSMenu?` | The parent menu, if this is a submenu |
| `isTornOff` | `Bool` | Whether the menu is detached from its parent |
| `addItem(_:)` | method | Append a prepared `NSMenuItem` |
| `addItem(withTitle:action:keyEquivalent:)` | method | Create and append a new item |
| `insertItem(_:at:)` | method | Insert a prepared item at a specific index |
| `removeItem(_:)` / `removeItem(at:)` | method | Remove an item |
| `removeAllItems()` | method | Clear all items |
| `item(at:)` | method | Get item at index |
| `item(withTitle:)` | method | Find item by title |
| `item(withTag:)` | method | Find item by tag |
| `setSubmenu(_:for:)` | method | Attach a submenu to an item |
| `update()` | method | Force item state refresh |
| `popUp(positioning:at:in:)` | method | Display the menu at a specific point |
| `cancelTracking()` | method | Dismiss the menu programmatically |
| `performKeyEquivalent(with:)` | method | Propagate a keyboard shortcut through the menu |

## Notes

- macOS 10.0+. The main menu bar is set via `NSApplication.shared.mainMenu`.
- When `autoenablesItems` is `true` (default), items are enabled/disabled by sending `validateMenuItem(_:)` to the target before display.
- Use `NSMenuItem.separator()` to insert a horizontal divider.

## Related

- [NSMenuItem](./nsmenuitem.md)
- [NSApplication](./nsapplication.md)
