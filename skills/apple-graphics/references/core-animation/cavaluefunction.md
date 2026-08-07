# CAValueFunction

An object that provides a flexible method of defining animated transformations, letting you animate individual components of a transform such as rotation, scale, or translation.

## Signature / Usage

```swift
class CAValueFunction

let rotateAnimation = CABasicAnimation()
rotateAnimation.valueFunction = CAValueFunction(name: .rotateZ)
rotateAnimation.fromValue = 0
rotateAnimation.toValue = Float.pi
rotateAnimation.duration = 3
rotatingLayer.add(rotateAnimation, forKey: "transform")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `name` | `CAValueFunctionName` | Name identifying the value function (read-only). |

## Notes

- iOS 3.0+, iPadOS 3.0+, macOS 10.6+, tvOS 9.0+, visionOS 1.0+, Mac Catalyst 13.1+
- Rotation functions (`.rotateX`, `.rotateY`, `.rotateZ`) require a single input value.
- Scale and translate functions (e.g. `.scale`, `.translate`) require a 3-value array input.
- Used with `CAPropertyAnimation.valueFunction` to animate a single component of a `transform` keypath without overwriting the rest of the matrix.

## Related

- [CAPropertyAnimation](./capropertyanimation.md)
- [CABasicAnimation](./cabasicanimation.md)
