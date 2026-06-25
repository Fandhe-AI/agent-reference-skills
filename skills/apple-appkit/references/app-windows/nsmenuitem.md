# NSMenuItem

A command item in an app menu.

## Signature / Usage

```swift
@MainActor
class NSMenuItem : NSObject

// Typical usage
let item = NSMenuItem(
    title: "Save",
    action: #selector(save(_:)),
    keyEquivalent: "s"
)
item.keyEquivalentModifierMask = [.command]
menu.addItem(item)

// Separator
menu.addItem(.separator())

// Section header (macOS 14+)
menu.addItem(.sectionHeader(title: "Format"))
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `title` | `String` | Menu item label |
| `attributedTitle` | `NSAttributedString?` | Styled title (overrides `title` when set) |
| `action` | `Selector?` | Method sent to `target` when item is chosen |
| `target` | `AnyObject?` | Object receiving the action; `nil` uses the responder chain |
| `keyEquivalent` | `String` | Unmodified key character (e.g., `"s"`) |
| `keyEquivalentModifierMask` | `NSEvent.ModifierFlags` | Modifier keys (e.g., `.command`, `.shift`) |
| `isEnabled` | `Bool` | Whether the item is selectable |
| `isHidden` | `Bool` | Whether the item is hidden from the menu |
| `state` | `NSControl.StateValue` | `.on`, `.off`, or `.mixed` (check mark display) |
| `image` | `NSImage?` | Icon shown next to the title |
| `onStateImage` / `offStateImage` / `mixedStateImage` | `NSImage?` | State-specific icons |
| `badge` | `NSMenuItemBadge?` | Quantitative badge (macOS 14+) |
| `submenu` | `NSMenu?` | Attached submenu |
| `hasSubmenu` | `Bool` | Whether a submenu is attached |
| `isSeparatorItem` | `Bool` | `true` for separator items created via `separator()` |
| `isSectionHeader` | `Bool` | `true` for section headers (macOS 14+) |
| `tag` | `Int` | Numeric identifier for lookup |
| `representedObject` | `Any?` | Arbitrary associated data |
| `view` | `NSView?` | Custom view replacing the default drawn appearance |
| `toolTip` | `String?` | Tooltip shown on hover |
| `indentationLevel` | `Int` | Visual indent (0–15) |
| `parent` | `NSMenuItem?` | The item's parent menu item (if in a submenu) |

## Notes

- macOS 10.0+. `separator()` and `sectionHeader(title:)` are type methods returning pre-configured items.
- Setting `view` gives full control over item rendering; the standard keyboard shortcut display is then suppressed.
- Item enabling/disabling can be automated via `NSMenu.autoenablesItems` and `validateMenuItem(_:)` on the action target.

## Related

- [NSMenu](./nsmenu.md)
