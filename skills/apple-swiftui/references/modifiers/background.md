# background

Layers content or a style behind this view.

## Signature / Usage

```swift
// View content as background (iOS 15+)
nonisolated func background<V>(
    alignment: Alignment = .center,
    @ContentBuilder content: () -> V
) -> some View where V : View

// ShapeStyle background (e.g. Color, gradient)
nonisolated func background<S>(
    _ style: S,
    ignoresSafeAreaEdges edges: Edge.Set = .all
) -> some View where S : ShapeStyle

// Shape-filled background
nonisolated func background<S, T>(
    _ style: S,
    in shape: T,
    fillStyle: FillStyle = FillStyle()
) -> some View where S : ShapeStyle, T : Shape
```

```swift
Text("Hello")
    .background(.yellow)

RoundedRectangle(cornerRadius: 8)
    .background(alignment: .topLeading) { Circle().fill(.red) }
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `alignment` | `Alignment` | `.center` | Alignment of the implicit `ZStack` grouping background views. |
| `content` | `() -> V` | — | View builder closure; views stack bottom to top. |
| `style` | `ShapeStyle` | — | A color, gradient, or other `ShapeStyle` to fill the background. |
| `ignoresSafeAreaEdges` | `Edge.Set` | `.all` | Edges that extend into the safe area. |
| `shape` | `Shape` | — | A shape to fill with the given style. |

## Notes

The `content:` overload requires iOS 15.0+ / macOS 12.0+. The `ShapeStyle` overload (`background(_:ignoresSafeAreaEdges:)`) is available from iOS 15.0+ / macOS 12.0+. For iOS 13+, use `background(Color.yellow)` (deprecated path). The modified view takes layout priority over background content.

## Related

- [overlay.md](./overlay.md)
- [foreground-style.md](./foreground-style.md)
- [border-tint.md](./border-tint.md)
