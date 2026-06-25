# overlay

Layers content in front of this view.

## Signature / Usage

```swift
// View content as overlay (iOS 15+)
nonisolated func overlay<V>(
    alignment: Alignment = .center,
    @ContentBuilder content: () -> V
) -> some View where V : View

// ShapeStyle overlay
nonisolated func overlay<S>(
    _ style: S,
    ignoresSafeAreaEdges edges: Edge.Set = .all
) -> some View where S : ShapeStyle

// Shape-filled overlay
nonisolated func overlay<S, T>(
    _ style: S,
    in shape: T,
    fillStyle: FillStyle = FillStyle()
) -> some View where S : ShapeStyle, T : InsettableShape
```

```swift
RoundedRectangle(cornerRadius: 8)
    .frame(width: 200, height: 100)
    .overlay(alignment: .topLeading) { Circle().fill(.red).frame(width: 20, height: 20) }
    .overlay(alignment: .bottomTrailing) { Circle().fill(.blue).frame(width: 20, height: 20) }
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `alignment` | `Alignment` | `.center` | Alignment of the implicit `ZStack` grouping overlay views. |
| `content` | `() -> V` | — | View builder closure; views stack bottom to top within the overlay. |
| `style` | `ShapeStyle` | — | A `ShapeStyle` (color, gradient) to apply as an overlay. |
| `ignoresSafeAreaEdges` | `Edge.Set` | `.all` | Edges that extend into the safe area. |
| `shape` | `InsettableShape` | — | A shape to fill with the given style. |

## Notes

The `content:` overload requires iOS 15.0+ / macOS 12.0+. The `alignment` parameter positions the implicit `ZStack` as a whole, not individual views within it. Use separate `overlay` calls for individually positioned items.

## Related

- [background.md](./background.md)
- [clip-shape.md](./clip-shape.md)
