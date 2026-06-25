# Animation

A value describing how SwiftUI transitions a view from one state to another over time.

## Signature / Usage

```swift
@frozen struct Animation: Copyable, CustomDebugStringConvertible,
                          CustomReflectable, CustomStringConvertible,
                          Equatable, Escapable, Hashable, Sendable
```

```swift
// Attach an animation that triggers when `scale` changes
Circle()
    .scaleEffect(scale)
    .animation(.easeInOut(duration: 0.3), value: scale)
```

## Options / Props

### Built-in animation types

| Name | Description |
|------|-------------|
| `.default` | The default animation. |
| `.linear` / `.linear(duration:)` | Constant speed throughout. |
| `.easeIn` / `.easeIn(duration:)` | Slow start, fast end. |
| `.easeOut` / `.easeOut(duration:)` | Fast start, slow end. |
| `.easeInOut` / `.easeInOut(duration:)` | Combined ease in and out. |
| `.spring` / `.spring(duration:bounce:blendDuration:)` | Physics-based spring. |
| `.bouncy` / `.bouncy(duration:extraBounce:)` | Spring with higher bounce. |
| `.smooth` / `.smooth(duration:extraBounce:)` | Spring with no bounce. |
| `.snappy` / `.snappy(duration:extraBounce:)` | Spring with small bounce. |
| `.interpolatingSpring` | Spring that interpolates to target. |
| `.interactiveSpring` | Spring tuned for gesture-driven animations. |
| `.timingCurve(_:duration:)` | Custom cubic Bézier timing curve. |

### Configuration modifiers

| Method | Description |
|--------|-------------|
| `.delay(_ delay:)` | Delays the start of the animation. |
| `.repeatCount(_ count:autoreverses:)` | Repeats the animation a fixed number of times. |
| `.repeatForever(autoreverses:)` | Repeats the animation indefinitely. |
| `.speed(_ speed:)` | Scales the animation speed. |
| `.logicallyComplete(after:)` | Marks the logical completion point for callbacks. |

## Notes

- Available iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Spring animations preserve velocity across overlapping animations for natural feel
- Passing `nil` to `animation(_:value:)` disables animation for the specified value

## Related

- [withAnimation](./withanimation.md)
- [animation(_:value:)](./animation-modifier.md)
- [Spring](./spring.md)
