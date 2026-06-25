# NSLayoutYAxisAnchor

A factory subclass of `NSLayoutAnchor` for creating vertical (Y-axis) layout constraints with compile-time type safety.

## Signature / Usage

```swift
@MainActor
class NSLayoutYAxisAnchor : NSLayoutAnchor<NSLayoutYAxisAnchor>
```

Accessed via the vertical anchor properties on `UIView` and `UILayoutGuide`: `topAnchor`, `bottomAnchor`, `centerYAnchor`, `firstBaselineAnchor`, `lastBaselineAnchor`.

```swift
// Use system spacing below a previous view (Dynamic Type aware)
label.topAnchor.constraint(
    equalToSystemSpacingBelow: header.bottomAnchor,
    multiplier: 1.0
).isActive = true

// Distance between two Y-axis points as a dimension
let halfHeight = view.topAnchor.anchorWithOffset(to: view.centerYAnchor)
```

## Options / Props

### Additional methods beyond `NSLayoutAnchor`

| Method | Description |
|--------|-------------|
| `constraint(equalToSystemSpacingBelow:multiplier:)` | Current anchor is exactly `multiplier × systemSpacing` below the specified anchor |
| `constraint(greaterThanOrEqualToSystemSpacingBelow:multiplier:)` | Minimum system-spacing gap below |
| `constraint(lessThanOrEqualToSystemSpacingBelow:multiplier:)` | Maximum system-spacing gap below |
| `anchorWithOffset(to:)` | Returns an `NSLayoutDimension` representing the distance between two Y-axis anchors |

## Notes

Available iOS 9.0+, iPadOS 9.0+, Mac Catalyst 13.1+, tvOS 9.0+, visionOS 1.0+. Passing an `NSLayoutXAxisAnchor` or `NSLayoutDimension` to any method expecting `NSLayoutYAxisAnchor` generates a compile-time warning. `firstBaselineAnchor` and `lastBaselineAnchor` are Y-axis anchors exposed on `UIView` for text-alignment constraints.

## Related

- [NSLayoutAnchor](./nslayoutanchor.md)
- [NSLayoutXAxisAnchor](./nslayoutxaxisanchor.md)
- [NSLayoutDimension](./nslayoutdimension.md)
