# CAConstraint

A representation of a single layout constraint between two layers. Each instance encapsulates one geometry relationship between two layers on the same axis.

## Signature / Usage

```swift
class CAConstraint

// Horizontally center a layer in its superlayer
let theConstraint = CAConstraint(attribute: .midX,
                                  relativeTo: "superlayer",
                                  attribute: .midX)
layer.constraints = [theConstraint]
layer.layoutManager = CAConstraintLayoutManager()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `attribute` | `CAConstraintAttribute` | The attribute the constraint affects. |
| `offset` | `CGFloat` | Offset value of the constraint attribute. |
| `scale` | `CGFloat` | Scale factor of the constraint attribute. |
| `sourceAttribute` | `CAConstraintAttribute` | The constraint attribute of the layer the receiver is calculated relative to. |
| `sourceName` | `String` | Name of the layer that the constraint is calculated relative to. |

## Notes

- macOS 10.5+, Mac Catalyst 13.1+ (not available on iOS/iPadOS/tvOS/visionOS).
- Sibling layers are referenced by name via the layer's `name` property; the special name `"superlayer"` refers to the receiver's superlayer.
- Requires `CAConstraintLayoutManager` set as the layer's `layoutManager` to take effect.
- A minimum of two relationships must be specified per axis; circular constraint references may result in undefined behavior.

## Related

- [CALayer](./calayer.md)
