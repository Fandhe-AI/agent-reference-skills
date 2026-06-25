# CAAnimationGroup

An animation that allows multiple animations to be grouped and run concurrently on a layer.

## Signature / Usage

```swift
class CAAnimationGroup : CAAnimation

let fadeOut = CABasicAnimation(keyPath: "opacity")
fadeOut.fromValue = 1
fadeOut.toValue = 0

let scaleUp = CABasicAnimation(keyPath: "transform.scale")
scaleUp.fromValue = 1
scaleUp.toValue = 1.5

let group = CAAnimationGroup()
group.animations = [fadeOut, scaleUp]
group.duration = 0.4
layer.add(group, forKey: "fadeAndScale")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `animations` | `[CAAnimation]?` | Array of `CAAnimation` objects to run concurrently. Each animation's timing is evaluated in the group's time space. |

All `CAAnimation` timing properties (`duration`, `beginTime`, `fillMode`, etc.) apply to the group as a whole.

## Notes

- iOS 2.0+, iPadOS 2.0+, macOS 10.5+, tvOS 9.0+, visionOS 1.0+, Mac Catalyst 13.1+
- The `delegate` and `isRemovedOnCompletion` properties of **individual animations in the group are ignored**; set them on the group itself.
- Grouped animations are **clipped** to the group's `duration` — a 10-second child inside a 5-second group shows only its first 5 seconds.
- Each child animation's `beginTime` is relative to the group's begin time.

## Related

- [CAAnimation](./caanimation.md)
- [CABasicAnimation](./cabasicanimation.md)
- [CAKeyframeAnimation](./cakeyframeanimation.md)
