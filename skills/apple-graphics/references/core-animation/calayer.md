# CALayer

An object that manages image-based content and allows you to perform animations on that content. Base class for all Core Animation layers.

## Signature / Usage

```swift
class CALayer : NSObject
// Conforms to: CAMediaTiming, NSCoding, NSSecureCoding

let layer = CALayer()
layer.bounds = CGRect(x: 0, y: 0, width: 100, height: 100)
layer.position = CGPoint(x: 150, y: 150)
layer.backgroundColor = UIColor.blue.cgColor
layer.cornerRadius = 10
view.layer.addSublayer(layer)
```

## Options / Props

### Geometry

| Name | Type | Description |
|------|------|-------------|
| `bounds` | `CGRect` | Layer's bounds rectangle. Animatable. |
| `frame` | `CGRect` | Layer's frame rectangle (not animatable directly). |
| `position` | `CGPoint` | Layer's position in superlayer coordinate space. Animatable. |
| `zPosition` | `CGFloat` | Layer position on the z-axis. Animatable. |
| `anchorPoint` | `CGPoint` | Anchor point for geometry and transforms (unit space, default `{0.5, 0.5}`). Animatable. |
| `anchorPointZ` | `CGFloat` | Anchor point on the z-axis. Animatable. |
| `contentsScale` | `CGFloat` | Scale factor for the layer's content (set to `UIScreen.main.scale` for pixel-perfect rendering). |

### Visual Content

| Name | Type | Description |
|------|------|-------------|
| `contents` | `Any?` | Layer content object — typically a `CGImage`. Animatable. |
| `contentsGravity` | `CALayerContentsGravity` | How `contents` is positioned or scaled within the bounds. |
| `contentsRect` | `CGRect` | Unit-coordinate sub-rectangle of `contents` to display. Animatable. |
| `backgroundColor` | `CGColor?` | Background fill color. Animatable. |
| `opacity` | `Float` | Layer opacity in `[0, 1]`. Animatable. |
| `isHidden` | `Bool` | Whether the layer is hidden. Animatable. |

### Appearance

| Name | Type | Description |
|------|------|-------------|
| `cornerRadius` | `CGFloat` | Radius for rounded corners. Animatable. |
| `cornerCurve` | `CALayerCornerCurve` | Curve style for corners (`.circular`, `.continuous`). |
| `maskedCorners` | `CACornerMask` | Which corners to round. |
| `borderWidth` | `CGFloat` | Width of the layer border. Animatable. |
| `borderColor` | `CGColor?` | Color of the layer border. Animatable. |
| `masksToBounds` | `Bool` | Clips sublayers to the layer's bounds. Animatable. |
| `mask` | `CALayer?` | A layer whose alpha channel masks the receiver's content. |

### Shadow

| Name | Type | Description |
|------|------|-------------|
| `shadowOpacity` | `Float` | Shadow opacity in `[0, 1]`. Animatable. |
| `shadowRadius` | `CGFloat` | Shadow blur radius. Animatable. |
| `shadowOffset` | `CGSize` | Shadow offset. Animatable. |
| `shadowColor` | `CGColor?` | Shadow color. Animatable. |
| `shadowPath` | `CGPath?` | Explicit shadow shape (improves performance). Animatable. |

### Transform

| Name | Type | Description |
|------|------|-------------|
| `transform` | `CATransform3D` | 3D transform applied to the layer. Animatable. |
| `sublayerTransform` | `CATransform3D` | Transform applied to all sublayers. Animatable. |

### Rendering

| Name | Type | Description |
|------|------|-------------|
| `isOpaque` | `Bool` | Hint that the layer is fully opaque (enables optimizations). |
| `shouldRasterize` | `Bool` | Renders layer tree as a bitmap before compositing. Animatable. |
| `rasterizationScale` | `CGFloat` | Scale for rasterized bitmap. |
| `drawsAsynchronously` | `Bool` | Draw layer content on a background thread. |

### Hierarchy

| Name | Type | Description |
|------|------|-------------|
| `superlayer` | `CALayer?` | The parent layer. Read-only. |
| `sublayers` | `[CALayer]?` | Array of child layers. |
| `delegate` | `CALayerDelegate?` | Object receiving layer delegate callbacks. |
| `name` | `String?` | An optional name for the layer. |

## Key Methods

```swift
// Hierarchy management
func addSublayer(_ layer: CALayer)
func removeFromSuperlayer()
func insertSublayer(_ layer: CALayer, at idx: UInt32)
func insertSublayer(_ layer: CALayer, above sibling: CALayer?)
func replaceSublayer(_ layer: CALayer, with newLayer: CALayer)

// Animation
func add(_ anim: CAAnimation, forKey key: String?)
func animation(forKey key: String) -> CAAnimation?
func removeAnimation(forKey key: String)
func removeAllAnimations()
func animationKeys() -> [String]?

// Layout
func setNeedsLayout()
func layoutIfNeeded()
func setNeedsDisplay()
func displayIfNeeded()

// Coordinate conversion
func convert(_ point: CGPoint, from layer: CALayer?) -> CGPoint
func convert(_ point: CGPoint, to layer: CALayer?) -> CGPoint

// Hit testing
func hitTest(_ point: CGPoint) -> CALayer?
func contains(_ point: CGPoint) -> Bool

// Presentation / model tree
func presentation() -> Self?
func model() -> Self
```

## Notes

- iOS 2.0+, iPadOS 2.0+, macOS 10.5+, tvOS 9.0+, visionOS 1.0+, Mac Catalyst 13.1+
- Set `contentsScale` to `UIScreen.main.scale` when using raster content for correct resolution.
- Use `presentation()` to read the in-flight animated values; use `model()` to access the model-layer values.
- Setting `shadowPath` explicitly avoids expensive per-frame path computation and dramatically improves shadow rendering performance.
- `shouldRasterize` caches the layer as a bitmap; invalidated whenever the layer changes — avoid for frequently changing layers.

## Related

- [CAShapeLayer](./cashapelayer.md)
- [CAGradientLayer](./cagradientlayer.md)
- [CATextLayer](./catextlayer.md)
- [CAEmitterLayer](./caemitterlayer.md)
- [CAReplicatorLayer](./careplicatorlayer.md)
- [CAAnimation](./caanimation.md)
- [CATransaction](./catransaction.md)
