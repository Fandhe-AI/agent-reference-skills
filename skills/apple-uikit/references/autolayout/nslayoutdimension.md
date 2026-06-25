# NSLayoutDimension

A factory subclass of `NSLayoutAnchor` for creating size-based (width and height) layout constraints, adding support for `multiplier` and constant-only constraints.

## Signature / Usage

```swift
@MainActor
class NSLayoutDimension : NSLayoutAnchor<NSLayoutDimension>
```

Accessed via `widthAnchor` and `heightAnchor` on `UIView` and `UILayoutGuide`.

```swift
// Fixed width
view.widthAnchor.constraint(equalToConstant: 120).isActive = true

// Proportional to another view (2× wide, plus 8 pts)
view.widthAnchor.constraint(
    equalTo: otherView.widthAnchor,
    multiplier: 2.0,
    constant: 8
).isActive = true

// Minimum height
view.heightAnchor.constraint(greaterThanOrEqualToConstant: 44).isActive = true
```

## Options / Props

### Methods beyond `NSLayoutAnchor`

| Method | Description |
|--------|-------------|
| `constraint(equalToConstant:)` | Fixed size |
| `constraint(equalTo:multiplier:)` | Proportional to another dimension |
| `constraint(equalTo:multiplier:constant:)` | Proportional with a constant offset |
| `constraint(greaterThanOrEqualToConstant:)` | Minimum fixed size |
| `constraint(greaterThanOrEqualTo:multiplier:)` | Minimum proportional size |
| `constraint(greaterThanOrEqualTo:multiplier:constant:)` | Minimum proportional with offset |
| `constraint(lessThanOrEqualToConstant:)` | Maximum fixed size |
| `constraint(lessThanOrEqualTo:multiplier:)` | Maximum proportional size |
| `constraint(lessThanOrEqualTo:multiplier:constant:)` | Maximum proportional with offset |

## Notes

Available iOS 9.0+, iPadOS 9.0+, Mac Catalyst 13.1+, tvOS 9.0+, visionOS 1.0+. All sizes are in points. Passing a non-dimension anchor (X-axis or Y-axis) generates a compile-time warning. `NSLayoutXAxisAnchor.anchorWithOffset(to:)` and `NSLayoutYAxisAnchor.anchorWithOffset(to:)` both return an `NSLayoutDimension` representing the distance between two parallel anchors.

## Related

- [NSLayoutAnchor](./nslayoutanchor.md)
- [NSLayoutXAxisAnchor](./nslayoutxaxisanchor.md)
- [NSLayoutYAxisAnchor](./nslayoutyaxisanchor.md)
- [NSLayoutConstraint](./nslayoutconstraint.md)
