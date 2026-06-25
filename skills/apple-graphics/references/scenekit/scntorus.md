# SCNTorus

A ring-shaped (donut) geometry defined by a large ring radius and a smaller pipe radius.

## Signature / Usage

```swift
let torus = SCNTorus(ringRadius: 1.0, pipeRadius: 0.25)
torus.ringSegmentCount = 48
torus.pipeSegmentCount = 24

let node = SCNNode(geometry: torus)
scene.rootNode.addChildNode(node)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ringRadius` | `CGFloat` | Major radius (center to pipe center) (animatable) |
| `pipeRadius` | `CGFloat` | Minor radius (pipe cross-section) (animatable) |
| `ringSegmentCount` | `Int` | Subdivisions around the ring (animatable) |
| `pipeSegmentCount` | `Int` | Subdivisions around the pipe cross-section (animatable) |

## Notes

- Available on iOS 8.0+, macOS 10.8+, tvOS 9.0+, visionOS 1.0+. Deprecated in version 26.0.
- Inherits from `SCNGeometry`.

## Related

- [SCNGeometry](./scngeometry.md)
- [SCNMaterial](./scnmaterial.md)
- [SCNNode](./scnnode.md)
