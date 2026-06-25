# CASpringAnimation

An animation that applies spring-like physics to a layer's properties, producing natural bounce and overshoot behavior.

## Signature / Usage

```swift
class CASpringAnimation : CABasicAnimation

let spring = CASpringAnimation(keyPath: "transform.scale")
spring.fromValue = 0.8
spring.toValue = 1.0
spring.mass = 1
spring.stiffness = 200
spring.damping = 10
spring.initialVelocity = 0
spring.duration = spring.settlingDuration
layer.add(spring, forKey: "spring")
```

## Options / Props

### Physical Model

| Name | Type | Description |
|------|------|-------------|
| `mass` | `CGFloat` | Mass of the simulated object attached to the spring (default `1`). Higher values increase oscillation inertia. |
| `stiffness` | `CGFloat` | Spring stiffness coefficient (default `100`). Higher values produce faster, stiffer animation. |
| `damping` | `CGFloat` | Friction damping (default `10`). Higher values reduce oscillation and overshoot. |
| `initialVelocity` | `CGFloat` | Initial velocity of the object (default `0`). Match to current gesture velocity for seamless handoff. |
| `allowsOverdamping` | `Bool` | When `true`, allows `damping` to produce a critically/over-damped (no overshoot) response. |

### Duration

| Name | Type | Description |
|------|------|-------------|
| `settlingDuration` | `CFTimeInterval` | Estimated time for the spring to come to rest. Read-only. Use as `duration`. |
| `perceptualDuration` | `CFTimeInterval` | Duration expressed in perceptual terms (affects `bounce`). Setting this adjusts the physical model. |
| `bounce` | `CGFloat` | Bounciness as a value in `[-1, 1]`. Positive = overshoot, negative = overdamped. Paired with `perceptualDuration`. |

## Notes

- iOS 9.0+, iPadOS 9.0+, macOS 10.11+, tvOS 9.0+, visionOS 1.0+, Mac Catalyst 13.1+
- Always set `duration = spring.settlingDuration` after configuring physical parameters; otherwise the spring may be cut off before settling.
- Spring animations can overshoot the `toValue`, so ensure the layer's parent has sufficient space.
- `perceptualDuration` + `bounce` is a higher-level API alternative to `mass` / `stiffness` / `damping`. Do not mix both approaches.

## Related

- [CABasicAnimation](./cabasicanimation.md)
- [CAAnimation](./caanimation.md)
