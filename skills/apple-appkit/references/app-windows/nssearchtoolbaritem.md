# NSSearchToolbarItem

A toolbar item that contains a search field optimized for performing text-based searches.

## Signature / Usage

```swift
class NSSearchToolbarItem : NSToolbarItem

var searchField: NSSearchField
func beginSearchInteraction()
func endSearchInteraction()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `searchField` | `NSSearchField` | The search field inside the toolbar item |
| `preferredWidthForSearchField` | `CGFloat` | The preferred width for the toolbar item when it has keyboard focus |
| `resignsFirstResponderWithCancel` | `Bool` | Lets the cancel button resign first responder in addition to clearing the contents |
| `beginSearchInteraction()` | method | Starts a search interaction and moves keyboard focus to the search field |
| `endSearchInteraction()` | method | Ends the interaction by giving up first responder and adjusting the field size if necessary |

## Notes

- macOS 11.0+. Inherits from `NSToolbarItem`.
- The item automatically resizes to accommodate typing when focus switches to it. When the toolbar is low on space, the system may collapse it into a button that expands to a full search field on click.

## Related

- [NSToolbarItem](./nstoolbaritem.md)
- [NSToolbar](./nstoolbar.md)
