# GlassEffectContainer

A view that combines multiple Liquid Glass shapes (from `glassEffect(_:in:)`) into a single shape that can morph individual shapes into one another.

## Signature / Usage

```swift
@MainActor @preconcurrency struct GlassEffectContainer<Content> where Content : View

init(spacing: CGFloat? = nil, content: () -> Content)
```

```swift
@Namespace private var namespace

GlassEffectContainer(spacing: 20) {
    HStack(spacing: 20) {
        Image(systemName: "star.fill")
            .padding()
            .glassEffect()
            .glassEffectID("star", in: namespace)

        Image(systemName: "heart.fill")
            .padding()
            .glassEffect()
            .glassEffectID("heart", in: namespace)
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `spacing` | `CGFloat?` | `nil` | Controls how nearby glass shapes blend as they approach each other; higher values start blending sooner. |
| `content` | `() -> Content` | — | The view content containing one or more `glassEffect(_:in:)` views. |

### `glassEffectID(_:in:)`

```swift
nonisolated func glassEffectID(_ id: (some Hashable & Sendable)?, in namespace: Namespace.ID) -> some View
```

| Name | Type | Description |
|------|------|-------------|
| `id` | `(some Hashable & Sendable)?` | Identity value for the Liquid Glass effect(s) within this view. |
| `namespace` | `Namespace.ID` | The namespace (from `@Namespace`) shared across views participating in morphing transitions. |

## Notes

Requires iOS 26.0+ / iPadOS 26.0+ / macOS 26.0+ / tvOS 26.0+ / watchOS 26.0+. Each view with a `glassEffect(_:in:)` inside the container contributes a shape to a shared rendering pass, improving performance versus per-view rendering and letting shapes interact and blend. Use `glassEffectID(_:in:)` together with a shared `Namespace.ID` so SwiftUI can animate a shape morphing to/from another shape's identity when views appear, disappear, or reorder — mirrors the pattern of `matchedGeometryEffect` but scoped to Liquid Glass shapes.

## Related

- [glass-effect.md](./glass-effect.md)
