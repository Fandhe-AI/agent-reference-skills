# glassBackgroundEffect(displayMode:)

Fills a view's background with the standard visionOS glass material — thickness, specularity, blur, and shadow included.

## Signature / Usage

```swift
nonisolated func glassBackgroundEffect(
    displayMode: GlassBackgroundDisplayMode = .always
) -> some View
```

```swift
HStack {
    Button("Play") { }
    Button("Pause") { }
}
.glassBackgroundEffect()
```

Custom shape variant:

```swift
func glassBackgroundEffect<S: Shape>(
    in shape: S,
    displayMode: GlassBackgroundDisplayMode = .always
) -> some View
```

## Options / Props

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `displayMode` | `GlassBackgroundDisplayMode` | `.always` | Controls when the glass is shown |

Effect variants: `AutomaticGlassBackgroundEffect`, `FeatheredGlassBackgroundEffect`, `PlateGlassBackgroundEffect`.

## Notes

- visionOS 1.0+.
- The effect adds physical depth along the z-axis. Apply it to a container (e.g., `ZStack`) rather than individual child views to avoid layout issues.
- When combining with `overlay()` or `background()`, create an explicit `ZStack` inside the closure.

## Related

- [ornament](./ornament.md)
