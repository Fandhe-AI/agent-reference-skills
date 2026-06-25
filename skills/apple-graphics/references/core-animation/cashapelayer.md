# CAShapeLayer

A layer that draws a cubic Bezier spline in its coordinate space. The shape is composited between the layer's `contents` and its first sublayer.

## Signature / Usage

```swift
class CAShapeLayer : CALayer

let shapeLayer = CAShapeLayer()
let path = UIBezierPath(ovalIn: CGRect(x: 0, y: 0, width: 100, height: 100))
shapeLayer.path = path.cgPath
shapeLayer.fillColor = UIColor.yellow.cgColor
shapeLayer.strokeColor = UIColor.red.cgColor
shapeLayer.lineWidth = 2
view.layer.addSublayer(shapeLayer)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `path` | `CGPath?` | The path to render. Animatable. |
| `fillColor` | `CGColor?` | Color used to fill the path interior. `nil` = no fill. Animatable. |
| `fillRule` | `CAShapeLayerFillRule` | Fill rule: `.nonZero` (default) or `.evenOdd`. |
| `strokeColor` | `CGColor?` | Color used to stroke the path. `nil` = no stroke. Animatable. |
| `lineWidth` | `CGFloat` | Stroke line width. Animatable. |
| `strokeStart` | `CGFloat` | Fraction of path at which stroke begins `[0, 1]`. Animatable. |
| `strokeEnd` | `CGFloat` | Fraction of path at which stroke ends `[0, 1]`. Animatable. |
| `lineDashPattern` | `[NSNumber]?` | Dash pattern lengths (alternating painted / unpainted segments). |
| `lineDashPhase` | `CGFloat` | Phase offset into the dash pattern. Animatable. |
| `lineCap` | `CAShapeLayerLineCap` | Line cap style: `.butt`, `.round`, `.square`. |
| `lineJoin` | `CAShapeLayerLineJoin` | Line join style: `.miter`, `.round`, `.bevel`. |
| `miterLimit` | `CGFloat` | Maximum miter length for `.miter` joins. Animatable. |

## Notes

- iOS 3.0+, iPadOS 3.0+, macOS 10.6+, tvOS 9.0+, visionOS 1.0+, Mac Catalyst 13.1+
- `strokeStart` / `strokeEnd` are animatable, making them ideal for path-drawing progress animations.
- Antialiasing is applied when possible; certain Core Image filter operations may force local-space rasterization.
- `CAShapeLayer` does not rasterize at creation — it is re-rendered each time the path or style properties change.

## Related

- [CALayer](./calayer.md)
- [CABasicAnimation](./cabasicanimation.md)
