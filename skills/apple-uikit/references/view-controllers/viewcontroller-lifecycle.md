# View Controller Lifecycle

The sequence of method calls UIKit makes as a view controller's view is created, appears, disappears, and is destroyed.

## Signature / Usage

```swift
class MyViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        // One-time setup: configure subviews, load data
    }

    override func viewIsAppearing(_ animated: Bool) {
        super.viewIsAppearing(animated)
        // Update content; trait collection and layout geometry are current here
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        // Start animations, begin network requests
    }

    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        // Commit edits, save state
    }
}
```

## Appearance Sequence

| Order | Method | Notes |
|-------|--------|-------|
| 1 | `viewDidLoad()` | Called once after the view hierarchy is created |
| 2 | `viewWillAppear(_:)` | Called at the start of the appearance transition |
| 3 | `viewIsAppearing(_:)` | Called when the view is appearing; trait collection and frame are accurate |
| 4 | `viewWillLayoutSubviews()` | Called before each Auto Layout pass |
| 5 | `viewDidLayoutSubviews()` | Called after each Auto Layout pass |
| 6 | `viewDidAppear(_:)` | Called after the transition animation completes |
| 7 | `viewWillDisappear(_:)` | Called before the disappearance transition starts |
| 8 | `viewDidDisappear(_:)` | Called after the view has disappeared |

## View Loading

Views load lazily when the `view` property is first accessed. Three ways to provide views:

```swift
// 1. Storyboard (automatic)
let vc = storyboard?.instantiateViewController(withIdentifier: "MyVC")

// 2. Nib file
let vc = MyViewController(nibName: "MyView", bundle: nil)

// 3. Programmatic (override loadView)
override func loadView() {
    self.view = MyCustomView()
}
```

## Memory Warning

```swift
override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
    // Release unneeded cached data or resources
}
```

## Containment Callbacks

Called when a view controller is added to or removed from a parent container:

```swift
override func willMove(toParent parent: UIViewController?) { }
override func didMove(toParent parent: UIViewController?) { }
```

## Notes

- iOS 2.0+, iPadOS 2.0+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+
- Always call `super` in every lifecycle override.
- `viewDidLoad()` is called only once; do not perform animations or view updates there.
- `viewIsAppearing(_:)` (iOS 16.0+) is the preferred place to update content that depends on trait collection or geometry.
- `viewWillLayoutSubviews()` and `viewDidLayoutSubviews()` may be called multiple times per appearance.

## Related

- [UIViewController](./uiviewcontroller.md)
- [View Controller Presentation](./viewcontroller-presentation.md)
