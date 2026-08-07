# CATransformLayer

A layer used to create true 3D layer hierarchies, rather than the flattened hierarchy rendering model used by other layer types.

## Signature / Usage

```swift
class CATransformLayer : CALayer

let layer = CATransformLayer()

func layerOfColor(_ color: UIColor, zPosition: CGFloat) -> CALayer {
    let layer = CALayer()
    layer.frame = CGRect(x: 200, y: -200, width: 400, height: 400)
    layer.backgroundColor = color.cgColor
    layer.zPosition = zPosition
    layer.opacity = 0.5
    return layer
}

layer.addSublayer(layerOfColor(.red, zPosition: 20))
layer.addSublayer(layerOfColor(.green, zPosition: 40))
layer.addSublayer(layerOfColor(.blue, zPosition: 60))

var perspective = CATransform3DIdentity
perspective.m34 = -1 / 100
layer.transform = CATransform3DRotate(perspective, 0.1, 0, 1, 0)
```

## Notes

- iOS 3.0+, iPadOS 3.0+, macOS 10.6+, tvOS 9.0+, visionOS 1.0+, Mac Catalyst 13.1+
- Unlike `CALayer`, sublayers are not flattened into the Z=0 plane, so 3D transforms produce true depth ordering.
- Layer rendering properties are ignored on the transform layer itself: `backgroundColor`, `contents`, border styles, stroke properties, `filters`, `backgroundFilters`, `compositingFilter`, `mask`, `masksToBounds`, shadow properties.
- Opacity is applied individually to each sublayer rather than as a compositing group.
- `hitTest(_:)` should never be called on a transform layer — it has no 2D coordinate space.

## Related

- [CALayer](./calayer.md)
- [CAScrollLayer](./cascrolllayer.md)
- [CATiledLayer](./catiledlayer.md)
- [CAReplicatorLayer](./careplicatorlayer.md)
