# UILayoutPriority

A value type representing the importance of a layout constraint. Used to resolve conflicts when the layout system cannot satisfy all constraints simultaneously.

## Signature / Usage

```swift
struct UILayoutPriority : RawRepresentable
```

```swift
// Make a width constraint slightly less than required so it can yield under pressure
let c = view.widthAnchor.constraint(equalToConstant: 200)
c.priority = UILayoutPriority(999)
c.isActive = true

// Prefer content hugging over compression resistance
label.setContentHuggingPriority(.defaultHigh, for: .horizontal)
label.setContentCompressionResistancePriority(.required, for: .horizontal)
```

## Options / Props

### Built-in static values

| Property | Raw Value | Description |
|----------|-----------|-------------|
| `.required` | 1000 | Constraint must be satisfied; unsatisfied required constraint = layout error |
| `.defaultHigh` | 750 | Default compression resistance priority for buttons |
| `.defaultLow` | 250 | Default content hugging priority for buttons |
| `.fittingSizeLevel` | 50 | Priority used during `systemLayoutSizeFitting(_:)` calculations |
| `.dragThatCanResizeScene` | — | For window resize drags (Mac Catalyst / visionOS) |
| `.sceneSizeStayPut` | — | Resistance to scene size change |

## Notes

Available iOS 6.0+, iPadOS 6.0+, Mac Catalyst 13.1+, tvOS 9.0+, visionOS 1.0+. Valid range is `1`–`1000`; values outside this range are clamped. Required constraints (1000) cannot be broken — the layout engine logs an error and breaks one arbitrarily. Optional constraints below 1000 are satisfied in descending priority order. Setting a constraint's priority to 0 is not valid; deactivate the constraint instead.

## Related

- [NSLayoutConstraint](./nslayoutconstraint.md)
- [UIView layout (contentHuggingPriority, contentCompressionResistancePriority)](./uiview-layout.md)
