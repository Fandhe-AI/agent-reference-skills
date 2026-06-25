# ProgressView

A view that shows the progress toward completion of a task.

## Signature / Usage

```swift
nonisolated struct ProgressView<Label, CurrentValueLabel> where Label : View, CurrentValueLabel : View
```

```swift
// Indeterminate spinner
ProgressView()

// Determinate bar
@State private var progress = 0.4
ProgressView(value: progress)

// With label
ProgressView(value: progress, total: 1.0) {
    Text("Downloading...")
} currentValueLabel: {
    Text("\(Int(progress * 100))%")
}
```

## Options / Props

| Initializer | Description |
|---|---|
| `init()` | Indeterminate indicator without label |
| `init(label:)` | Indeterminate indicator with custom label |
| `init(_:)` | Indeterminate with string/localized label |
| `init(value:total:)` | Determinate; `total` defaults to `1.0` |
| `init(value:total:label:)` | Determinate with label |
| `init(value:total:label:currentValueLabel:)` | Determinate with label and current-value label |
| `init(timerInterval:countsDown:)` | Progress spanning a `ClosedRange<Date>` |
| `init(timerInterval:countsDown:label:)` | Timer-based with label |

### Key modifiers

| Modifier | Description |
|---|---|
| `progressViewStyle(_:)` | `.automatic`, `.linear`, `.circular` |

## Notes

- Available on iOS 14.0+, macOS 11.0+, tvOS 14.0+, watchOS 7.0+, visionOS 1.0+.
- `init()` with no arguments shows a spinning activity indicator; add `init(value:total:)` for a bar.
- The timer-interval initializer automatically updates the bar as time passes.

## Related

- [Slider](./slider.md)
