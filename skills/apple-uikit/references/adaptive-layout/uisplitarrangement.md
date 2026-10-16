# UISplitArrangement

An arrangement that splits views; places the primary and secondary views side-by-side along one or more axes.

## Signature / Usage

```swift
let arrangementVC = UIArrangementViewController()
arrangementVC.setViewController(PrimaryViewController(), for: .primary)
arrangementVC.setViewController(SecondaryViewController(), for: .secondary)

arrangementVC.updateArrangement(.split.axes(.horizontal))
```

```swift
struct UISplitArrangement   // conforms to UIArrangementViewController.Arrangement, Copyable, Escapable
```

## Options / Props

| Name | Signature | Description |
|------|-----------|-------------|
| init() | `init()` | Creates a split arrangement. |
| axes(_:) | `func axes(_: UIAxis) -> UISplitArrangement` | Sets the axes of the arrangement. |
| Dimension | `struct UISplitArrangement.Dimension` | A dimension for a view within a split arrangement (Equatable, Hashable, Sendable). |
| DimensionRange | `struct UISplitArrangement.DimensionRange` | A range of dimensions defining the minimum, preferred, and maximum size for a view within a split arrangement. |
| Dimension.automatic | `static var automatic: UISplitArrangement.Dimension` | The automatic dimension for a split arrangement. |
| Dimension.intrinsic | `static var intrinsic: UISplitArrangement.Dimension` | The intrinsic dimension for a split arrangement based on intrinsic content size. |
| Dimension.absolute(_:) | `static func absolute(_: CGFloat) -> UISplitArrangement.Dimension` | An absolute dimension for a split arrangement. |
| Dimension.fractional(_:) | `static func fractional(_: CGFloat) -> UISplitArrangement.Dimension` | A fractional dimension for a split arrangement. |
| DimensionRange.init() | `init()` | Creates a dimension range. |
| DimensionRange.minimum | `var minimum: UISplitArrangement.Dimension` | The minimum dimension for the view. |
| DimensionRange.preferred | `var preferred: UISplitArrangement.Dimension` | The preferred dimension for the view. |
| DimensionRange.maximum | `var maximum: UISplitArrangement.Dimension` | The maximum dimension for the view. |

## Notes

- iOS 27.1+, iPadOS 27.1+, Mac Catalyst 27.1+, tvOS 27.1+, visionOS 27.1+.
- It is the default style of `UIArrangementViewController`. The split adapts its axis based on the available size and size class; `axes(_:)` constrains which axes it supports.
- Objective-C: `UISplitArrangement` is a class created with `[UISplitArrangement splitArrangement]` and an `axes` property.
- Distinct from `UISplitViewController`.
- Source: https://developer.apple.com/documentation/uikit/uisplitarrangement-swift.struct

## Related

- [UIArrangementViewController](./uiarrangementviewcontroller.md)
- [UIOverlayArrangement](./uioverlayarrangement.md)
