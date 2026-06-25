# UIView Auto Layout Properties

Key `UIView` properties used in Auto Layout: system layout guides, intrinsic content size, and content sizing priorities.

## Signature / Usage

```swift
// Always disable autoresizing mask translation for programmatically created views
subview.translatesAutoresizingMaskIntoConstraints = false

// Pin to safe area (avoids notch, home indicator, bars)
subview.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor).isActive = true

// Pin to layout margins
subview.leadingAnchor.constraint(equalTo: view.layoutMarginsGuide.leadingAnchor).isActive = true

// Override intrinsic size in a custom view
override var intrinsicContentSize: CGSize {
    return CGSize(width: UIView.noIntrinsicMetric, height: 44)
}

// Resist growing beyond intrinsic width
label.setContentHuggingPriority(.defaultHigh, for: .horizontal)

// Resist shrinking below intrinsic width
label.setContentCompressionResistancePriority(.required, for: .horizontal)
```

## Options / Props

### `translatesAutoresizingMaskIntoConstraints`

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `translatesAutoresizingMaskIntoConstraints` | `Bool` | `true` for programmatic views; `false` in IB | When `true`, autoresizing mask generates implicit constraints that conflict with explicit Auto Layout constraints |

### Layout guides

| Property | Type | Availability | Description |
|----------|------|-------------|-------------|
| `safeAreaLayoutGuide` | `UILayoutGuide` | iOS 11.0+ | Area not obscured by bars, notch, or home indicator |
| `layoutMarginsGuide` | `UILayoutGuide` | iOS 9.0+ | Guide representing the view's `layoutMargins` insets |
| `readableContentGuide` | `UILayoutGuide` | iOS 9.0+ | Optimal readable-width region for text |

### Intrinsic content size

| Member | Type | Description |
|--------|------|-------------|
| `intrinsicContentSize` | `CGSize` | Natural size based on content; override in custom views |
| `UIView.noIntrinsicMetric` | `CGFloat` (-1) | Use when a dimension has no intrinsic value |
| `invalidateIntrinsicContentSize()` | method | Call when content changes require a new intrinsic size calculation |

### Content sizing priorities

| Method | Description |
|--------|-------------|
| `contentHuggingPriority(for:) -> UILayoutPriority` | Priority with which the view resists growing beyond `intrinsicContentSize` |
| `setContentHuggingPriority(_:for:)` | Sets hugging priority for the given axis |
| `contentCompressionResistancePriority(for:) -> UILayoutPriority` | Priority with which the view resists shrinking below `intrinsicContentSize` |
| `setContentCompressionResistancePriority(_:for:)` | Sets compression resistance priority for the given axis |

Parameter `for axis: NSLayoutConstraint.Axis` accepts `.horizontal` or `.vertical`.

## Notes

`safeAreaLayoutGuide` is available iOS 11.0+, all others iOS 6.0+/9.0+ as noted. `safeAreaLayoutGuide` edges equal the view's edges when the view is not in a hierarchy or is fully within the safe area. For root view controllers, the safe area accommodates the status bar and `additionalSafeAreaInsets`. Do not set `translatesAutoresizingMaskIntoConstraints = false` inside a custom view's own initializer on `self`; only the containing view/controller should set it on subviews. Views managed by UIKit (table view cells, stack view arranged subviews, `UIViewController.view`) should not have this property modified.

## Related

- [UILayoutGuide](./uilayoutguide.md)
- [UILayoutPriority](./uilayoutpriority.md)
- [NSLayoutAnchor](./nslayoutanchor.md)
- [UIStackView (Auto Layout)](./uistackview-autolayout.md)
