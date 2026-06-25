# SCNPlane

A rectangular, one-sided plane geometry defined in the x-y dimensions of its local coordinate space.

## Signature / Usage

```swift
let plane = SCNPlane(width: 10, height: 10)
plane.cornerRadius = 0.5      // optional rounded corners
plane.materials = [groundMaterial]

let planeNode = SCNNode(geometry: plane)
planeNode.eulerAngles.x = -.pi / 2  // lay flat on ground
scene.rootNode.addChildNode(planeNode)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `width` | `CGFloat` | Extent along x-axis (animatable) |
| `height` | `CGFloat` | Extent along y-axis (animatable) |
| `widthSegmentCount` | `Int` | Subdivisions along x (animatable) |
| `heightSegmentCount` | `Int` | Subdivisions along y (animatable) |
| `cornerRadius` | `CGFloat` | Rounding radius for corners (animatable) |
| `cornerSegmentCount` | `Int` | Segments per rounded corner (animatable) |

## Notes

- Available on iOS 8.0+, macOS 10.8+, tvOS 9.0+, visionOS 1.0+. Deprecated in version 26.0.
- One-sided by default (visible from +z side only); set `material.isDoubleSided = true` for both sides.
- Surface normal points in the +z direction; rotate the node to reorient.
- Inherits from `SCNGeometry`.

## Related

- [SCNGeometry](./scngeometry.md)
- [SCNMaterial](./scnmaterial.md)
- [SCNNode](./scnnode.md)
- [SCNBox](./scnbox.md)
