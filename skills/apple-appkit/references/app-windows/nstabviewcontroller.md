# NSTabViewController

A container view controller that manages a tab view interface, which organizes multiple pages of content but displays only one page at a time.

## Signature / Usage

```swift
class NSTabViewController : NSViewController

var tabView: NSTabView
var tabViewItems: [NSTabViewItem]
func addTabViewItem(_ tabViewItem: NSTabViewItem)
func removeTabViewItem(_ tabViewItem: NSTabViewItem)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `tabView` | `NSTabView` | The tab view that manages the views of the interface |
| `tabViewItems` | `[NSTabViewItem]` | The tab view items used to manage each child view controller |
| `selectedTabViewItemIndex` | `Int` | The index of the selected tab |
| `tabStyle` | `NSTabViewController.TabStyle` | The style used to display the tabs |
| `transitionOptions` | `NSViewController.TransitionOptions` | Animation options when switching between tabs |
| `canPropagateSelectedChildViewControllerTitle` | `Bool` | Whether the controller gets its title from the selected child view controller |
| `addTabViewItem(_:)` | method | Adds a tab to the end of the list of tabs |
| `insertTabViewItem(_:at:)` | method | Inserts a tab into the list of tabs |
| `removeTabViewItem(_:)` | method | Removes the specified tab view item |
| `tabViewItem(for:)` | method | Returns the tab view item for the specified child view controller |

## Notes

- macOS 10.10+.
- Each tab is an `NSTabViewItem` that points to the child view controller managing its content. Assign a child view controller to new items before adding them to the tab view interface.
- Adding a child view controller directly (via `addChild`) automatically creates a default tab view item; removing the child removes the item.
- Views are loaded lazily, only after the corresponding tab is selected.
- `tabStyle` can show a segmented control or tabs in the window's toolbar; you can also provide your own control.
- Implements `NSTabViewDelegate` methods (`tabView(_:shouldSelect:)`, `tabView(_:willSelect:)`, `tabView(_:didSelect:)`) and `NSToolbarDelegate` methods (`toolbar(_:itemForItemIdentifier:willBeInsertedIntoToolbar:)`, `toolbarAllowedItemIdentifiers(_:)`, `toolbarDefaultItemIdentifiers(_:)`, `toolbarSelectableItemIdentifiers(_:)`).

## Related

- [NSViewController](./nsviewcontroller.md)
- [NSToolbar](./nstoolbar.md)
- [NSSplitViewController](./nssplitviewcontroller.md)
