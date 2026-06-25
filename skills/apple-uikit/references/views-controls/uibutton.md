# UIButton

A control that executes custom code in response to user interactions.

## Signature / Usage

```swift
@MainActor
class UIButton : UIControl

// Modern configuration-based API (iOS 15+)
var config = UIButton.Configuration.filled()
config.title = "Confirm"
let button = UIButton(configuration: config, primaryAction: UIAction { _ in
    print("tapped")
})

// Traditional API
let button = UIButton(type: .system)
button.setTitle("Tap Me", for: .normal)
button.addTarget(self, action: #selector(handleTap), for: .touchUpInside)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `configuration` | `UIButton.Configuration?` | Visual configuration object (iOS 15+) |
| `buttonType` | `UIButton.ButtonType` | The button style set at creation time (read-only) |
| `titleLabel` | `UILabel?` | Label displaying the button title |
| `imageView` | `UIImageView?` | Image view for the button image |
| `currentTitle` | `String?` | Title for the current state |
| `currentImage` | `UIImage?` | Image for the current state |
| `isEnabled` | `Bool` | Inherited from `UIControl`; disables interactions when `false` |
| `menu` | `UIMenu?` | Context menu attached to the button |
| `changesSelectionAsPrimaryAction` | `Bool` | Toggle behavior for selection state |
| `role` | `UIButton.Role` | Semantic role (`.normal`, `.primary`, `.cancel`, `.destructive`) |

**State-based setters:**

| Method | Description |
|--------|-------------|
| `setTitle(_:for:)` | Title string per control state |
| `setImage(_:for:)` | Foreground image per state |
| `setBackgroundImage(_:for:)` | Background image per state |
| `setTitleColor(_:for:)` | Title color per state |
| `setAttributedTitle(_:for:)` | Attributed title per state |

## Notes

- Available iOS 2.0+, iPadOS 2.0+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+.
- Prefer `UIButton.Configuration` (iOS 15+) over deprecated `contentEdgeInsets`, `titleEdgeInsets`, `imageEdgeInsets`.
- On Mac Catalyst with `buttonType == .system` and idiom `.mac`, calling `addGestureRecognizer(_:)` throws an exception.
- Use `automaticallyUpdatesConfiguration = true` (default) so the button refreshes its configuration when state changes.

## Related

- [UIControl](./uicontrol.md)
- [UIView](./uiview.md)
