# border / tint

Adds a border outline to a view, or overrides the tint color for controls.

## Signature / Usage

```swift
// border — draws a border inside the view's bounds
nonisolated func border<S>(_ content: S, width: CGFloat = 1) -> some View
    where S : ShapeStyle

// tint — sets the accent/tint for controls in this hierarchy
nonisolated func tint<S>(_ tint: S?) -> some View where S : ShapeStyle
nonisolated func tint(_ tint: Color?) -> some View
```

```swift
// Simple 2pt purple border
Text("Bordered")
    .padding(4)
    .border(.purple, width: 2)

// Tint a button and toggle
VStack {
    Button("Submit") { }
    Toggle("Option", isOn: $isOn)
}
.tint(.green)

// Gradient tint on a gauge
Gauge(value: 75, in: 0...100) { Text("Temp") }
    .gaugeStyle(.linearCapacity)
    .tint(Gradient(colors: [.blue, .orange, .red]))
```

## Options / Props

### `border`

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ShapeStyle` | — | The border color or style (e.g., `Color`, gradient). |
| `width` | `CGFloat` | `1` | Thickness of the border in points. |

### `tint`

| Name | Type | Description |
|------|------|-------------|
| `tint` | `ShapeStyle?` / `Color?` | The tint to apply. `nil` removes any tint override. |

## Notes

`border` is available on iOS 13.0+ / macOS 10.15+. It draws the border **inside** the view's bounds; add `padding` first to push it outside. For rounded borders, use `overlay { RoundedRectangle(cornerRadius:).stroke() }` instead. `tint` requires iOS 16.0+ / macOS 13.0+; unlike the app accent color, `tint` is always respected and cannot be overridden by user preference.

## Related

- [background.md](./background.md)
- [foreground-style.md](./foreground-style.md)
- [clip-shape.md](./clip-shape.md)
