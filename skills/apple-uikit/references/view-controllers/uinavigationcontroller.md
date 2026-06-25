# UINavigationController

A container view controller that manages a stack-based scheme for navigating hierarchical content.

## Signature / Usage

```swift
@MainActor
class UINavigationController : UIViewController
```

```swift
let rootVC = HomeViewController()
let navController = UINavigationController(rootViewController: rootVC)
window.rootViewController = navController
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `viewControllers` | `[UIViewController]` | All view controllers on the navigation stack |
| `topViewController` | `UIViewController?` | View controller at the top of the stack |
| `visibleViewController` | `UIViewController?` | Currently visible view controller (may differ from top during transitions) |
| `navigationBar` | `UINavigationBar` | The managed navigation bar |
| `toolbar` | `UIToolbar!` | Optional toolbar displayed below the navigation bar |
| `delegate` | `UINavigationControllerDelegate?` | Delegate for custom behavior and animations |
| `hidesBarsOnTap` | `Bool` | Hides bars when user taps |
| `hidesBarsOnSwipe` | `Bool` | Hides bars when user swipes up |
| `hidesBarsWhenKeyboardAppears` | `Bool` | Hides bars when keyboard appears |
| `hidesBarsWhenVerticallyCompact` | `Bool` | Hides bars in compact height environments |

## Key Methods

```swift
// Push a view controller onto the stack
pushViewController(_ viewController: UIViewController, animated: Bool)

// Pop the top view controller
popViewController(animated: Bool) -> UIViewController?

// Pop to the root view controller
popToRootViewController(animated: Bool) -> [UIViewController]?

// Pop to a specific view controller
popToViewController(_ viewController: UIViewController, animated: Bool) -> [UIViewController]?

// Replace entire stack
setViewControllers(_ viewControllers: [UIViewController], animated: Bool)

// Show/hide bars
setNavigationBarHidden(_ hidden: Bool, animated: Bool)
setToolbarHidden(_ hidden: Bool, animated: Bool)
```

## Initializers

```swift
init(rootViewController: UIViewController)
init(navigationBarClass: AnyClass?, toolbarClass: AnyClass?)
```

## Notes

- iOS 2.0+, iPadOS 2.0+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+
- Do not directly modify the navigation bar's `frame`, `bounds`, or `alpha`.
- Content view controllers automatically receive a `navigationItem` property for configuring bar buttons and title.
- Set `restorationIdentifier` to preserve the navigation stack across launches.

## Related

- [UIViewController](./uiviewcontroller.md)
- [View Controller Presentation](./viewcontroller-presentation.md)
