# Stepper

A control that performs increment and decrement actions.

## Signature / Usage

```swift
nonisolated struct Stepper<Label> where Label : View
```

```swift
@State private var quantity = 1

Stepper("Quantity: \(quantity)", value: $quantity, in: 1...10, step: 1)
```

## Options / Props

| Initializer | Description |
|---|---|
| `init(_:value:step:onEditingChanged:)` | Title string key + binding + step |
| `init(_:value:in:step:onEditingChanged:)` | With a closed range constraint |
| `init(value:step:label:onEditingChanged:)` | Custom label view builder |
| `init(value:in:step:label:onEditingChanged:)` | Custom label + range |
| `init(_:value:step:format:onEditingChanged:)` | Display value with a `FormatStyle` |
| `init(_:onIncrement:onDecrement:onEditingChanged:)` | Manual increment/decrement closures |
| `init(label:onIncrement:onDecrement:onEditingChanged:)` | Custom label + manual closures |

### Parameters

| Parameter | Type | Description |
|---|---|---|
| `value` | `Binding<V>` | Current value (`Strideable`) |
| `in` | `ClosedRange<V>` | Clamped range |
| `step` | `V.Stride` | Increment/decrement amount (default `1`) |
| `onEditingChanged` | `(Bool) -> Void` | Called on interaction begin/end |

## Notes

- Available on iOS 13.0+, macOS 10.15+, watchOS 9.0+, visionOS 1.0+. Not available on tvOS.
- When `in:` is provided, the value is automatically clamped; the `+`/`-` buttons disable at the bounds.
- Use the `onIncrement:onDecrement:` form when the value type cannot be expressed as `Strideable`.

## Related

- [Slider](./slider.md)
- [Form](./form.md)
