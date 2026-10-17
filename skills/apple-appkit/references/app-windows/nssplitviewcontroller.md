# NSSplitViewController

An object that manages an array of adjacent child views, and has a split view object for managing dividers between those views.

## Signature / Usage

```swift
class NSSplitViewController : NSViewController

var splitView: NSSplitView
var splitViewItems: [NSSplitViewItem]
func addSplitViewItem(_ splitViewItem: NSSplitViewItem)
func insertSplitViewItem(_ splitViewItem: NSSplitViewItem, at index: Int)
func removeSplitViewItem(_ splitViewItem: NSSplitViewItem)
func splitViewItem(for viewController: NSViewController) -> NSSplitViewItem?
func toggleSidebar(_ sender: Any?)
func toggleInspector(_ sender: Any?)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `splitView` | `NSSplitView` | The split view that the split view controller manages |
| `splitViewItems` | `[NSSplitViewItem]` | The array of split view items that correspond to the split view controller's child view controllers |
| `minimumThicknessForInlineSidebars` | `CGFloat` | The minimum thickness for a sidebar before it automatically collapses |
| `automaticDimension` (class) | `CGFloat` | The default value to apply to a dimension (ObjC: `NSSplitViewControllerAutomaticDimension`) |
| `addSplitViewItem(_:)` | method | Adds a split view item to the end of the array of split view items |
| `insertSplitViewItem(_:at:)` | method | Adds a split view item at the specified index position |
| `removeSplitViewItem(_:)` | method | Removes a specified split view item from the split view controller |
| `splitViewItem(for:)` | method | Returns the corresponding split view item for the specified child view controller |
| `toggleSidebar(_:)` | method | Collapses or expands the first sidebar using an animation |
| `toggleInspector(_:)` | method | Collapses or expands the first inspector using an animation |
| `viewDidLoad()` | method | Configures the split view controller after its view loads into memory |

## Notes

- macOS 10.10+.
- A split view controller owns an array of split view items, each of which has a view controller and corresponding view.
- By default, a split view arranges its child views vertically from top to bottom. For a horizontal (side-by-side) arrangement, set the split view's `isVertical` property.
- The split view controller serves as the delegate of its `splitView`. If you override a split view delegate method, your override must call super.
- Auto Layout is required for the child views and for the collapse/reveal animations.
- Views are loaded lazily: adding a collapsed split view item as a new child does not load its view until it shows.
- Protocol implementations are documented under "Supporting Protocol Requirements" (`nssplitviewcontroller-protocol-implementations`).
- Source: https://developer.apple.com/documentation/appkit/nssplitviewcontroller

## Related

- [NSSplitViewItem](./nssplitviewitem.md)
- [NSViewController](./nsviewcontroller.md)
- [NSTabViewController](./nstabviewcontroller.md)
