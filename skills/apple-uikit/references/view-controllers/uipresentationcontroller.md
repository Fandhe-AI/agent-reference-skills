# UIPresentationController

An object that manages the transition animations and the presentation of view controllers onscreen.

## Signature / Usage

```swift
@MainActor
class UIPresentationController : NSObject
```

Vended through the transitioning delegate when `modalPresentationStyle` is `.custom`:

```swift
class MyTransitioningDelegate: NSObject, UIViewControllerTransitioningDelegate {
    func presentationController(
        forPresented presented: UIViewController,
        presenting: UIViewController?,
        source: UIViewController
    ) -> UIPresentationController? {
        return MyPresentationController(presentedViewController: presented, presenting: presenting)
    }
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `presentedViewController` | `UIViewController` | The view controller being presented |
| `presentingViewController` | `UIViewController` | The view controller that is presenting |
| `containerView` | `UIView?` | The view in which the presentation occurs |
| `delegate` | `UIAdaptivePresentationControllerDelegate?` | Delegate for adaptive presentations |
| `frameOfPresentedViewInContainerView` | `CGRect` | Frame to assign to the presented view at the end of animations |
| `presentationStyle` | `UIModalPresentationStyle` | The presentation style of the presented view controller |
| `adaptivePresentationStyle` | `UIModalPresentationStyle` | Style used when the environment becomes horizontally compact |

## Lifecycle Methods to Override

```swift
// Presentation
func presentationTransitionWillBegin()
func presentationTransitionDidEnd(_ completed: Bool)

// Dismissal
func dismissalTransitionWillBegin()
func dismissalTransitionDidEnd(_ completed: Bool)

// Layout
func containerViewWillLayoutSubviews()
func containerViewDidLayoutSubviews()
func viewWillTransition(to size: CGSize, with coordinator: UIViewControllerTransitionCoordinator)
```

## Initializer

```swift
init(presentedViewController: UIViewController, presenting presentingViewController: UIViewController?)
```

## Notes

- iOS 8.0+, iPadOS 8.0+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+
- Manages three phases: presentation (moving onscreen), management (responding to environment changes), and dismissal (moving offscreen).
- For custom presentations, subclass `UIPresentationController` and return it from `UIViewControllerTransitioningDelegate`.
- Use `transitionCoordinator` from the presenting view controller to synchronize custom animations with the transition.

## Related

- [UISheetPresentationController](./uisheetpresentationcontroller.md)
- [UIViewController](./uiviewcontroller.md)
- [View Controller Presentation](./viewcontroller-presentation.md)
