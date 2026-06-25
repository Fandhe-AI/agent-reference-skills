# CABasicAnimation

An animation that provides single-keyframe interpolation between two values for a layer property.

## Signature / Usage

```swift
class CABasicAnimation : CAPropertyAnimation

let anim = CABasicAnimation(keyPath: "position.y")
anim.fromValue = 0
anim.toValue = 200
anim.duration = 0.5
anim.timingFunction = CAMediaTimingFunction(name: .easeInEaseOut)
layer.add(anim, forKey: "moveDown")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `fromValue` | `Any?` | Start value of the interpolation. |
| `toValue` | `Any?` | End value of the interpolation. |
| `byValue` | `Any?` | Relative change applied to the start value. |

### Interpolation rules (at most two of the three should be set)

| Set | Behavior |
|-----|----------|
| `fromValue` + `toValue` | Interpolates from → to. |
| `fromValue` + `byValue` | Interpolates from → (from + by). |
| `byValue` + `toValue` | Interpolates from (to − by) → to. |
| `fromValue` only | Interpolates from → current presentation value. |
| `toValue` only | Interpolates from current presentation value → to. |
| `byValue` only | Interpolates from current value → (current + by). |
| All `nil` | Interpolates between previous and current presentation values. |

## Notes

- iOS 2.0+, iPadOS 2.0+, macOS 10.5+, tvOS 9.0+, visionOS 1.0+, Mac Catalyst 13.1+
- Use dot notation for nested keypaths: `"transform.scale.x"`, `"position.x"`, `"shadowOpacity"`.
- Non-scalar types (colors, transforms) must be passed as `CGColor`, `CATransform3D`, or as arrays of numbers.
- `CASpringAnimation` extends this class with physics-based parameters.

## Related

- [CAAnimation](./caanimation.md)
- [CASpringAnimation](./caspringanimation.md)
- [CAKeyframeAnimation](./cakeyframeanimation.md)
- [CAMediaTimingFunction](./camediatimingfunction.md)
