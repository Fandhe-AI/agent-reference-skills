# UIOverlayArrangement

An arrangement that overlays views; layers the primary view on top of the secondary view in z-order.

## Signature / Usage

```swift
let arrangementVC = UIArrangementViewController()
arrangementVC.setViewController(PrimaryViewController(), for: .primary)
arrangementVC.setViewController(SecondaryViewController(), for: .secondary)

arrangementVC.updateArrangement(.overlay.axes(.horizontal))
```

```swift
struct UIOverlayArrangement   // conforms to UIArrangementViewController.Arrangement, Copyable, Escapable
```

## Options / Props

| Name | Signature | Description |
|------|-----------|-------------|
| init() | `init()` | Creates an overlay arrangement. |
| axes(_:) | `func axes(_: UIAxis) -> UIOverlayArrangement` | Sets the supported axes of the arrangement. |

## Notes

- iOS 27.1+, iPadOS 27.1+, Mac Catalyst 27.1+, tvOS 27.1+, visionOS 27.1+.
- Well-suited to full-screen experiences like media players, where playback controls overlay a video surface.
- When the environment changes, such as when a foldable device is folded, the overlay arrangement can transition its views from a layered layout into a side-by-side layout. `axes(_:)` controls which axes are supported.
- Objective-C: `UIOverlayArrangement` is a class created with `[UIOverlayArrangement overlayArrangement]` and an `axes` property.

## Related

- [UIArrangementViewController](./uiarrangementviewcontroller.md)
- [UISplitArrangement](./uisplitarrangement.md)
