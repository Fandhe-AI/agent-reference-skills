# SCNSphere

A sphere geometry centered at the origin of its local coordinate space.

## Signature / Usage

```swift
let sphere = SCNSphere(radius: 1.0)
sphere.segmentCount = 48       // smoother surface
sphere.isGeodesic = false

let node = SCNNode(geometry: sphere)
scene.rootNode.addChildNode(node)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `radius` | `CGFloat` | Radius of the sphere (animatable) |
| `segmentCount` | `Int` | Polygon detail level; higher = smoother (animatable) |
| `isGeodesic` | `Bool` | Use icosahedron subdivision instead of latitude-longitude grid |

## Notes

- Available on iOS 8.0+, macOS 10.8+, tvOS 9.0+, visionOS 1.0+. Deprecated in version 26.0.
- Geodesic mode (`isGeodesic = true`) produces more evenly distributed triangles; `segmentCount` scales logarithmically in that mode.
- Inherits from `SCNGeometry`.

## Related

- [SCNGeometry](./scngeometry.md)
- [SCNMaterial](./scnmaterial.md)
- [SCNNode](./scnnode.md)
- [SCNBox](./scnbox.md)
