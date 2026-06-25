# SCNCone

A right circular cone or frustum geometry. Set `topRadius` to 0 for a true cone, or to a non-zero value for a truncated cone (frustum).

## Signature / Usage

```swift
// True cone
let cone = SCNCone(topRadius: 0, bottomRadius: 1, height: 2)

// Frustum (truncated cone)
let frustum = SCNCone(topRadius: 0.5, bottomRadius: 1.0, height: 2.0)

let node = SCNNode(geometry: cone)
scene.rootNode.addChildNode(node)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `topRadius` | `CGFloat` | Radius at the top (0 = pointed cone) (animatable) |
| `bottomRadius` | `CGFloat` | Radius of the circular base (animatable) |
| `height` | `CGFloat` | Extent along y-axis (animatable) |
| `radialSegmentCount` | `Int` | Subdivisions around circumference (animatable) |
| `heightSegmentCount` | `Int` | Subdivisions along y-axis (animatable) |

## Notes

- Available on iOS 8.0+, macOS 10.8+, tvOS 9.0+, visionOS 1.0+. Deprecated in version 26.0.
- Contains 2–3 geometry elements (outer surface, base, optional top); each can have a different material.
- Inherits from `SCNGeometry`.

## Related

- [SCNGeometry](./scngeometry.md)
- [SCNMaterial](./scnmaterial.md)
- [SCNCylinder](./scncylinder.md)
- [SCNPyramid](./scnpyramid.md)
