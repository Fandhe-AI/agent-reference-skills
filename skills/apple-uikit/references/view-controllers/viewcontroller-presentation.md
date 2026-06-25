# View Controller Presentation

Techniques for showing and hiding view controllers, and choosing the right approach for each context.

## Signature / Usage

```swift
// Modal presentation
present(viewControllerToPresent, animated: true, completion: nil)
dismiss(animated: true, completion: nil)

// Context-aware (adapts to container type)
show(viewController, sender: self)
showDetailViewController(viewController, sender: self)
```

## Presentation Techniques

| Technique | When to Use |
|-----------|-------------|
| Storyboard segues | Visual, easily configurable transitions defined in Interface Builder |
| `show(_:sender:)` | Reusable view controllers that adapt to navigation or modal context |
| `present(_:animated:completion:)` | Explicit modal presentation |
| Container APIs | `UINavigationController`, `UITabBarController`, `UISplitViewController`, `UIPageViewController` |

## Modal Presentation Styles

Set via `viewController.modalPresentationStyle`:

| Style | Description |
|-------|-------------|
| `.automatic` | System chooses; defaults to `.pageSheet` on iPhone |
| `.fullScreen` | Covers the entire screen |
| `.pageSheet` | Sheet that partially covers underlying content |
| `.formSheet` | Smaller sheet for forms (iPad) |
| `.popover` | Anchored popover (iPad) |
| `.overFullScreen` | Full screen without removing the presenting view |
| `.custom` | Custom presentation via `UIPresentationController` |

## Modal Transition Styles

Set via `viewController.modalTransitionStyle`:

| Style | Description |
|-------|-------------|
| `.coverVertical` | Slides up from bottom (default) |
| `.crossDissolve` | Cross-fade |
| `.flipHorizontal` | Horizontal flip |
| `.partialCurl` | Page-curl (full-screen only) |

## Custom Transition

```swift
let vc = MyViewController()
vc.modalPresentationStyle = .custom
vc.transitioningDelegate = myTransitioningDelegate
present(vc, animated: true)
```

## Dismissal

```swift
// From the presented view controller
dismiss(animated: true)

// Check context to determine correct dismissal
if let nav = navigationController {
    nav.popViewController(animated: true)
} else {
    dismiss(animated: true)
}
```

## Preventing Gesture Dismissal

```swift
vc.isModalInPresentation = true   // Blocks pull-to-dismiss
```

## Notes

- iOS 2.0+, iPadOS 2.0+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+
- `show(_:sender:)` searches ancestor view controllers for an implementation; `UINavigationController` pushes; no parent falls back to modal.
- Prefer `show(_:sender:)` over `present(_:animated:completion:)` when the view controller may be embedded in different containers.
- `dismiss(animated:completion:)` on a non-presenting view controller is forwarded up the hierarchy to the nearest presenter.

## Related

- [UIViewController](./uiviewcontroller.md)
- [UINavigationController](./uinavigationcontroller.md)
- [UIPresentationController](./uipresentationcontroller.md)
- [UISheetPresentationController](./uisheetpresentationcontroller.md)
- [View Controller Lifecycle](./viewcontroller-lifecycle.md)
