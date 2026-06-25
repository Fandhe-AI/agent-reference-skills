# UIStackView

A streamlined interface for laying out a collection of views in a row or column using Auto Layout.

## Signature / Usage

```swift
@MainActor
class UIStackView : UIView

let stack = UIStackView(arrangedSubviews: [label, button])
stack.axis = .vertical
stack.alignment = .fill
stack.distribution = .fill
stack.spacing = 8
parentView.addSubview(stack)

// Pin position; stack view sizes itself to content
NSLayoutConstraint.activate([
    stack.topAnchor.constraint(equalTo: parentView.safeAreaLayoutGuide.topAnchor, constant: 16),
    stack.leadingAnchor.constraint(equalTo: parentView.leadingAnchor, constant: 16),
    stack.trailingAnchor.constraint(equalTo: parentView.trailingAnchor, constant: -16)
])
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `axis` | `NSLayoutConstraint.Axis` | Layout direction (`.horizontal` or `.vertical`) |
| `distribution` | `UIStackView.Distribution` | How arranged views are sized along the axis (`.fill`, `.fillEqually`, `.fillProportionally`, `.equalSpacing`, `.equalCentering`) |
| `alignment` | `UIStackView.Alignment` | Cross-axis alignment (`.fill`, `.leading`, `.center`, `.trailing`, `.firstBaseline`, `.lastBaseline`) |
| `spacing` | `CGFloat` | Points of space between consecutive arranged views |
| `arrangedSubviews` | `[UIView]` | Read-only ordered array of managed views |
| `isLayoutMarginsRelativeArrangement` | `Bool` | Layout relative to margins instead of edges |
| `isBaselineRelativeArrangement` | `Bool` | Uses baselines for first/last spacing |

**Key methods:**

| Method | Description |
|--------|-------------|
| `addArrangedSubview(_:)` | Appends a view to `arrangedSubviews` |
| `insertArrangedSubview(_:at:)` | Inserts at a specific index |
| `removeArrangedSubview(_:)` | Removes from management (view stays in hierarchy, hidden) |
| `setCustomSpacing(_:after:)` | Per-view spacing override after a specific arranged view |
| `customSpacing(after:)` | Returns the custom spacing after a view |

## Notes

- Available iOS 9.0+, iPadOS 9.0+, Mac Catalyst 13.1+, tvOS 9.0+, visionOS 1.0+.
- You must constrain the stack view's position in the superview; the stack manages its content's layout internally.
- `removeArrangedSubview(_:)` keeps the view as a subview but excludes it from layout. Call `removeFromSuperview()` to fully remove it.
- Toggling an arranged subview's `isHidden` is automatically animated when wrapped in `UIView.animate {}`.

## Related

- [UIView](./uiview.md)
- [UIScrollView](./uiscrollview.md)
