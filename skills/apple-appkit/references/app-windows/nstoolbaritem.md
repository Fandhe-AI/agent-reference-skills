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
| `backgroundTintColor` | `NSColor?` | Tint color for the item background (macOS 26.0+) |
| `target` | `AnyObject?` | Object receiving the action; `nil` uses the responder chain |
| `action` | `Selector?` | Method sent when the item is clicked |
| `isEnabled` | `Bool` | Whether the item is enabled |
| `isVisible` | `Bool` | Whether the item is in the toolbar bar (vs. overflow menu) |
| `isHidden` | `Bool` | Whether the item is hidden entirely (macOS 15.0+) |
| `isBordered` | `Bool` | Whether to draw a border around the item |
| `isNavigational` | `Bool` | Whether the item behaves as a navigation control |
| `style` | `NSToolbarItem.Style` | `.plain` (default) or `.prominent` (macOS 26.0+). Prominent tints the background with `backgroundTintColor`, or the app's/system accent color when that is `nil`; a prominent item in a group moves to its own group so other items' backgrounds are not tinted |
| `visibilityPriority` | `NSToolbarItem.VisibilityPriority` | Priority when toolbar space is limited |
| `badge` | `NSItemBadge?` | Badge attached to the item (macOS 26.0+). Create with `NSItemBadge.count(_:)`, `NSItemBadge.text(_:)` or `NSItemBadge.indicator` (a badge without text) |
| `autovalidates` | `Bool` | Whether the toolbar calls `validate()` automatically |
| `validate()` | method | Check enabled state and menu item title |

## Notes

- macOS 10.0+. Standard identifier constants (`NSToolbarItem.Identifier.flexibleSpace`, `.space`, `.print`, etc.) produce system-provided items; return `nil` from the delegate for those.
- `allowsDuplicatesInToolbar` is deprecated in macOS 15.0.
- When `view` is set, `image`, `label`, and `action` on the item itself are ignored; configure the view's controls directly.
- Use `autovalidates = true` (default) so the toolbar validates enabled state before each display.

## Related

- [NSToolbar](./nstoolbar.md)
