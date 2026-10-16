# Vertical Bar (controls on the vertical axis)

Concept page grouping the UIKit symbols that control whether bar content (tab bar, navigation/toolbar items) is shown on the vertical axis, which edge it uses, and how items compress.

## Signature / Usage

```swift
// UIViewController
var preferredVerticalBarBehavior: UIVerticalBarBehavior { get }
var childForPreferredVerticalBarBehavior: UIViewController? { get }
func setNeedsUpdateOfVerticalBarConfiguration()

// UITraitCollection
var verticalBarEdge: UIVerticalBarEdge { get }
static var systemTraitsAffectingVerticalBarEdge: ...   // system traits that affect verticalBarEdge

// UIBarButtonItem
var axisBehavior: UIBarButtonItem.AxisBehavior

// UINavigationItem
var verticalBarCompressionBehavior: UIVerticalBarCompressionBehavior

// UIView.LayoutRegion
static func bar(onEdge: NSDirectionalRectEdge, extent: CGFloat) -> UIView.LayoutRegion
static func bar(onEdge: UIRectEdge, extent: CGFloat) -> UIView.LayoutRegion
```

## Options / Props

### UIVerticalBarBehavior

A behavior that determines whether the vertical bar is used. `enum`, `init?(rawValue: Int)`.

| Case | Description |
|------|-------------|
| automatic | The system determines whether the vertical bar is rendered. |
| disabled | The vertical bar is disabled. |

### UIVerticalBarEdge

The edge where the system places the vertical bar. `enum`, `init?(rawValue: Int)`.

| Case | Description |
|------|-------------|
| leading | The vertical bar is on the leading edge (iOS, iPadOS, Mac Catalyst). |
| trailing | The vertical bar is on the trailing edge (iOS, iPadOS, Mac Catalyst). |
| unspecified | The system has no preferred edge for the vertical bar. |

### UIVerticalBarCompressionBehavior

How bars compress when different types of bars are hosted together and space is constrained. `enum`, `init?(rawValue: Int)`.

| Case | Description |
|------|-------------|
| automatic | The automatic compression behavior. |
| prefersTabBar | A compression behavior that prefers keeping the tab bar visible (iOS, iPadOS, Mac Catalyst). |
| prefersBarItems | A compression behavior that prefers keeping bar items visible (iOS, iPadOS, Mac Catalyst). |

### UIBarButtonItem.AxisBehavior

The bar axis behavior of the item. `enum`, `init?(rawValue: Int)`. The default value of `axisBehavior` is `automatic`.

| Case | Description |
|------|-------------|
| automatic | The system infers the supported axes based on the contents of the item. |
| horizontalOnly | The item only supports horizontal bars. If no horizontal bars are present, the item is not shown (iOS, iPadOS, Mac Catalyst). |
| verticalPreferred | The item supports both horizontal and vertical bars, and prefers a vertical placement when both are present (iOS, iPadOS, Mac Catalyst). |

### Members

| Name | Owner | Description |
|------|-------|-------------|
| preferredVerticalBarBehavior | UIViewController | The vertical bar behavior that this view controller prefers. Override to opt out of the vertical bar by returning `disabled` (ObjC `UIVerticalBarBehaviorDisabled`); defaults to `automatic`. |
| childForPreferredVerticalBarBehavior | UIViewController | Which child view controller, if any, should control the vertical bar behavior (ObjC `childViewControllerForPreferredVerticalBarBehavior`). |
| setNeedsUpdateOfVerticalBarConfiguration() | UIViewController | Signals to the system that the preferred vertical bar configuration, such as its behavior, has changed. |
| verticalBarEdge | UITraitCollection | The edge where the system places the vertical bar. |
| systemTraitsAffectingVerticalBarEdge | UITraitCollection | The system traits that affect the value of `verticalBarEdge`. |
| axisBehavior | UIBarButtonItem | Whether the item appears on the vertical or horizontal axis. |
| verticalBarCompressionBehavior | UINavigationItem | When the tab bar and navigation/toolbar items are both rendered together in the vertical bar, controls which items compress first. Default `automatic`. |
| bar(onEdge:extent:) | UIView.LayoutRegion | Static factory returning a `UIView.LayoutRegion`; overloads take `NSDirectionalRectEdge` or `UIRectEdge`. |

## Notes

- iOS 27.1+, iPadOS 27.1+, Mac Catalyst 27.1+; the types (`UIVerticalBarBehavior`, `UIVerticalBarEdge`, `UIVerticalBarCompressionBehavior`, `UIBarButtonItem.AxisBehavior`) are also marked tvOS 27.1+ and visionOS 27.1+, but the cases that choose a concrete edge, compression preference, or axis (`leading`, `trailing`, `prefersTabBar`, `prefersBarItems`, `horizontalOnly`, `verticalPreferred`) are listed for iOS, iPadOS, and Mac Catalyst only.
- `preferredVerticalBarBehavior`: disable the vertical bar only for UIs that are better served by horizontal bars; do not toggle it for a single view controller as a function of that view's state. To hide the bars and status bar on a given screen rather than change the layout, use the visibility APIs instead.
- When the resolved configuration changes, the system animates the transition: content reflows to or from the horizontal bars while the status bar changes axis and the leading or trailing safe area inset for the vertical bar is added or removed.
- `childForPreferredVerticalBarBehavior`: return a child to defer the configuration to it. System container view controllers forward to their active content by default (`UINavigationController` to its top view controller, `UITabBarController` to its selected view controller), so a content view controller's preference flows up to the window of the app or the nearest container.
- `verticalBarEdge` reflects the system's preferred edge regardless of whether a vertical bar is currently visible; it returns `unspecified` on devices and contexts where the system never places a vertical bar (for example hardware without a vertical bar, or a size class or orientation in which no vertical bar is used).
- Call `setNeedsUpdateOfVerticalBarConfiguration()` after changes to any state that affects the return values of methods like `preferredVerticalBarBehavior`.
- Source: the UIKit "Controls on the vertical axis" and "Bar items" sections of https://developer.apple.com/documentation/updates/uikit, plus the symbol pages https://developer.apple.com/documentation/uikit/uiverticalbarbehavior , https://developer.apple.com/documentation/uikit/uiverticalbaredge and https://developer.apple.com/documentation/uikit/uiverticalbarcompressionbehavior

## Related

- [UIArrangementViewController](./uiarrangementviewcontroller.md)
- [UIView.ReservedRegion](./uiview-reservedregion.md)
