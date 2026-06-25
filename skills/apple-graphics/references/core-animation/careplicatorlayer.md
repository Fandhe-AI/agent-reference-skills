# CAReplicatorLayer

A layer that creates a specified number of copies of its sublayers, each with varying geometric, temporal, and color transformations.

## Signature / Usage

```swift
class CAReplicatorLayer : CALayer

let replicator = CAReplicatorLayer()
replicator.instanceCount = 8
replicator.instanceTransform = CATransform3DMakeRotation(.pi / 4, 0, 0, 1)
replicator.instanceDelay = 0.1

let dot = CALayer()
dot.bounds = CGRect(x: 0, y: 0, width: 10, height: 10)
dot.position = CGPoint(x: 0, y: -40)
dot.backgroundColor = UIColor.white.cgColor
replicator.addSublayer(dot)
view.layer.addSublayer(replicator)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `instanceCount` | `Int` | Total number of instances to create, including the original sublayer (default `1`). |
| `instanceDelay` | `CFTimeInterval` | Time offset applied cumulatively to each successive instance's animations. Animatable. |
| `instanceTransform` | `CATransform3D` | Transform matrix applied cumulatively between each instance. Animatable. |
| `instanceColor` | `CGColor?` | Base color multiplied into each instance. Animatable. |
| `instanceRedOffset` | `Float` | Red channel delta added to each successive instance's color. Animatable. |
| `instanceGreenOffset` | `Float` | Green channel delta added to each successive instance's color. Animatable. |
| `instanceBlueOffset` | `Float` | Blue channel delta added to each successive instance's color. Animatable. |
| `instanceAlphaOffset` | `Float` | Alpha channel delta added to each successive instance's color. Animatable. |
| `preservesDepth` | `Bool` | When `true`, sublayers are not flattened into the replicator plane. |

## Notes

- iOS 3.0+, iPadOS 3.0+, macOS 10.6+, tvOS 9.0+, visionOS 1.0+, Mac Catalyst 13.1+
- `instanceDelay` is useful for staggered animations (e.g., loading spinners, wave effects).
- Color offsets accumulate linearly: instance `n` receives offset × n applied to the source color.
- `hitTest(_:)` currently tests only the first instance of sublayers — do not rely on hit-testing replicated layers.
- Replicator layers can be nested to produce grid or matrix arrangements.

## Related

- [CALayer](./calayer.md)
- [CAAnimation](./caanimation.md)
