# NSToolbarItem

A single item that appears in a window's toolbar.

## Signature / Usage

```swift
@MainActor
class NSToolbarItem : NSObject

// In NSToolbarDelegate
func toolbar(_ toolbar: NSToolbar,
             itemForItemIdentifier itemIdentifier: NSToolbarItem.Identifier,
             willBeInsertedIntoToolbar flag: Bool) -> NSToolbarItem? {
    let item = NSToolbarItem(itemIdentifier: itemIdentifier)
    item.label = "New"
    item.image = NSImage(systemSymbolName: "plus", accessibilityDescription: "New")
    item.action = #selector(newDocument(_:))
    return item
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `itemIdentifier` | `NSToolbarItem.Identifier` | Unique identifier within the toolbar |
| `label` | `String` | Text shown below/beside the icon in the toolbar |
| `paletteLabel` | `String` | Label in the customization palette |
| `title` | `String` | Title (used when item displays only text) |
| `toolTip` | `String?` | Tooltip on hover |
| `possibleLabels` | `Set<String>` | All labels the item might show; used for sizing |
| `image` | `NSImage?` | Icon image |
| `view` | `NSView?` | Custom view replacing the default button rendering |
| `backgroundTintColor` | `NSColor?` | Tint color for the item background |
| `target` | `AnyObject?` | Object receiving the action; `nil` uses the responder chain |
| `action` | `Selector?` | Method sent when the item is clicked |
| `isEnabled` | `Bool` | Whether the item is enabled |
| `isVisible` | `Bool` | Whether the item is in the toolbar bar (vs. overflow menu) |
| `isHidden` | `Bool` | Whether the item is hidden entirely |
| `isBordered` | `Bool` | Whether to draw a border around the item |
| `isNavigational` | `Bool` | Whether the item behaves as a navigation control |
| `style` | `NSToolbarItem.Style` | `.plain` or `.prominent` (macOS 13+) |
| `visibilityPriority` | `NSToolbarItem.VisibilityPriority` | Priority when toolbar space is limited |
| `badge` | `NSToolbarItemBadge?` | Badge overlaid on the item icon |
| `autovalidates` | `Bool` | Whether the toolbar calls `validate()` automatically |
| `validate()` | method | Check enabled state and menu item title |

## Notes

- macOS 10.0+. Standard identifier constants (`NSToolbarItem.Identifier.flexibleSpace`, `.space`, `.print`, etc.) produce system-provided items; return `nil` from the delegate for those.
- When `view` is set, `image`, `label`, and `action` on the item itself are ignored; configure the view's controls directly.
- Use `autovalidates = true` (default) so the toolbar validates enabled state before each display.

## Related

- [NSToolbar](./nstoolbar.md)
