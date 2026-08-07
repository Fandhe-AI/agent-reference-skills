# UITab

An object that manages a tab in a tab bar, used with `UITabBarController` for modern tab-bar navigation.

## Signature / Usage

```swift
@MainActor
class UITab : NSObject
```

```swift
let searchTab = UITab(title: "Search", image: UIImage(systemName: "magnifyingglass"), identifier: "search") { tab in
    SearchViewController()
}
tabBarController.tabs = [homeTab, searchTab, profileTab]
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `title` | `String` | A tab's title |
| `subtitle` | `String?` | A tab's subtitle |
| `identifier` | `String` | A string identifier for a tab |
| `image` | `UIImage?` | A tab's image |
| `selectedImage` | `UIImage?` | Alternate image shown when the tab is selected |
| `badgeValue` | `String?` | A tab's badge value |
| `viewController` | `UIViewController?` | The view controller presented when the tab is selected |
| `isHidden` | `Bool` | Whether the item is hidden in a sidebar |
| `isHiddenByDefault` | `Bool` | Whether the item is hidden by default |
| `allowsHiding` | `Bool` | Whether people can hide the tab in a sidebar |
| `isEnabled` | `Bool` | Whether the tab can be selected (default `true`) |
| `preferredPlacement` | `UITab.Placement` | Preferred placement in contexts allowing different placement |
| `hasVisiblePlacement` | `Bool` | Whether the tab has a visible placement |
| `parent` | `UITabGroup?` | The containing tab group |
| `tabBarController` | `UITabBarController?` | The containing tab bar controller |
| `managingTabGroup` | `UITabGroup?` | The root-most tab group with an active managing navigation controller |
| `userInfo` | `Any?` | A custom object associated with the tab |

## Key Initializer

```swift
init(title: String,
     image: UIImage?,
     identifier: String,
     viewControllerProvider: ((UITab) -> UIViewController)?)
```

Creates a tab object; the closure lazily returns the view controller presented when the tab is selected.

## Notes

- iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, tvOS 18.0+, visionOS 2.0+
- Assign an array of `UITab` to `UITabBarController.tabs` for the modern (iOS 18+) tab-bar API, as an alternative to the older `viewControllers` array.
- `UISearchTab` is a subclass specialized for search functionality.
- `UITabGroup` groups related tabs together (e.g. for sidebar sections on iPad).

## Related

- [UITabBarController](./uitabbarcontroller.md)
