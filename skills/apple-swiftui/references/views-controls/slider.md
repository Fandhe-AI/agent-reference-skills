# Slider

A control for selecting a value from a bounded linear range of values.

## Signature / Usage

```swift
nonisolated struct Slider<Label, ValueLabel> where Label : View, ValueLabel : View
```

```swift
@State private var speed = 50.0

Slider(value: $speed, in: 0...100, step: 5) {
    Text("Speed")
} minimumValueLabel: {
    Text("0")
} maximumValueLabel: {
    Text("100")
} onEditingChanged: { editing in
    print("Editing:", editing)
}
```

## Options / Props

| Initializer | Description |
|---|---|
| `init(value:in:onEditingChanged:)` | Basic slider over a range |
| `init(value:in:step:onEditingChanged:)` | With discrete step increment |
| `init(value:in:label:onEditingChanged:)` | With accessibility label |
| `init(value:in:label:minimumValueLabel:maximumValueLabel:onEditingChanged:)` | With min/max endpoint labels |
| `init(value:in:step:label:minimumValueLabel:maximumValueLabel:onEditingChanged:)` | Step + all labels |

### Parameters

| Parameter | Type | Description |
|---|---|---|
| `value` | `Binding<V>` | Current value (`BinaryFloatingPoint`) |
| `in` | `ClosedRange<V>` | Allowed range |
| `step` | `V.Stride` | Increment size |
| `onEditingChanged` | `(Bool) -> Void` | Called when drag begins/ends |

## Notes

- Available on iOS 13.0+, macOS 10.15+, watchOS 6.0+, visionOS 1.0+. Not available on tvOS.
- `onEditingChanged` receives `true` when the user starts dragging and `false` on release.
- `minimumValueLabel` and `maximumValueLabel` are decorative; the accessibility label is separate.

## Related

- [Stepper](./stepper.md)
- [ProgressView](./progressview.md)
