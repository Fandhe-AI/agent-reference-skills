# Spring

A representation of spring physics that can be used to create spring-based animations or query spring behavior.

## Signature / Usage

```swift
struct Spring: Equatable, Hashable, Sendable
```

```swift
// Create and use a spring animation
let spring = Spring(duration: 0.5, bounce: 0.3)
Circle()
    .animation(.spring(spring), value: offset)
```

## Options / Props

### Initializers

| Initializer | Description |
|-------------|-------------|
| `init(duration:bounce:)` | Duration (perceptual pace) and bounce amount (0 = no bounce, 1 = very bouncy). |
| `init(response:dampingRatio:)` | Response (approximate duration) and damping ratio. |
| `init(mass:stiffness:damping:allowOverDamping:)` | Physics-based parameters. |
| `init(settlingDuration:dampingRatio:epsilon:)` | Settling duration and damping ratio. |

### Built-in presets

| Name | Description |
|------|-------------|
| `.bouncy` / `.bouncy(duration:extraBounce:)` | Higher bounce spring. |
| `.smooth` / `.smooth(duration:extraBounce:)` | No bounce spring. |
| `.snappy` / `.snappy(duration:extraBounce:)` | Small bounce, snappy feel. |

### Key properties

| Property | Type | Description |
|----------|------|-------------|
| `duration` | `TimeInterval` | Perceptual duration defining animation pace. |
| `bounce` | `Double` | Bounciness level. |
| `damping` | `Double` | Friction force. |
| `stiffness` | `Double` | Spring stiffness coefficient. |
| `mass` | `Double` | Mass of the attached object. |
| `settlingDuration` | `TimeInterval` | Estimated time for the spring to come to rest. |

### Simulation methods

| Method | Description |
|--------|-------------|
| `value(target:initialVelocity:time:)` | Spring position at a given time. |
| `velocity(target:initialVelocity:time:)` | Spring velocity at a given time. |
| `force(target:position:velocity:)` | Force the spring applies at a given state. |
| `update(value:velocity:target:deltaTime:)` | Advances spring state by one time step. |

## Notes

- Available iOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- Use `Spring` to query spring behavior or convert between parameter representations before creating an `Animation`

## Related

- [Animation](./animation.md)
