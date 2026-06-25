# UIPageViewController

A container view controller that manages navigation between pages of content, where a subview controller manages each page.

## Signature / Usage

```swift
@MainActor
class UIPageViewController : UIViewController
```

```swift
let pageVC = UIPageViewController(
    transitionStyle: .scroll,
    navigationOrientation: .horizontal,
    options: nil
)
pageVC.dataSource = self
pageVC.setViewControllers([firstPage], direction: .forward, animated: false)
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `dataSource` | `UIPageViewControllerDataSource?` | Provides view controllers for gesture-based navigation |
| `delegate` | `UIPageViewControllerDelegate?` | Receives notifications about transitions and orientation changes |
| `viewControllers` | `[UIViewController]?` | Currently displayed view controllers |
| `transitionStyle` | `TransitionStyle` | Animation style: `.pageCurl` or `.scroll` |
| `navigationOrientation` | `NavigationOrientation` | Direction of navigation: `.horizontal` or `.vertical` |
| `spineLocation` | `SpineLocation` | Spine position for double-sided layouts: `.min`, `.mid`, or `.max` |
| `isDoubleSided` | `Bool` | Whether content appears on the back of pages |
| `gestureRecognizers` | `[UIGestureRecognizer]` | Built-in gesture recognizers for page navigation |

## Key Methods

```swift
// Set the currently displayed page(s)
setViewControllers(
    _ viewControllers: [UIViewController]?,
    direction: NavigationDirection,
    animated: Bool,
    completion: ((Bool) -> Void)?
)
```

## UIPageViewControllerDataSource

```swift
// Return the view controller before the given one
func pageViewController(
    _ pageViewController: UIPageViewController,
    viewControllerBefore viewController: UIViewController
) -> UIViewController?

// Return the view controller after the given one
func pageViewController(
    _ pageViewController: UIPageViewController,
    viewControllerAfter viewController: UIViewController
) -> UIViewController?
```

## Notes

- iOS 5.0+, iPadOS 5.0+, Mac Catalyst 13.1+, tvOS 5.0+, visionOS 1.0+
- In tvOS, only full-screen content page swiping is supported; users cannot move focus between items on a page.
- Implement `UIPageViewControllerDataSource` to support gesture-based navigation; without a data source, you must call `setViewControllers(_:direction:animated:completion:)` manually.

## Related

- [UIViewController](./uiviewcontroller.md)
