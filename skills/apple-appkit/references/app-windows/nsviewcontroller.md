# NSViewController

A controller that manages a view, typically loaded from a nib file.

## Signature / Usage

```swift
@MainActor
class NSViewController : NSResponder

// From nib
let vc = MyViewController(nibName: "MyViewController", bundle: nil)

// Typical override
class MyViewController: NSViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        // configure view
    }
}
```

## Options / Props

| Name / Method | Type | Description |
|---------------|------|-------------|
| `view` | `NSView` | The controller's primary view; accessing it triggers loading if needed |
| `isViewLoaded` | `Bool` | `true` once the view has been loaded into memory |
| `title` | `String?` | Localized title of the primary view |
| `representedObject` | `Any?` | Model object whose value is presented in the view |
| `nibName` / `nibBundle` | `NSNib.Name?` / `Bundle?` | Nib file location |
| `storyboard` | `NSStoryboard?` | The storyboard the controller was instantiated from |
| `children` | `[NSViewController]` | Child view controllers in the hierarchy |
| `parent` | `NSViewController?` | The parent controller |
| `presentingViewController` | `NSViewController?` | The controller that presented this one |
| `presentedViewControllers` | `[NSViewController]?` | Currently presented child controllers |
| `preferredContentSize` | `NSSize` | Preferred size; used when presented as a sheet or popover |
| `loadView()` | override | Load the view; override to create a view programmatically instead of from nib |
| `viewDidLoad()` | override | Called once after the view loads; use for one-time setup |
| `viewWillAppear()` | override | Called each time before the view enters the hierarchy |
| `viewDidAppear()` | override | Called after the view is fully on screen |
| `viewWillDisappear()` | override | Called before the view is removed |
| `viewDidDisappear()` | override | Called after the view has been removed |
| `viewWillLayout()` / `viewDidLayout()` | override | Layout lifecycle hooks |
| `addChild(_:)` | method | Add a child view controller |
| `removeFromParent()` | method | Remove self from parent |
| `presentAsSheet(_:)` | method | Present another controller as a sheet |
| `presentAsModalWindow(_:)` | method | Present as a modal window |
| `present(_:asPopoverRelativeTo:of:preferredEdge:behavior:)` | method | Present as a popover |
| `dismiss(_:)` | method | Dismiss a presented controller |

## Notes

- macOS 10.5+. View lifecycle methods (`viewWillAppear`, etc.) available from macOS 10.10+.
- In macOS 10.10+, the framework automatically looks for a nib file whose name matches the class name; override `nibName` to return a different name.
- Participates in the responder chain; you can implement action methods directly in a view controller.

## Related

- [NSWindowController](./nswindowcontroller.md)
- [NSWindow](./nswindow.md)
- [NSResponder](./nsresponder.md)
