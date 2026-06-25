# CAAnimation

Abstract base class for animations in Core Animation. Provides support for `CAMediaTiming` and `CAAction` protocols. Not instantiated directly — use concrete subclasses.

## Signature / Usage

```swift
class CAAnimation : NSObject
// Conforms to: CAMediaTiming, CAAction, NSCoding, NSCopying, NSSecureCoding

// Use a concrete subclass:
let anim = CABasicAnimation(keyPath: "opacity")
anim.fromValue = 0
anim.toValue = 1
anim.duration = 0.3
layer.add(anim, forKey: "fadeIn")
```

## Options / Props

### Timing (from CAMediaTiming)

| Name | Type | Description |
|------|------|-------------|
| `duration` | `CFTimeInterval` | Duration of the animation in seconds. |
| `beginTime` | `CFTimeInterval` | Absolute begin time in the parent's time space. Use `CACurrentMediaTime() + delay` for a delayed start. |
| `speed` | `Float` | Playback speed multiplier (default `1`). |
| `timeOffset` | `CFTimeInterval` | Offset into the animation's active duration (scrubs the playhead). |
| `repeatCount` | `Float` | Number of times to repeat. `Float.infinity` for indefinite. |
| `repeatDuration` | `CFTimeInterval` | Total duration of the repeating animation. Mutually exclusive with `repeatCount`. |
| `autoreverses` | `Bool` | Reverses on each cycle when `true`. |
| `fillMode` | `CAMediaTimingFillMode` | Behavior outside active duration: `.removed` (default), `.forwards`, `.backwards`, `.both`. |

### Animation Behavior

| Name | Type | Description |
|------|------|-------------|
| `isRemovedOnCompletion` | `Bool` | Remove from the layer when finished (default `true`). Set `false` together with `fillMode = .forwards` to freeze the final state. |
| `timingFunction` | `CAMediaTimingFunction?` | Pacing curve for the animation. `nil` uses linear pacing. |
| `delegate` | `CAAnimationDelegate?` | Receives `animationDidStart` and `animationDidStop` callbacks. |
| `preferredFrameRateRange` | `CAFrameRateRange` | Desired frame rate range for the animation. |

## Notes

- iOS 2.0+, iPadOS 2.0+, macOS 10.5+, tvOS 9.0+, visionOS 1.0+, Mac Catalyst 13.1+
- Concrete subclasses: `CABasicAnimation`, `CAKeyframeAnimation`, `CASpringAnimation`, `CAAnimationGroup`, `CATransition`.
- Setting `isRemovedOnCompletion = false` without a matching `fillMode` leaves the animation in the removed state visually — always pair these together.
- The `delegate` property is not copied when the animation is copied, so each animation instance needs its own delegate assignment.

## Related

- [CABasicAnimation](./cabasicanimation.md)
- [CAKeyframeAnimation](./cakeyframeanimation.md)
- [CASpringAnimation](./caspringanimation.md)
- [CAAnimationGroup](./caanimationgroup.md)
- [CATransition](./catransition.md)
- [CAMediaTimingFunction](./camediatimingfunction.md)
- [CATransaction](./catransaction.md)
