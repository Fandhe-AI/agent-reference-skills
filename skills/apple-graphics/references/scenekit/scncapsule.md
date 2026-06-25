# SCNCapsule

A cylinder geometry capped with hemispheres at both ends. Useful as a physics collision shape for characters.

## Signature / Usage

```swift
let capsule = SCNCapsule(capRadius: 0.5, height: 2.0)
capsule.radialSegmentCount = 32
capsule.capSegmentCount = 16

let node = SCNNode(geometry: capsule)
scene.rootNode.addChildNode(node)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `capRadius` | `CGFloat` | Radius of the cylindrical body and hemispherical caps (animatable) |
| `height` | `CGFloat` | Total extent along y-axis including caps (animatable) |
| `radialSegmentCount` | `Int` | Subdivisions around the circumference (animatable) |
| `heightSegmentCount` | `Int` | Subdivisions along the cylinder sides (animatable) |
| `capSegmentCount` | `Int` | Subdivisions in each hemispherical cap (animatable) |

## Notes

- Available on iOS 8.0+, macOS 10.8+, tvOS 9.0+, visionOS 1.0+. Deprecated in version 26.0.
- Inherits from `SCNGeometry`.

## Related

- [SCNGeometry](./scngeometry.md)
- [SCNCylinder](./scncylinder.md)
- [SCNPhysicsBody](./scnphysicsbody.md)
