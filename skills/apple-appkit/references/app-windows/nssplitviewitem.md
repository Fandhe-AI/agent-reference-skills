# NSSplitViewItem

An item in a split view controller. Represents a single pane with its child view controller, preferred thickness, holding priority, and collapsed state.

## Signature / Usage

```swift
class NSSplitViewItem : NSObject

convenience init(viewController: NSViewController)
convenience init(sidebarWithViewController: NSViewController)
convenience init(contentListWithViewController: NSViewController)
convenience init(inspectorWithViewController: NSViewController)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `viewController` | `NSViewController` | The view controller that the split view item represents |
| `behavior` | `NSSplitViewItem.Behavior` | The standard behavior type of the split view item |
| `collapseBehavior` | `NSSplitViewItem.CollapseBehavior` | The resizing behavior when the item toggles its collapsed state |
| `isCollapsed` | `Bool` | Whether the child view controller is in a collapsed state |
| `canCollapse` | `Bool` | Whether a user interaction can collapse the child view controller |
| `canCollapseFromWindowResize` | `Bool` | Whether a window resize can collapse the child view controller |
| `isSpringLoaded` | `Bool` | Whether the item can temporarily expand during a drag |
| `minimumThickness` | `CGFloat` | The minimum thickness of the item |
| `maximumThickness` | `CGFloat` | The maximum thickness of the item |
| `preferredThicknessFraction` | `CGFloat` | The preferred thickness relative to the split view |
| `automaticMaximumThickness` | `CGFloat` | The maximum thickness when the item resizes due to automatic sizing |
| `holdingPriority` | `NSLayoutConstraint.Priority` | The priority for the item to hold its size |
| `allowsFullHeightLayout` | `Bool` | Whether full-height sidebars appear in the window after you set a style mask |
| `automaticallyAdjustsSafeAreaInsets` | `Bool` | When true, the item's safe area insets are adjusted for overlaid content (sidebars / inspectors) |
| `titlebarSeparatorStyle` | `NSTitlebarSeparatorStyle` | The type of separator between the title bar and content of a window |
| `topAlignedAccessoryViewControllers` | `[NSSplitViewItemAccessoryViewController]` | Accessory view controllers at the top of the item |
| `bottomAlignedAccessoryViewControllers` | `[NSSplitViewItemAccessoryViewController]` | Accessory view controllers at the bottom of the item |
| `addTopAlignedAccessoryViewController(_:)` / `insertTopAlignedAccessoryViewController(_:at:)` / `removeTopAlignedAccessoryViewController(at:)` | methods | Manage top accessories |
| `addBottomAlignedAccessoryViewController(_:)` / `insertBottomAlignedAccessoryViewController(_:at:)` / `removeBottomAlignedAccessoryViewController(at:)` | methods | Manage bottom accessories |
| `unspecifiedDimension` (class) | `CGFloat` | A constant that resets a dimension's value (ObjC: `NSSplitViewItemUnspecifiedDimension`) |

## Notes

- macOS 10.10+.
- Use the accessory view controller APIs to add views such as a search field above a list; see `NSSplitViewItemAccessoryViewController`.
- The remove accessory methods may be replaced by `removeFromParentViewController`, whichever is easier.

## Related

- [NSSplitViewController](./nssplitviewcontroller.md)
- [NSSplitViewItemAccessoryViewController](./nssplitviewitemaccessoryviewcontroller.md)
