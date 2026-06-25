# UITabBarController

A container view controller that manages a multiselection interface, where the selection determines which child view controller to display.

## Signature / Usage

```swift
@MainActor
class UITabBarController : UIViewController
```

```swift
let tabBarController = UITabBarController()
tabBarController.viewControllers = [homeVC, searchVC, profileVC]
window.rootViewController = tabBarController
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `viewControllers` | `[UIViewController]?` | Root view controllers for each tab |
| `selectedViewController` | `UIViewController?` | Currently selected view controller |
| `selectedIndex` | `Int` | Index of the currently selected tab |
| `tabBar` | `UITabBar` | The tab bar view associated with this controller |
| `delegate` | `UITabBarControllerDelegate?` | Delegate for customizing tab selection behavior |
| `customizableViewControllers` | `[UIViewController]?` | Subset of view controllers that can be rearranged |
| `moreNavigationController` | `UINavigationController` | Navigation controller for the More interface |
| `isTabBarHidden` | `Bool` | Whether the active tab bar is currently hidden |
| `bottomAccessory` | `UIView?` | Optional accessory view below the tab bar |
| `contentLayoutGuide` | `UILayoutGuide` | Layout area unobscured by the tab bar or sidebar |

## Key Methods

```swift
// Set view controllers with optional animation
setViewControllers(_ viewControllers: [UIViewController]?, animated: Bool)

// Toggle tab bar visibility
setTabBarHidden(_ hidden: Bool, animated: Bool)

// Look up a tab by identifier (iOS 18+)
tab(forIdentifier identifier: String) -> UITab?
```

## UITabBarControllerDelegate

Implement to:
- Prevent selection of specific tabs (`tabBarController(_:shouldSelect:)`)
- Perform tasks when a tab is selected (`tabBarController(_:didSelect:)`)
- Monitor changes made by the More navigation interface

## Notes

- iOS 2.0+, iPadOS 2.0+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+
- When more than 5 view controllers are set, the tab bar displays the first 4 and a "More" item automatically.
- Tab customization and the More interface are not available in tvOS.
- Typically used as the root view controller of the app's window.

## Related

- [UIViewController](./uiviewcontroller.md)
- [UINavigationController](./uinavigationcontroller.md)
