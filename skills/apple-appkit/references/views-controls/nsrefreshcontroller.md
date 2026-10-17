# NSRefreshController

A controller that provides pull-to-refresh functionality for scroll views.

## Signature / Usage

```swift
@MainActor class NSRefreshController
```

```swift
var target: AnyObject? { get set }
var action: Selector? { get set }
func beginRefreshing()
func endRefreshing()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `target` | `AnyObject?` | The target object that receives action messages. |
| `action` | `Selector?` | The action method to call when refresh is triggered. |
| `attributedTitle` | `NSAttributedString?` | The styled text to display in the refresh controller. |
| `tintColor` | `NSColor?` | The tint color for the refresh controller. |
| `isRefreshing` | `Bool` | Whether a refresh operation is in progress. |
| `beginRefreshing()` | method | Tells the refresh controller that a refresh operation has begun. |
| `endRefreshing()` | method | Tells the refresh controller that a refresh operation has ended. |

## Notes

- Platform: macOS 27.0+.
- Enables users to trigger refresh operations by pulling down on scrollable content. Add a refresh controller to an `NSScrollView` and configure the target and action to handle refresh events.
- Inherits from `NSObject` (not `NSView`).
- The source page does not show how the controller is attached to an `NSScrollView` (the attaching property is not listed there), so it is not recorded here.
- Distinct from UIKit `UIRefreshControl` (see apple-uikit) and SwiftUI `refreshable` (see apple-swiftui).
- Source: https://developer.apple.com/documentation/appkit/nsrefreshcontroller

## Related

- [NSScrollView](./nsscrollview.md)
- [NSView](./nsview.md)
