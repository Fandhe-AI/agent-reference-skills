# UIArrangementViewController

A view controller that presents its container view controllers through an arrangement. Covers the class, its `Arrangement` protocol, `ViewPlacement`, and `ViewState`.

## Signature / Usage

```swift
let arrangementVC = UIArrangementViewController()

let primaryVC = PrimaryViewController()
arrangementVC.setViewController(primaryVC, for: .primary)

let secondaryVC = SecondaryViewController()
arrangementVC.setViewController(secondaryVC, for: .secondary)

arrangementVC.updateArrangement(.split.axes(.horizontal))

// Overlay style
arrangementVC.updateArrangement(.overlay.axes(.horizontal))
```

```swift
@MainActor class UIArrangementViewController : UIViewController
```

## Options / Props

| Name | Signature | Description |
|------|-----------|-------------|
| init() | `init()` | Creates an arrangement view controller. |
| updateArrangement(_:animated:) | `func updateArrangement<A>(_ arrangement: A, animated: Bool = false) where A : UIArrangementViewController.Arrangement` | Updates the arrangement of the view controller. `arrangement` is the arrangement to apply; `animated` controls the transition. |
| setViewController(_:for:animated:) | `func setViewController(_: UIViewController?, for: UIArrangementViewController.ViewPlacement, animated: Bool)` | Sets the view controller in the arrangement for a specific placement. |
| viewController(for:) | `func viewController(for: UIArrangementViewController.ViewPlacement) -> UIViewController?` | The view controller in the arrangement for the provided placement. |
| placement(for:) | `func placement(for: UIViewController) -> UIArrangementViewController.ViewPlacement?` | Returns the placement for the provided view controller; `nil` if it is not one of the view controllers in the arrangement with a specific placement. |
| state(for:) | `func state(for: UIArrangementViewController.ViewPlacement) -> UIArrangementViewController.ViewState?` | Returns the view state for a placement in the arrangement. |
| Arrangement.ViewProperties | `associatedtype ViewProperties` | `protocol UIArrangementViewController.Arrangement` (conforming types: `UIOverlayArrangement`, `UISplitArrangement`). The type of properties for views within the arrangement (required). |
| Arrangement.defaultViewProperties | `var defaultViewProperties: Self.ViewProperties` | The default view properties for a view controller placed in the arrangement (required). |
| Arrangement.setViewProperties(_:for:) | `func setViewProperties(_: Self.ViewProperties, for: UIArrangementViewController.ViewPlacement)` | Sets the view properties for a placement in the arrangement (required). |
| Arrangement.overlay | `static var overlay: UIOverlayArrangement` | The default overlay arrangement (available when `Self` is `UIOverlayArrangement`). |
| Arrangement.split | `static var split: UISplitArrangement` | The default split arrangement (available when `Self` is `UISplitArrangement`). |
| ViewPlacement.primary | `ViewPlacement` (struct) | The primary placement in the arrangement. |
| ViewPlacement.secondary | `ViewPlacement` (struct) | The secondary placement in the arrangement. |
| ViewState.isHidden | `Bool { get }` | Whether the view is hidden in the current arrangement. |
| ViewState.splitAxis | `UIAxis { get }` | The axis of the current split for the view within the arrangement if it exists. |
| ViewState.zIndex | `Int { get }` | The z-index of the view within the arrangement. |

## Notes

- Overlay style: layers the primary view on top of the secondary view in z-order; suited to full-screen experiences like media players where playback controls overlay a video surface. When the environment changes, such as when a foldable device is folded, an overlay arrangement can transition its views from a layered layout into a side-by-side layout. `UIOverlayArrangement.axes(_:)` controls which axes are supported.
- Split: places the primary and secondary views side-by-side along one or more axes; suited to two distinct pieces of content, such as a music player alongside its lyrics. It adapts its axis based on the available size and size class. Constrain the axes with `UISplitArrangement.axes(_:)`.
- iOS 27.1+, iPadOS 27.1+, Mac Catalyst 27.1+, tvOS 27.1+, visionOS 27.1+.
- You set a primary and a secondary view controller; the arrangement view controller computes the layout from the context it is presented in, including available size, size class, and hardware features.
- The default style is `UISplitArrangement`; the other built-in style is `UIOverlayArrangement`.
- Inherits from `UIViewController`. In the Swift overlay the placement is `.primary` / `.secondary`; Objective-C uses `setViewController:forPlacement:` with `UIArrangementViewControllerViewPlacementPrimary` / `Secondary`, and `updateArrangement:` / `updateArrangement:animated:`.
- This page is a container-view-controller reference; it is separate from `UISplitViewController`.

## Related

- [UISplitArrangement](./uisplitarrangement.md)
- [UIOverlayArrangement](./uioverlayarrangement.md)
- [UIView.ReservedRegion](./uiview-reservedregion.md)
- [UIHingeInteraction](./uihingeinteraction.md)
