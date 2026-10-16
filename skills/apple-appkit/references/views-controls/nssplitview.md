# NSSplitView

A view that arranges two or more views in a linear stack running horizontally or vertically.

## Signature / Usage

```swift
class NSSplitView : NSView
```

```swift
func addArrangedSubview(_ view: NSView)
func insertArrangedSubview(_ view: NSView, at index: Int)
func removeArrangedSubview(_ view: NSView)
func setPosition(_ position: CGFloat, ofDividerAt dividerIndex: Int)
func setHoldingPriority(_ priority: NSLayoutConstraint.Priority, forSubviewAt subviewIndex: Int)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `delegate` | `(any NSSplitViewDelegate)?` | The split view's delegate. |
| `arrangesAllSubviews` | `Bool` | Whether the split view arranges all of its subviews as split panes. |
| `arrangedSubviews` | `[NSView]` | The array of views that the split view arranges as its split panes. |
| `isVertical` | `Bool` | Determines the geometric orientation of the split view's dividers. |
| `dividerStyle` | `NSSplitView.DividerStyle` | The style of divider between views. |
| `dividerColor` | `NSColor` | The color of the dividers that the split view draws between subviews. |
| `dividerThickness` | `CGFloat` | The thickness of the dividers for the split view. |
| `autosaveName` | `NSSplitView.AutosaveName?` | The name to use when the system automatically saves the split view's divider configuration. |
| `adjustSubviews()` | method | Adjusts the sizes of the split view's subviews so they (plus the dividers) fill the split view. |
| `isSubviewCollapsed(_:)` | `(NSView) -> Bool` | Returns whether the specified view is in a collapsed state. |
| `holdingPriorityForSubview(at:)` | `(Int) -> NSLayoutConstraint.Priority` | Returns the priority of the subview's width or height when resizing. |
| `drawDivider(in:)` | `(NSRect)` | Draws a divider between two of the split view's subviews. |
| `minPossiblePositionOfDivider(at:)` | `(Int) -> CGFloat` | Returns the minimum possible position of the divider at the specified index. |
| `maxPossiblePositionOfDivider(at:)` | `(Int) -> CGFloat` | Returns the maximum possible position of the divider at the specified index. |
| `willResizeSubviewsNotification` | `NSNotification.Name` (class let) | Posts before a change to the size of some or all subviews of a split view. |
| `didResizeSubviewsNotification` | `NSNotification.Name` (class let) | Posts after a change to the size of some or all subviews of a split view. |

## Notes

- Platform: macOS (the symbol page lists no introduced version).
- A split view manages the dividers and orientation for a split view controller (`NSSplitViewController`). By default, dividers have a horizontal orientation so that the split view arranges its panes vertically from top to bottom.
- Divider indices are zero-based. If `isVertical` is `false` (the default), the top divider has an index of `0`. If `isVertical` is `true`, the leading divider has an index of `0`.
- Deprecated: `isPaneSplitter` and `setIsPaneSplitter:`.
- Also on the page: `NSSplitView.DidResizeSubviewsMessage` and `NSSplitView.WillResizeSubviewsMessage` structs (no abstract on the source page).
- See also `NSSplitViewController` and `NSSplitViewItem` ("Split View Interface").

## Related

- [NSView](./nsview.md)
- [NSScrollView](./nsscrollview.md)
- [NSBackgroundExtensionView](./nsbackgroundextensionview.md)
