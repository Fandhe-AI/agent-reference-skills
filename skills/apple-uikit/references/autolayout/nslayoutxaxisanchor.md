# NSLayoutXAxisAnchor

A factory subclass of `NSLayoutAnchor` for creating horizontal (X-axis) layout constraints with compile-time type safety.

## Signature / Usage

```swift
@MainActor
class NSLayoutXAxisAnchor : NSLayoutAnchor<NSLayoutXAxisAnchor>
```

Accessed via the horizontal anchor properties on `UIView` and `UILayoutGuide`: `leadingAnchor`, `trailingAnchor`, `leftAnchor`, `rightAnchor`, `centerXAnchor`.

```swift
// Use system spacing (respects Dynamic Type spacing rules)
label.leadingAnchor.constraint(
    equalToSystemSpacingAfter: icon.trailingAnchor,
    multiplier: 1.0
).isActive = true

// Create a dimension representing distance between two X-axis points
let midWidth = view.leadingAnchor.anchorWithOffset(to: view.centerXAnchor)
```

## Options / Props

### Additional methods beyond `NSLayoutAnchor`

| Method | Description |
|--------|-------------|
| `constraint(equalToSystemSpacingAfter:multiplier:)` | Trailing anchor is exactly `multiplier × systemSpacing` after the specified anchor |
| `constraint(greaterThanOrEqualToSystemSpacingAfter:multiplier:)` | Minimum system-spacing gap |
| `constraint(lessThanOrEqualToSystemSpacingAfter:multiplier:)` | Maximum system-spacing gap |
| `anchorWithOffset(to:)` | Returns an `NSLayoutDimension` representing the distance between two X-axis anchors |

## Notes

Available iOS 9.0+, iPadOS 9.0+, Mac Catalyst 13.1+, tvOS 9.0+, visionOS 1.0+. Passing a `NSLayoutYAxisAnchor` or `NSLayoutDimension` to any method expecting `NSLayoutXAxisAnchor` generates a compile-time warning. System spacing methods use the value defined by `UIFont.systemFontSize` spacing guidelines and scale with Dynamic Type.

## Related

- [NSLayoutAnchor](./nslayoutanchor.md)
- [NSLayoutYAxisAnchor](./nslayoutyaxisanchor.md)
- [NSLayoutDimension](./nslayoutdimension.md)
