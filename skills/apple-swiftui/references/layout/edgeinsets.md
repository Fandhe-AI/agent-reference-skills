# EdgeInsets

The inset distances for the sides of a rectangle.

## Signature / Usage

```swift
let insets = EdgeInsets(top: 8, leading: 16, bottom: 8, trailing: 16)
```

## Options / Props

### Initializers

| Signature | Description |
|-----------|-------------|
| `init()` | All edges zero |
| `init(top:leading:bottom:trailing:)` | Explicit per-edge values |
| `init(_ edgeInsets3D: EdgeInsets3D)` | From a 3D edge insets value (drops `front`/`back`) |

### Properties

| Name | Type | Description |
|------|------|-------------|
| `top` | `CGFloat` | Inset on the top edge |
| `leading` | `CGFloat` | Inset on the leading edge |
| `bottom` | `CGFloat` | Inset on the bottom edge |
| `trailing` | `CGFloat` | Inset on the trailing edge |

## Notes

- Available: iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Uses layout-direction-aware `leading`/`trailing` instead of `left`/`right`
- Conforms to `Animatable`; can be animated in transitions

## Related

- [GeometryReader](./geometryreader.md)
- [Alignment](./alignment.md)
