# contentTransition(_:)

Specifies how a view animates changes to its own content (not its insertion or removal).

## Signature / Usage

```swift
nonisolated func contentTransition(_ transition: ContentTransition) -> some View
```

```swift
@State private var fontSize = 20.0

Text("Hello")
    .font(.system(size: fontSize))
    .contentTransition(.interpolate)
    .animation(.easeInOut(duration: 0.5), value: fontSize)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `transition` | `ContentTransition` | The transition style to apply to content changes. |

## Notes

- Available iOS 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+, visionOS 1.0+
- Has **no effect** unless wrapped in or paired with an active `Animation`
- Useful for animating text changes, number updates, and SF Symbol replacements within a persistent view

## Related

- [ContentTransition](./contenttransition.md)
- [Animation](./animation.md)
