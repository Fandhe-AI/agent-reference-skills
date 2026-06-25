# UISheetPresentationController

A presentation controller that manages the appearance and behavior of a sheet.

## Signature / Usage

```swift
@MainActor
class UISheetPresentationController : UIPresentationController
```

```swift
let vc = MyViewController()
if let sheet = vc.sheetPresentationController {
    sheet.detents = [.medium(), .large()]
    sheet.largestUndimmedDetentIdentifier = .medium
    sheet.prefersGrabberVisible = true
    sheet.prefersScrollingExpandsWhenScrolledToEdge = false
    sheet.prefersEdgeAttachedInCompactHeight = true
}
present(vc, animated: true)
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `detents` | `[Detent]` | Heights where the sheet can rest; default is `[.large()]` |
| `selectedDetentIdentifier` | `Detent.Identifier?` | Identifier of the most recently selected detent |
| `prefersGrabberVisible` | `Bool` | Whether a grabber indicator appears at the top |
| `prefersPageSizing` | `Bool` | Whether the sheet sizes itself for readable content |
| `prefersEdgeAttachedInCompactHeight` | `Bool` | Attaches to the bottom edge in compact height |
| `widthFollowsPreferredContentSizeWhenEdgeAttached` | `Bool` | Matches width to the view controller's preferred content size when edge-attached |
| `preferredCornerRadius` | `CGFloat?` | Attempted corner radius for the sheet |
| `largestUndimmedDetentIdentifier` | `Detent.Identifier?` | Largest detent that does not dim the underlying view |
| `prefersScrollingExpandsWhenScrolledToEdge` | `Bool` | Whether scrolling past the top expands the sheet to the next detent |
| `delegate` | `UISheetPresentationControllerDelegate?` | Delegate for responding to detent changes |

## Detent Values

```swift
// System detents
UISheetPresentationController.Detent.medium()   // ~half screen
UISheetPresentationController.Detent.large()    // full screen (default)

// Custom detent (iOS 16+)
UISheetPresentationController.Detent.custom(identifier: .init("myDetent")) { context in
    return context.maximumDetentValue * 0.67
}
```

## Animating Detent Changes

```swift
sheetPresentationController?.animateChanges {
    sheetPresentationController?.selectedDetentIdentifier = .medium
}
```

## Notes

- iOS 15.0+, iPadOS 15.0+, Mac Catalyst 15.0+, visionOS 1.0+; not available on tvOS.
- Access via `viewController.sheetPresentationController` before calling `present(_:animated:completion:)`.
- Setting `largestUndimmedDetentIdentifier` allows interaction with underlying content when the sheet is at or below that detent.

## Related

- [UIPresentationController](./uipresentationcontroller.md)
- [UIViewController](./uiviewcontroller.md)
- [View Controller Presentation](./viewcontroller-presentation.md)
