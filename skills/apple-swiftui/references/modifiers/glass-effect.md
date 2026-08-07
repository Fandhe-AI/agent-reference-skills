# glassEffect

Applies the Liquid Glass material effect to a view, with a `Glass` configuration (`.regular`, `.clear`, `.identity`) and a shape defining where the effect renders.

## Signature / Usage

```swift
nonisolated func glassEffect(
    _ glass: Glass = .regular,
    in shape: some Shape = DefaultGlassEffectShape()
) -> some View
```

```swift
Text("Hello, World!")
    .font(.title)
    .padding()
    .glassEffect()

// Tinted, interactive glass in a custom shape
Text("Favorite")
    .padding()
    .glassEffect(.regular.tint(.orange).interactive(), in: .capsule)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `glass` | `Glass` | `.regular` | The Liquid Glass material configuration. |
| `shape` | `some Shape` | `DefaultGlassEffectShape()` (capsule) | The shape that defines the area where the glass effect is applied. |

### `Glass` variants and chaining

| Name | Type | Description |
|------|------|-------------|
| `.regular` | `static var Glass` | The standard Liquid Glass material variant. |
| `.clear` | `static var Glass` | A more transparent glass variant. |
| `.identity` | `static var Glass` | Applies no visual change, as if no glass effect was applied. |
| `.tint(_:)` | `(Color?) -> Glass` | Returns a copy of the glass configuration with a tint color applied. |
| `.interactive(_:)` | `(Bool) -> Glass` | Returns a copy configured to react to touch/pointer interaction (default `true` when called with no argument). |

## Notes

Requires iOS 26.0+ / iPadOS 26.0+ / macOS 26.0+ / tvOS 26.0+ / watchOS 26.0+. The system renders a shape anchored behind the view with the Liquid Glass material, then applies Liquid Glass foreground effects over the view; the material fills the entire frame including padding. Use with `GlassEffectContainer` to combine multiple Liquid Glass shapes so they can morph into one another (a bare `glassEffect` without a container does not participate in morphing transitions).

## Related

- [glass-effect-container.md](./glass-effect-container.md)
