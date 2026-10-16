# UIView

An object that manages the content for a rectangular area on the screen. Views are the fundamental building blocks of an app's user interface, rendering content within their bounds rectangle and handling user interactions.

## Signature / Usage

```swift
@MainActor
class UIView : UIResponder

// Create with frame
let view = UIView(frame: CGRect(x: 0, y: 0, width: 100, height: 100))
view.backgroundColor = .systemBlue
view.translatesAutoresizingMaskIntoConstraints = false
superview.addSubview(view)

NSLayoutConstraint.activate([
    view.topAnchor.constraint(equalTo: superview.topAnchor, constant: 16),
    view.leadingAnchor.constraint(equalTo: superview.leadingAnchor, constant: 16),
    view.widthAnchor.constraint(equalToConstant: 100),
    view.heightAnchor.constraint(equalToConstant: 100)
])
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `frame` | `CGRect` | Origin and size in superview's coordinate system |
| `bounds` | `CGRect` | Internal coordinate space |
| `center` | `CGPoint` | Center point in superview's coordinate system |
| `backgroundColor` | `UIColor?` | Background fill color |
| `alpha` | `CGFloat` | Opacity (0.0–1.0) |
| `isHidden` | `Bool` | Whether the view is hidden |
| `isOpaque` | `Bool` | Rendering optimization hint |
| `tintColor` | `UIColor` | Tint applied to view and subviews |
| `contentMode` | `UIView.ContentMode` | How content scales when bounds change |
| `clipsToBounds` | `Bool` | Whether subviews outside bounds are clipped |
| `subviews` | `[UIView]` | Ordered array of immediate subviews |
| `superview` | `UIView?` | Parent view |
| `window` | `UIWindow?` | Window containing the view |
| `autoresizingMask` | `UIView.AutoresizingMask` | Auto-resize behavior |
| `translatesAutoresizingMaskIntoConstraints` | `Bool` | Must be `false` when using Auto Layout |
| `constraints` | `[NSLayoutConstraint]` | Active constraints |

**Key methods:**

| Method | Description |
|--------|-------------|
| `addSubview(_:)` | Adds a view as the topmost subview |
| `removeFromSuperview()` | Removes from parent |
| `insertSubview(_:at:)` | Inserts at index in subview stack |
| `bringSubviewToFront(_:)` / `sendSubviewToBack(_:)` | Reorder subviews |
| `layoutSubviews()` | Override to perform manual layout |
| `setNeedsLayout()` | Schedules layout update |
| `layoutIfNeeded()` | Forces immediate layout |
| `draw(_:)` | Override for custom drawing |
| `setNeedsDisplay()` | Marks view as needing redraw |
| `sizeThatFits(_:)` | Returns preferred size |
| `sizeToFit()` | Resizes to fit content |

**Layout anchors (Auto Layout):**

`topAnchor`, `bottomAnchor`, `leadingAnchor`, `trailingAnchor`, `centerXAnchor`, `centerYAnchor`, `widthAnchor`, `heightAnchor`

## Notes

- Available iOS 2.0+, iPadOS 2.0+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+.
- All UIView operations must occur on the main thread.
- Prefer Auto Layout (`translatesAutoresizingMaskIntoConstraints = false`) over manual frame-based layout.
- Before subclassing, consider using animations, constraints, gesture recognizers, or composition of subviews.
- iOS 27.1+: `reservedRegions(kind: UIView.ReservedRegion.Kind, options: UIView.ReservedRegion.QueryOptions = []) -> [UIView.ReservedRegion]` returns the regions of the view reserved by hardware, such as the camera or the hinge (kinds `.occlusion` / `.division`).
- iOS 27.1+: `UIView.LayoutRegion.bar(onEdge:extent:)` reserves a layout region for vertical bar content, in two overloads: `static func bar(onEdge edge: NSDirectionalRectEdge, extent: CGFloat) -> UIView.LayoutRegion` and `static func bar(onEdge edge: UIRectEdge, extent: CGFloat) -> UIView.LayoutRegion`.
- Core Location / Core Motion: the UIKit updates page states that Core Location and Core Motion sensor data can be aligned with the app's UI orientation by setting a `UIView` as the "body" of a `CLLocationManager` or `CMMotionManager` instance. The page does not name the property or method, so no signature is given here.

## Related

- [UIControl](./uicontrol.md)
- [UIScrollView](./uiscrollview.md)
- [UIStackView](./uistackview.md)
- [UIView.ReservedRegion](../adaptive-layout/uiview-reservedregion.md)
- [UIHingeInteraction](../adaptive-layout/uihingeinteraction.md)
