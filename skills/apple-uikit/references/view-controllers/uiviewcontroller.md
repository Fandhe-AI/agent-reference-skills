# UIViewController

An object that manages a view hierarchy for your UIKit app.

## Signature / Usage

```swift
@MainActor
class UIViewController
```

Subclass `UIViewController` to define your app's screens. You rarely instantiate it directly.

```swift
class MyViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        // One-time setup
    }
}
```

## View Lifecycle

| Method | When Called |
|--------|-------------|
| `viewDidLoad()` | After view hierarchy is created; use for one-time setup |
| `viewWillAppear(_:)` | Before the view appears; prepare UI |
| `viewIsAppearing(_:)` | View is appearing; trait collection and geometry are up-to-date |
| `viewDidAppear(_:)` | After view appears; start animations or network requests |
| `viewWillDisappear(_:)` | Before view disappears; save state |
| `viewDidDisappear(_:)` | After view disappears; cleanup |
| `viewWillLayoutSubviews()` | Before Auto Layout pass |
| `viewDidLayoutSubviews()` | After Auto Layout pass |

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `view` | `UIView!` | The root view the controller manages |
| `viewIfLoaded` | `UIView?` | Access the view without triggering load |
| `isViewLoaded` | `Bool` | Whether the view is currently loaded |
| `title` | `String?` | Localized title shown in navigation bar or tab bar |
| `preferredContentSize` | `CGSize` | Preferred size for popover/sheet presentations |
| `modalPresentationStyle` | `UIModalPresentationStyle` | How the controller is presented modally |
| `modalTransitionStyle` | `UIModalTransitionStyle` | Transition animation for modal presentation |
| `isModalInPresentation` | `Bool` | Prevents dismissal via gestures when `true` |
| `children` | `[UIViewController]` | Child view controllers |
| `parent` | `UIViewController?` | Parent container view controller |
| `presentingViewController` | `UIViewController?` | The VC that presented this one modally |
| `presentedViewController` | `UIViewController?` | The VC currently presented by this one |
| `navigationController` | `UINavigationController?` | Nearest ancestor navigation controller |
| `tabBarController` | `UITabBarController?` | Nearest ancestor tab bar controller |
| `splitViewController` | `UISplitViewController?` | Nearest ancestor split view controller |
| `transitioningDelegate` | `UIViewControllerTransitioningDelegate?` | Provider of custom transition animators |

## Presentation Methods

```swift
// Modal presentation
present(_ viewControllerToPresent: UIViewController, animated: Bool, completion: (() -> Void)?)
dismiss(animated: Bool, completion: (() -> Void)?)

// Context-aware (pushes in nav stack, falls back to modal)
show(_ viewController: UIViewController, sender: Any?)
showDetailViewController(_ viewController: UIViewController, sender: Any?)
```

## Child View Controller Management

```swift
// Add a child
addChild(childVC)
view.addSubview(childVC.view)
childVC.didMove(toParent: self)

// Remove a child
childVC.willMove(toParent: nil)
childVC.view.removeFromSuperview()
childVC.removeFromParent()
```

## Notes

- iOS 2.0+, iPadOS 2.0+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+
- Views load lazily on first access to the `view` property.
- A view controller is the sole owner of its views; do not share views between controllers.
- Inserted into the responder chain between its root view and the root view's superview.

## Related

- [UINavigationController](./uinavigationcontroller.md)
- [UITabBarController](./uitabbarcontroller.md)
- [UISplitViewController](./uisplitviewcontroller.md)
- [UIPresentationController](./uipresentationcontroller.md)
- [View Controller Lifecycle](./viewcontroller-lifecycle.md)
- [View Controller Presentation](./viewcontroller-presentation.md)
