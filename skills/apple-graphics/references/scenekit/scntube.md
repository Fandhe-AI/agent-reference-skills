# SCNTube

A hollow cylinder (pipe) geometry with an inner and outer radius along its y-axis.

## Signature / Usage

```swift
let tube = SCNTube(innerRadius: 0.5, outerRadius: 1.0, height: 2.0)
tube.radialSegmentCount = 36

let node = SCNNode(geometry: tube)
scene.rootNode.addChildNode(node)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `outerRadius` | `CGFloat` | Radius of the outer surface (animatable) |
| `innerRadius` | `CGFloat` | Radius of the inner hole (animatable) |
| `height` | `CGFloat` | Extent along y-axis (animatable) |
| `radialSegmentCount` | `Int` | Subdivisions around the circumference (animatable) |
| `heightSegmentCount` | `Int` | Subdivisions along the y-axis (animatable) |

## Notes

- Available on iOS 8.0+, macOS 10.8+, tvOS 9.0+, visionOS 1.0+. Deprecated in version 26.0.
- Contains four geometry elements (base, top, outer surface, inner surface); each can have a different material.
- Inherits from `SCNGeometry`.

## Related

- [SCNGeometry](./scngeometry.md)
- [SCNCylinder](./scncylinder.md)
- [SCNMaterial](./scnmaterial.md)
