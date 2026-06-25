# NSToolbar

An object that manages the space above an app's custom content, providing user-configurable access to common commands.

## Signature / Usage

```swift
@MainActor
class NSToolbar : NSObject

// Set up a toolbar
let toolbar = NSToolbar(identifier: "MainToolbar")
toolbar.delegate = self
toolbar.allowsUserCustomization = true
toolbar.autosavesConfiguration = true
window.toolbar = toolbar
```

## Options / Props

| Name / Method | Type | Description |
|---------------|------|-------------|
| `identifier` | `NSToolbar.Identifier` | Unique identifier used for autosave |
| `delegate` | `NSToolbarDelegate?` | Provides items and responds to changes |
| `items` | `[NSToolbarItem]` | Current ordered items in the toolbar |
| `visibleItems` | `[NSToolbarItem]?` | Items currently visible (not in overflow) |
| `centeredItemIdentifiers` | `Set<NSToolbarItem.Identifier>` | Identifiers of items to display centered |
| `selectedItemIdentifier` | `NSToolbarItem.Identifier?` | Identifier of the currently selected item |
| `displayMode` | `NSToolbar.DisplayMode` | `.iconAndLabel`, `.iconOnly`, or `.labelOnly` |
| `isVisible` | `Bool` | Whether the toolbar is shown |
| `allowsUserCustomization` | `Bool` | Whether users can add/remove/reorder items |
| `allowsExtensionItems` | `Bool` | Whether Action extension items can appear |
| `autosavesConfiguration` | `Bool` | Persist customization to user defaults |
| `insertItem(withItemIdentifier:at:)` | method | Programmatically add an item |
| `removeItem(at:)` | method | Remove item at index |
| `removeItem(identifier:)` | method | Remove all items matching identifier |
| `runCustomizationPalette(_:)` | method | Show the customization sheet |
| `customizationPaletteIsRunning` | `Bool` | Whether the customization sheet is open |
| `validateVisibleItems()` | method | Trigger validation of all visible items |

## Notes

- macOS 10.0+. The delegate must implement `toolbar(_:itemForItemIdentifier:willBeInsertedIntoToolbar:)` to vend items and `toolbarAllowedItemIdentifiers(_:)` / `toolbarDefaultItemIdentifiers(_:)` to declare available items.
- Use `NSToolbarItem.Identifier` constants for standard items such as `.flexibleSpace`, `.space`, and `.print`.
- Set `autosavesConfiguration = true` to automatically restore the user's toolbar layout on next launch.

## Related

- [NSToolbarItem](./nstoolbaritem.md)
- [NSWindow](./nswindow.md)
