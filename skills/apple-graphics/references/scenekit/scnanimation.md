# SCNAnimation

An object wrapping Core Animation content to animate SceneKit properties. Apply via the `SCNAnimatable` protocol on nodes, geometries, and materials.

## Signature / Usage

```swift
// Load from a .dae/.scn file resource
let animation = SCNAnimation(named: "spin")
animation.repeatCount = .infinity
animation.autoreverses = false

let player = SCNAnimationPlayer(animation: animation)
node.addAnimationPlayer(player, forKey: "spin")
player.play()

// Create from a CABasicAnimation
let caAnim = CABasicAnimation(keyPath: "position.y")
caAnim.fromValue = 0
caAnim.toValue = 5
caAnim.duration = 1.0
let scnAnim = SCNAnimation(caAnimation: caAnim)
node.addAnimation(scnAnim, forKey: "bounce")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `duration` | `TimeInterval` | Length of the animation in seconds |
| `repeatCount` | `CGFloat` | Times to repeat (use `Float.infinity` for endless) |
| `autoreverses` | `Bool` | Play backward after each forward pass |
| `isRemovedOnCompletion` | `Bool` | Remove animation after it finishes (default `true`) |
| `fillsForward` | `Bool` | Hold final value after animation ends |
| `fillsBackward` | `Bool` | Apply starting value before animation begins |
| `startDelay` | `TimeInterval` | Delay before playback starts |
| `blendInDuration` | `TimeInterval` | Ramp-in time when animation starts |
| `blendOutDuration` | `TimeInterval` | Ramp-out time before animation ends |
| `timingFunction` | `SCNTimingFunction` | Easing curve |
| `keyPath` | `String?` | Key path of the animated property |
| `isAdditive` | `Bool` | Add to current property value instead of replacing |
| `isCumulative` | `Bool` | Accumulate values across repeats |
| `usesSceneTimeBase` | `Bool` | Use scene time instead of system time |
| `animationEvents` | `[SCNAnimationEvent]?` | Callbacks triggered at specific times |
| `animationDidStart` | block | Called when animation begins |
| `animationDidStop` | block | Called when animation ends |

## Notes

- Available on iOS 8.0+, macOS 10.8+, tvOS 9.0+, visionOS 1.0+. Deprecated in version 26.0.
- Prefer `SCNAnimationPlayer` for pause/resume/speed control over an active animation.
- `SCNAnimatable` methods (`addAnimation(_:forKey:)`, `removeAnimation(forKey:)`) are available on `SCNNode`, `SCNGeometry`, `SCNMaterial`, `SCNLight`, `SCNCamera`.
- For simple property animations, `SCNTransaction` provides an implicit animation block API.

## Related

- [SCNNode](./scnnode.md)
- [SCNAction](./scnaction.md)
- [SCNGeometry](./scngeometry.md)
