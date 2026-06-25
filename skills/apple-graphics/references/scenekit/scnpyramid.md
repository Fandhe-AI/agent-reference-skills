# SCNPyramid

A right rectangular pyramid geometry with a rectangular base in the x-z plane and four triangular faces meeting at an apex.

## Signature / Usage

```swift
let pyramid = SCNPyramid(width: 2.0, height: 3.0, length: 2.0)

let node = SCNNode(geometry: pyramid)
scene.rootNode.addChildNode(node)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `width` | `CGFloat` | Extent of the base along x-axis (animatable) |
| `height` | `CGFloat` | Extent from base to apex along y-axis (animatable) |
| `length` | `CGFloat` | Extent of the base along z-axis (animatable) |
| `widthSegmentCount` | `Int` | Subdivisions along x in each face (animatable) |
| `heightSegmentCount` | `Int` | Subdivisions along y in each face (animatable) |
| `lengthSegmentCount` | `Int` | Subdivisions along z in each face (animatable) |

## Notes

- Available on iOS 8.0+, macOS 10.8+, tvOS 9.0+, visionOS 1.0+. Deprecated in version 26.0.
- Contains five geometry elements (1 base + 4 triangular sides); each can use a different material.
- Inherits from `SCNGeometry`.

## Related

- [SCNGeometry](./scngeometry.md)
- [SCNMaterial](./scnmaterial.md)
- [SCNCone](./scncone.md)
- [SCNBox](./scnbox.md)
