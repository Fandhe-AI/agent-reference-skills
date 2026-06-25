# CATransition

An animation that provides an animated transition between a layer's states.

## Signature / Usage

```swift
class CATransition : CAAnimation

let transition = CATransition()
transition.duration = 0.4
transition.type = .push
transition.subtype = .fromRight
layer.add(transition, forKey: "pageTransition")

// Trigger the state change after adding the transition
layer.contents = newImage
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `type` | `CATransitionType` | Predefined transition style. Common values: `.fade`, `.push`, `.reveal`, `.moveIn`. |
| `subtype` | `CATransitionSubtype?` | Direction for motion-based transitions: `.fromLeft`, `.fromRight`, `.fromTop`, `.fromBottom`. |
| `startProgress` | `Float` | Fraction `[0, 1]` at which the transition begins. Default `0`. |
| `endProgress` | `Float` | Fraction `[0, 1]` at which the transition ends. Default `1`. |
| `filter` | `Any?` | Core Image filter providing a custom transition effect (overrides `type`). |

## Notes

- iOS 2.0+, iPadOS 2.0+, macOS 10.5+, tvOS 9.0+, visionOS 1.0+, Mac Catalyst 13.1+
- The default transition type is `.fade` (cross-dissolve).
- Add the transition to the layer **before** making the state change; Core Animation captures the before/after states automatically.
- `startProgress` / `endProgress` can be used to play a sub-section of the transition effect.
- Custom Core Image transitions are macOS-only for most filter types.

## Related

- [CAAnimation](./caanimation.md)
- [CATransaction](./catransaction.md)
