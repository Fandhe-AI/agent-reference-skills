# SCNBox

A six-sided rectangular box geometry, optionally with chamfered (rounded) edges and corners.

## Signature / Usage

```swift
let box = SCNBox(width: 2.0, height: 2.0, length: 2.0, chamferRadius: 0.1)
box.materials = [redMaterial]   // one material per face, or one shared

let node = SCNNode(geometry: box)
scene.rootNode.addChildNode(node)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `width` | `CGFloat` | Extent along x-axis (animatable) |
| `height` | `CGFloat` | Extent along y-axis (animatable) |
| `length` | `CGFloat` | Extent along z-axis (animatable) |
| `chamferRadius` | `CGFloat` | Curvature radius of edges and corners (animatable) |
| `widthSegmentCount` | `Int` | Subdivisions along x (animatable) |
| `heightSegmentCount` | `Int` | Subdivisions along y (animatable) |
| `lengthSegmentCount` | `Int` | Subdivisions along z (animatable) |
| `chamferSegmentCount` | `Int` | Segments used per chamfered edge (animatable) |

## Notes

- Available on iOS 8.0+, macOS 10.8+, tvOS 9.0+, visionOS 1.0+. Deprecated in version 26.0.
- Up to six materials can be assigned (one per face); excess materials are ignored.
- Higher segment counts improve lighting quality at a rendering performance cost.
- Inherits from `SCNGeometry`.

## Related

- [SCNGeometry](./scngeometry.md)
- [SCNMaterial](./scnmaterial.md)
- [SCNNode](./scnnode.md)
- [SCNSphere](./scnsphere.md)
