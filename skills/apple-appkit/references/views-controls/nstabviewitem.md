# NSTabViewItem

An item in a tab view.

## Signature / Usage

```swift
class NSTabViewItem : NSObject
```

```swift
init(identifier: Any?)
convenience init(viewController: NSViewController)
var label: String { get set }
var view: NSView? { get set }
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(identifier:)` | `(Any?)` | Performs default initialization for the receiver. |
| `init(viewController:)` | `(NSViewController)` | Convenience initializer (Objective-C: `tabViewItemWithViewController:`). |
| `identifier` | `Any?` | The receiver's optional identifier object. |
| `label` | `String` | The label text for the receiver. |
| `image` | `NSImage?` | The image for this tab view item. The image may only be used in certain tab view styles and options. |
| `view` | `NSView?` | The view associated with the receiver. |
| `viewController` | `NSViewController?` | The view controller for the item (no abstract on the source page). |
| `color` | `NSColor` | The background color for content in the view. |
| `initialFirstResponder` | `NSView?` | The initial first responder for the view associated with the receiver (the view displayed when a user clicks the tab). |
| `tabState` | `NSTabViewItem.State` | The current display state of the tab associated with the receiver. |
| `tabView` | `NSTabView?` | The parent tab view for the receiver. |
| `toolTip` | `String?` | The tooltip displayed for the tab view item. |
| `drawLabel(_:in:)` | `(Bool, NSRect)` | Draws the receiver's label in `tabRect`, the area between the curved end caps. |
| `sizeOfLabel(_:)` | `(Bool) -> NSSize` | Calculates the size of the receiver's label. |

## Notes

- Platform: macOS (the symbol page lists no introduced version).
- An item is a convenient way of presenting information in multiple pages. A tab view keeps a zero-based array of tab view items, one for each tab in the view.
- `NSTabViewItem.State` constants describe the current display state of a tab (Objective-C name `NSTabState`); the cases are not listed on the source page and are not recorded here.
- Inherits from `NSObject` (not `NSView`).
- See also `NSTabViewController`.
- Source: https://developer.apple.com/documentation/appkit/nstabviewitem

## Related

- [NSTabView](./nstabview.md)
- [NSView](./nsview.md)
