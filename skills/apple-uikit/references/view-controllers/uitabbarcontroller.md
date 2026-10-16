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
| `bottomAccessory` | `UITabAccessory?` | Optional bottom accessory of the tab bar controller (iOS 26.0+) |
| `tabBarMinimizeBehavior` | `UITabBarController.MinimizeBehavior` | Minimize behavior for the tab bar, if supported (iOS 26.0+) |
| `prominentTabIdentifier` | `String?` | Identifier of the tab displayed as prominent (enhanced visual emphasis, where supported); default `nil`. If `nil` and a `UISearchTab` with `automaticallyActivatesSearch = true` exists, the search tab gets the prominent treatment (iOS 27.0+, iPadOS / Mac Catalyst / visionOS 27.0+) |
| `contentLayoutGuide` | `UILayoutGuide` | Layout area unobscured by the tab bar or sidebar |

## Key Methods

```swift
// Set view controllers with optional animation
setViewControllers(_ viewControllers: [UIViewController]?, animated: Bool)

// Toggle tab bar visibility
setTabBarHidden(_ hidden: Bool, animated: Bool)

// Look up a tab by identifier (iOS 18+)
tab(forIdentifier identifier: String) -> UITab?

// Set the prominent tab with optional animation (iOS 27.0+)
setProminentTabIdentifier(_ identifier: String?, animated: Bool)

// Animates multiple tab changes as a single update (iOS 27.0+)
performBatchUpdates(_ updates: () -> Void)
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
- `performBatchUpdates(_:)` (iOS 27.0+): tab changes made inside the block are coalesced into a single animated layout pass, preventing intermediate states.
- When the tab bar and navigation/toolbar items are both rendered together in the vertical bar (iPhone Duo), `UINavigationItem.verticalBarCompressionBehavior` (iOS 27.1+, `UIVerticalBarCompressionBehavior`: `.automatic` / `.prefersBarItems` / `.prefersTabBar`) controls which items compress first.
- Source: https://developer.apple.com/documentation/uikit/uitabbarcontroller, https://developer.apple.com/documentation/uikit/uinavigationitem

## Related

- [UIViewController](./uiviewcontroller.md)
- [UINavigationController](./uinavigationcontroller.md)
- [Vertical Bar (controls on the vertical axis)](../adaptive-layout/vertical-bar.md)
