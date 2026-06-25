# foregroundStyle

Sets the style used to render foreground elements (text, shapes, template images).

## Signature / Usage

```swift
// Single style
nonisolated func foregroundStyle<S>(_ style: S) -> some View where S : ShapeStyle

// Primary + secondary levels
nonisolated func foregroundStyle<S1, S2>(_ primary: S1, _ secondary: S2) -> some View
    where S1 : ShapeStyle, S2 : ShapeStyle

// Primary + secondary + tertiary levels
nonisolated func foregroundStyle<S1, S2, S3>(_ primary: S1, _ secondary: S2, _ tertiary: S3) -> some View
    where S1 : ShapeStyle, S2 : ShapeStyle, S3 : ShapeStyle
```

```swift
HStack {
    Image(systemName: "triangle.fill")
    Text("Hello, world!")
}
.foregroundStyle(.teal)

Text("Gradient")
    .font(.largeTitle)
    .foregroundStyle(
        .linearGradient(colors: [.yellow, .blue], startPoint: .top, endPoint: .bottom)
    )
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `style` / `primary` | `ShapeStyle` | Main foreground style. Accepts `Color`, `Gradient`, `.primary`, `.secondary`, etc. |
| `secondary` | `ShapeStyle` | Style for secondary foreground level. |
| `tertiary` | `ShapeStyle` | Style for tertiary foreground level. |

## Notes

Available on iOS 15.0+ / macOS 12.0+. Applies to text, shapes, and SF Symbols. Hierarchical styles (`.secondary`, `.tertiary`) derive from the primary style and preserve vibrancy. Custom non-hierarchical styles disable vibrancy. Replaces deprecated `foregroundColor(_:)`.

## Related

- [font.md](./font.md)
- [background.md](./background.md)
- [border-tint.md](./border-tint.md)
