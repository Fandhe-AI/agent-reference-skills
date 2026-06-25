# SCNCylinder

A right circular cylinder geometry with circular cross-sections of equal size along its y-axis.

## Signature / Usage

```swift
let cylinder = SCNCylinder(radius: 0.5, height: 2.0)
cylinder.radialSegmentCount = 36  // smoother circle

let node = SCNNode(geometry: cylinder)
scene.rootNode.addChildNode(node)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `radius` | `CGFloat` | Radius of the circular cross-section (animatable) |
| `height` | `CGFloat` | Extent along y-axis (animatable) |
| `radialSegmentCount` | `Int` | Subdivisions around circumference (animatable) |
| `heightSegmentCount` | `Int` | Subdivisions along the y-axis sides (animatable) |

## Notes

- Available on iOS 8.0+, macOS 10.8+, tvOS 9.0+, visionOS 1.0+. Deprecated in version 26.0.
- Contains three geometry elements (base, top, side); each can have a different material.
- Inherits from `SCNGeometry`.

## Related

- [SCNGeometry](./scngeometry.md)
- [SCNMaterial](./scnmaterial.md)
- [SCNNode](./scnnode.md)
- [SCNCapsule](./scncapsule.md)
- [SCNTube](./scntube.md)
