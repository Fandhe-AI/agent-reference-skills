# UIStackView (Auto Layout)

A view that manages Auto Layout for a collection of arranged subviews along a horizontal or vertical axis. You position the stack view itself; it handles all internal layout.

## Signature / Usage

```swift
@MainActor
class UIStackView : UIView
```

```swift
let stack = UIStackView(arrangedSubviews: [label, textField, button])
stack.axis = .vertical
stack.distribution = .fill
stack.alignment = .fill
stack.spacing = 8
stack.translatesAutoresizingMaskIntoConstraints = false
view.addSubview(stack)

// Only position the stack view; it manages its contents
NSLayoutConstraint.activate([
    stack.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 16),
    stack.leadingAnchor.constraint(equalTo: view.layoutMarginsGuide.leadingAnchor),
    stack.trailingAnchor.constraint(equalTo: view.layoutMarginsGuide.trailingAnchor),
])

// Animate visibility change
UIView.animate(withDuration: 0.25) {
    self.optionalView.isHidden = true
}
```

## Options / Props

### Key properties

| Property | Type | Description |
|----------|------|-------------|
| `axis` | `NSLayoutConstraint.Axis` | `.horizontal` or `.vertical` — the stacking direction |
| `distribution` | `UIStackView.Distribution` | How arranged views are sized along the axis |
| `alignment` | `UIStackView.Alignment` | How arranged views are aligned perpendicular to the axis |
| `spacing` | `CGFloat` | Minimum gap between adjacent arranged views |
| `arrangedSubviews` | `[UIView]` | Ordered array of managed views |
| `isLayoutMarginsRelativeArrangement` | `Bool` | If `true`, pins arranged views to the stack's layout margins instead of edges |

### `UIStackView.Distribution`

| Case | Description |
|------|-------------|
| `.fill` | Resizes one arranged view to fill remaining space |
| `.fillEqually` | Resizes all arranged views to equal size |
| `.fillProportionally` | Resizes proportionally to each view's `intrinsicContentSize` |
| `.equalSpacing` | Preserves intrinsic sizes; equal gaps between views |
| `.equalCentering` | Equal center-to-center spacing; respects minimum `spacing` |

### `UIStackView.Alignment`

| Case | Applicable axis | Description |
|------|----------------|-------------|
| `.fill` | both | Stretches views to fill perpendicular extent |
| `.center` | both | Centers views along the perpendicular axis |
| `.leading` | vertical | Aligns leading edges |
| `.trailing` | vertical | Aligns trailing edges |
| `.top` | horizontal | Aligns top edges |
| `.bottom` | horizontal | Aligns bottom edges |
| `.firstBaseline` | horizontal | Aligns first text baseline |
| `.lastBaseline` | horizontal | Aligns last text baseline |

### Key methods

| Method | Description |
|--------|-------------|
| `addArrangedSubview(_:)` | Appends a view and adds it as a subview if needed |
| `insertArrangedSubview(_:at:)` | Inserts a view at a specific index |
| `removeArrangedSubview(_:)` | Removes from arranged list (does not remove from hierarchy) |
| `setCustomSpacing(_:after:)` | Overrides `spacing` after a specific arranged subview |
| `customSpacing(after:)` | Returns the custom spacing after a specific arranged subview |

## Notes

Available iOS 9.0+, iPadOS 9.0+, Mac Catalyst 13.1+, tvOS 9.0+, visionOS 1.0+. Set `translatesAutoresizingMaskIntoConstraints = false` on the stack view itself, not on its `arrangedSubviews` — UIKit manages those. Setting an arranged subview's `isHidden = true` removes it from the visual layout (animatable) without removing it from `arrangedSubviews`. Baseline alignment works only when a view's height equals its `intrinsicContentSize.height`. Avoid adding constraints directly to arranged subviews that conflict with the stack view's internal constraints.

## Related

- [NSLayoutAnchor](./nslayoutanchor.md)
- [UIView layout (safeAreaLayoutGuide, intrinsicContentSize, hugging/compression)](./uiview-layout.md)
- [UILayoutPriority](./uilayoutpriority.md)
