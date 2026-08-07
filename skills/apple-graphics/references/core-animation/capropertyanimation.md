# CAPropertyAnimation

An abstract subclass for creating animations that manipulate the value of layer properties. The property to animate is specified using a key path relative to the layer using the animation.

## Signature / Usage

```swift
class CAPropertyAnimation : CAAnimation

// Do not instantiate directly — use a concrete subclass:
let anim = CABasicAnimation(keyPath: "opacity")
anim.isAdditive = false
anim.isCumulative = false
anim.valueFunction = CAValueFunction(name: .rotateZ)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `keyPath` | `String?` | Key path the receiver animates. |
| `isAdditive` | `Bool` | Whether the animation value is added to the current render tree value. |
| `isCumulative` | `Bool` | Whether the property value is the end value of the previous repeat cycle plus the current cycle. |
| `valueFunction` | `CAValueFunction?` | Optional value function applied to interpolated values. |

## Notes

- iOS 2.0+, iPadOS 2.0+, macOS 10.5+, tvOS 9.0+, visionOS 1.0+, Mac Catalyst 13.1+
- Do not create instances of `CAPropertyAnimation` directly; use concrete subclasses `CABasicAnimation` or `CAKeyframeAnimation`.
- Convenience initializer `init(keyPath:)` is inherited by the concrete subclasses.

## Related

- [CAAnimation](./caanimation.md)
- [CABasicAnimation](./cabasicanimation.md)
- [CAKeyframeAnimation](./cakeyframeanimation.md)
- [CAValueFunction](./cavaluefunction.md)
