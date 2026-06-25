# CAKeyframeAnimation

An animation that provides keyframe animation capabilities for a layer object, allowing multiple intermediate values to be specified.

## Signature / Usage

```swift
class CAKeyframeAnimation : CAPropertyAnimation

let anim = CAKeyframeAnimation(keyPath: "backgroundColor")
anim.values = [UIColor.red.cgColor, UIColor.green.cgColor, UIColor.blue.cgColor]
anim.keyTimes = [0, 0.5, 1]
anim.duration = 2
layer.add(anim, forKey: "colorCycle")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `values` | `[Any]?` | Array of keyframe values. Used for non-path-based properties. |
| `path` | `CGPath?` | Path a point-based property follows. Mutually exclusive with `values`. |
| `keyTimes` | `[NSNumber]?` | Normalized times `[0, 1]` for each keyframe. Count must match `values`. |
| `timingFunctions` | `[CAMediaTimingFunction]?` | Pacing curve for each keyframe segment. Count = `values.count - 1`. |
| `calculationMode` | `CAAnimationCalculationMode` | Interpolation strategy: `.linear`, `.discrete`, `.paced`, `.cubic`, `.cubicPaced`. |
| `rotationMode` | `CAAnimationRotationMode?` | Auto-rotation when following a path: `.autoReverse`, `.auto`. |
| `tensionValues` | `[NSNumber]?` | Tightness of the curve at keyframes (cubic modes). |
| `continuityValues` | `[NSNumber]?` | Sharpness of curve corners at keyframes (cubic modes). |
| `biasValues` | `[NSNumber]?` | Bias of curve relative to control point at keyframes (cubic modes). |

## Notes

- iOS 2.0+, iPadOS 2.0+, macOS 10.5+, tvOS 9.0+, visionOS 1.0+, Mac Catalyst 13.1+
- `path` takes precedence over `values` for `CGPoint`-type keypaths.
- When `calculationMode` is `.paced` or `.cubicPaced`, `keyTimes` and `timingFunctions` are ignored; Core Animation computes timing automatically to maintain a constant speed.
- `rotationMode` only applies when animating along a `path`.

## Related

- [CAAnimation](./caanimation.md)
- [CABasicAnimation](./cabasicanimation.md)
- [CAMediaTimingFunction](./camediatimingfunction.md)
