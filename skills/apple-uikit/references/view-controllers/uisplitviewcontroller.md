# UISplitViewController

A container view controller that implements a hierarchical interface with multiple columns.

## Signature / Usage

```swift
@MainActor
class UISplitViewController : UIViewController
```

```swift
let splitVC = UISplitViewController(style: .doubleColumn)
splitVC.setViewController(SidebarViewController(), for: .primary)
splitVC.setViewController(DetailViewController(), for: .secondary)
window.rootViewController = splitVC
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `style` | `UISplitViewController.Style` | Number of columns: `.unspecified`, `.doubleColumn`, or `.tripleColumn` |
| `viewControllers` | `[UIViewController]` | Array of managed child view controllers |
| `displayMode` | `UISplitViewController.DisplayMode` | Current arrangement of the interface |
| `preferredDisplayMode` | `UISplitViewController.DisplayMode` | Preferred arrangement of the interface |
| `isCollapsed` | `Bool` | `true` when only one child view controller is displayed |
| `splitBehavior` | `UISplitViewController.SplitBehavior` | Current behavior for how columns appear |
| `preferredSplitBehavior` | `UISplitViewController.SplitBehavior` | Preferred split behavior |
| `presentsWithGesture` | `Bool` | Whether a swipe gesture can reveal the primary view |
| `showsSecondaryOnlyButton` | `Bool` | Whether secondary view shows a toggle button |
| `primaryEdge` | `UISplitViewController.PrimaryEdge` | Side on which the primary column sits |
| `delegate` | `UISplitViewControllerDelegate?` | Delegate for responding to interface changes |

## Column Management

```swift
// Set a view controller for a column
setViewController(_ viewController: UIViewController?, for column: Column)

// Get the view controller for a column
viewController(for column: Column) -> UIViewController?

// Show or hide a column
show(_ column: Column)
hide(_ column: Column)
isShowing(_ column: Column) -> Bool
```

## Column Values

| Column | Description |
|--------|-------------|
| `.primary` | The primary (sidebar) column |
| `.supplementary` | The supplementary column (triple-column only) |
| `.secondary` | The secondary (detail) column |
| `.compact` | The collapsed single-column interface |

## Notes

- iOS 3.2+, iPadOS 3.2+, Mac Catalyst 13.1+, visionOS 1.0+; not available on tvOS.
- Typically used as the root view controller of the app's window.
- The split view controller has no significant visual appearance of its own; appearance is defined by child view controllers.
- Use `.doubleColumn` for master-detail; `.tripleColumn` for sidebar + content + detail.

## Related

- [UIViewController](./uiviewcontroller.md)
- [UINavigationController](./uinavigationcontroller.md)
