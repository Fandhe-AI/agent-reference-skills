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
| `contentUnavailableConfiguration` | `(any UIContentConfiguration)?` | Configuration describing the empty/unavailable state to display; typically a `UIContentUnavailableConfiguration` (iOS 17+) |
| `preferredTransition` | `UIViewController.Transition?` | Transition animation to use when presenting the view controller (iOS 18+) |
| `traitOverrides` | `UITraitOverrides` | Overrides trait values (e.g. `traitOverrides.userInterfaceStyle`) for the view controller's trait environment (iOS 17+) |
| `tab` | `UITab?` | The `UITab` instance used to create this view controller when added to a tab-based `UITabBarController`; `nil` by default (iOS 18+) |
| `ornaments` | `[UIOrnament]` | SwiftUI ornaments to display adjacent to the view controller (visionOS only) |
| `arrangementViewController` | `UIArrangementViewController?` | The nearest ancestor arrangement view controller (iOS 27.1+, get-only) |
| `preferredVerticalBarBehavior` | `UIVerticalBarBehavior` | The vertical bar behavior this view controller prefers; override to return `.disabled` to opt out of the vertical bar, default is `.automatic` (iOS 27.1+, get-only) |
| `childForPreferredVerticalBarBehavior` | `UIViewController?` | Which child view controller, if any, controls the vertical bar behavior; return `nil` to use this controller's own configuration (iOS 27.1+, get-only) |

## Vertical Bar and Scene Accessory Methods

```swift
// iOS 27.1+: signal that the preferred vertical bar configuration changed
func setNeedsUpdateOfVerticalBarConfiguration()

// iOS 27.0+ (iOS / iPadOS / Mac Catalyst): scene accessories
func registerSceneAccessory(_ accessory: UISceneAccessory) -> UISceneAccessoryRegistration
func unregisterSceneAccessory(_ registration: UISceneAccessoryRegistration)
```

## Content Unavailable State (iOS 17+)

```swift
override func updateContentUnavailableConfiguration(using state: UIContentUnavailableConfigurationState) {
    if isLoading {
        contentUnavailableConfiguration = UIContentUnavailableConfiguration.loading()
    } else if items.isEmpty {
        contentUnavailableConfiguration = UIContentUnavailableConfiguration.empty()
    } else {
        contentUnavailableConfiguration = nil
    }
}
```

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
- `contentUnavailableConfiguration` (iOS 17+) mirrors the `UIContentConfiguration` pattern used by cells; prefer overriding `updateContentUnavailableConfiguration(using:)` and calling `setNeedsUpdateContentUnavailableConfiguration()` over setting the property directly.
- `preferredTransition` (iOS 18+) works with `UIViewController.Transition` (e.g. `.zoom(options:sourceViewProvider:)`) to drive fluid transition animations between view controllers.
- `traitOverrides` (iOS 17+) is the modern replacement for overriding `traitCollection` directly; it conforms to `UIMutableTraits` and is also available on `UIWindowScene`, `UIWindow`, `UIView`, and `UIPresentationController`.
- `tab` (iOS 18+) is populated automatically when the view controller is supplied via `UITab`/`UISearchTab` for the new tab-based `UITabBarController` navigation model.
- `ornaments` is visionOS-only; it has no effect on iOS/iPadOS/tvOS/Mac Catalyst.
- Starting in iOS 27, iPadOS 27, Mac Catalyst 27, tvOS 27 and visionOS 27, apps built with the latest SDK must adopt the scene-based life cycle or they fail to launch. See the scene-based life cycle page.
- `preferredVerticalBarBehavior`: opt out only for UIs better served by horizontal bars (for example a fullscreen video player with toolbar controls, or a non-scrolling layout such as a calculator). Treat it as a stable choice and do not toggle it as a function of a single view's state. Call `setNeedsUpdateOfVerticalBarConfiguration()` after changing state that affects `preferredVerticalBarBehavior` or `childForPreferredVerticalBarBehavior`.
- `childForPreferredVerticalBarBehavior`: `UINavigationController` forwards to its top view controller and `UITabBarController` to its selected view controller by default.
- `registerSceneAccessory(_:)` returns a registration used to monitor the accessory or unregister it; the delegate type defined by the configuration receives all lifecycle events. `unregisterSceneAccessory(_:)` dismisses the accessory if it is currently presented.
- Source: https://developer.apple.com/documentation/uikit/uiviewcontroller

## Related

- [UINavigationController](./uinavigationcontroller.md)
- [UITabBarController](./uitabbarcontroller.md)
- [UISplitViewController](./uisplitviewcontroller.md)
- [UIPresentationController](./uipresentationcontroller.md)
- [View Controller Lifecycle](./viewcontroller-lifecycle.md)
- [View Controller Presentation](./viewcontroller-presentation.md)
- [UIArrangementViewController](../adaptive-layout/uiarrangementviewcontroller.md)
- [Vertical Bar (controls on the vertical axis)](../adaptive-layout/vertical-bar.md)
- [Transitioning to the UIKit Scene-Based Life Cycle](./scene-based-life-cycle.md)
- [UISceneAccessory](./uisceneaccessory.md)
