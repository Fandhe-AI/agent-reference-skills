# CAGradientLayer

A layer that draws a color gradient over its background color, filling the shape of the layer.

## Signature / Usage

```swift
class CAGradientLayer : CALayer

let gradientLayer = CAGradientLayer()
gradientLayer.frame = view.bounds
gradientLayer.colors = [UIColor.red.cgColor, UIColor.blue.cgColor]
gradientLayer.startPoint = CGPoint(x: 0, y: 0.5)
gradientLayer.endPoint = CGPoint(x: 1, y: 0.5)
view.layer.addSublayer(gradientLayer)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `colors` | `[Any]?` | Array of `CGColor` values defining each gradient stop. Animatable. |
| `locations` | `[NSNumber]?` | Positions (in `[0, 1]`) for each color stop. Must be monotonically increasing. If `nil`, stops are evenly distributed. Animatable. |
| `startPoint` | `CGPoint` | Start point of the gradient axis in unit coordinate space (default `{0.5, 0}`). Animatable. |
| `endPoint` | `CGPoint` | End point of the gradient axis in unit coordinate space (default `{0.5, 1}`). Animatable. |
| `type` | `CAGradientLayerType` | Gradient style: `.axial` (default), `.radial`, `.conic`. |

## Notes

- iOS 3.0+, iPadOS 3.0+, macOS 10.6+, tvOS 9.0+, visionOS 1.0+, Mac Catalyst 13.1+
- Unit coordinate space: `{0, 0}` is top-left, `{1, 1}` is bottom-right.
- A horizontal gradient: `startPoint = {0, 0.5}`, `endPoint = {1, 0.5}`.
- `colors` must contain at least two values; `locations` count must match `colors` count when specified.
- All properties except `type` are animatable, enabling smooth gradient transitions.

## Related

- [CALayer](./calayer.md)
- [CABasicAnimation](./cabasicanimation.md)
