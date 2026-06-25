# Animatable

A protocol that makes a type's data interpolatable by SwiftUI's animation system.

## Signature / Usage

```swift
protocol Animatable
```

```swift
// Using the @Animatable macro (recommended, iOS 17+)
@Animatable
struct RingSegment: Shape {
    var startAngle: Angle
    var endAngle: Angle

    func path(in rect: CGRect) -> Path { ... }
}
```

## Options / Props

### Required

| Member | Type | Description |
|--------|------|-------------|
| `animatableData` | `Self.AnimatableData` (get/set) | The interpolatable data SwiftUI reads and writes each animation frame. |
| `AnimatableData` | `associatedtype: VectorArithmetic` | The type representing animatable data. |

### Manual conformance example

```swift
struct WaveShape: Shape {
    var amplitude: CGFloat
    var phase: CGFloat

    var animatableData: AnimatablePair<CGFloat, CGFloat> {
        get { AnimatablePair(amplitude, phase) }
        set { amplitude = newValue.first; phase = newValue.second }
    }
}
```

### Helper types

| Type | Description |
|------|-------------|
| `AnimatableValues` | Groups multiple animatable properties (iOS 18+/macOS 15+). |
| `AnimatablePair` | Pairs two `VectorArithmetic` values (pre-iOS 18). |
| `EmptyAnimatableData` | Used when a type has no animatable data. |
| `@AnimatableIgnored` | Macro attribute to exclude a property from synthesis. |

## Notes

- Available iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- `Shape` types automatically conform to `Animatable`; use `@Animatable` macro for custom shapes (iOS 17+)
- SwiftUI reads `animatableData` before and after a state change, then interpolates between them across frames

## Related

- [Animation](./animation.md)
- [withAnimation](./withanimation.md)
