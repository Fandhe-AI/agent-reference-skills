# NSTabView

A multipage interface that displays one page at a time.

## Signature / Usage

```swift
class NSTabView : NSView
```

```swift
func addTabViewItem(_ tabViewItem: NSTabViewItem)
func insertTabViewItem(_ tabViewItem: NSTabViewItem, at index: Int)
func removeTabViewItem(_ tabViewItem: NSTabViewItem)
func selectTabViewItem(at index: Int)
var selectedTabViewItem: NSTabViewItem? { get }
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `delegate` | `(any NSTabViewDelegate)?` | The tab view's delegate. |
| `tabViewItems` | `[NSTabViewItem]` | The tab view's array of tab view items. |
| `numberOfTabViewItems` | `Int` | The number of items in the tab view's array of tab view items. |
| `selectedTabViewItem` | `NSTabViewItem?` | The tab view item for the currently selected tab. |
| `tabViewType` | `NSTabView.TabType` | The tab type to display the tabs. |
| `tabPosition` | `NSTabView.TabPosition` | Position of the tabs (no abstract on the source page). |
| `tabViewBorderType` | `NSTabView.TabViewBorderType` | Border type (no abstract on the source page). |
| `font` | `NSFont` | The font used for the tab view's label text. |
| `drawsBackground` | `Bool` | Whether the tab view draws a background color when its type is `NSNoTabsNoBorder`. |
| `minimumSize` | `NSSize` | The minimum size necessary for the tab view to display tabs in a useful way. |
| `contentRect` | `NSRect` | The rectangle describing the content area of the tab view. |
| `controlSize` | `NSControl.ControlSize` | The size of the tab view. |
| `allowsTruncatedLabels` | `Bool` | Whether the tab view allows truncating for labels that don't fit on a tab. |
| `indexOfTabViewItem(_:)` | `(NSTabViewItem) -> Int` | Returns the index of the specified item in the tab view. |
| `indexOfTabViewItem(withIdentifier:)` | `(Any) -> Int` | Returns the index of the item that matches the specified identifier or `NSNotFound` if not found. |
| `tabViewItem(at:)` | `(Int) -> NSTabViewItem` | Returns the tab view item at `index` in the tab view's array of items. |
| `tabViewItem(at:)` | `(NSPoint) -> NSTabViewItem?` | Returns the tab view item at the specified point. |
| `selectFirstTabViewItem(_:)` / `selectLastTabViewItem(_:)` / `selectNextTabViewItem(_:)` / `selectPreviousTabViewItem(_:)` | `(Any?)` | Action methods that select the first / last / next / previous tab view item. |
| `selectTabViewItem(_:)` | `(NSTabViewItem?)` | Selects the specified tab view item. |
| `selectTabViewItem(withIdentifier:)` | `(Any)` | Selects the tab view item specified by `identifier`. |
| `takeSelectedTabViewItemFromSender(_:)` | `(Any?)` | Sets the selected tab view item to the selected item obtained from the sender. |

## Notes

- Platform: macOS (the symbol page lists no introduced version).
- A tab view contains a row of tabs that give the appearance of folder tabs. The user selects the desired page by clicking the appropriate tab or using the arrow keys to move between pages. Each page displays a view hierarchy provided by the app.
- Deprecated: `controlTint`.
- The enum cases of `NSTabView.TabType`, `TabPosition` and `TabViewBorderType` are not listed on the source page and are not recorded here.
- See also `NSTabViewController` and `NSTabViewItem`.
- Distinct from SwiftUI `TabView` (see apple-swiftui) and UIKit `UITabBarController` (see apple-uikit).

## Related

- [NSTabViewItem](./nstabviewitem.md)
- [NSView](./nsview.md)
- [NSSegmentedControl](./nssegmentedcontrol.md)
