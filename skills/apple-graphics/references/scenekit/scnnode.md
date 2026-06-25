# SCNNode

A structural element of the scene graph with a position and transform in 3D space. Has no visible content by itself; attach geometry, lights, or cameras to make it visible.

## Signature / Usage

```swift
// Create a node with geometry
let sphere = SCNSphere(radius: 1.0)
let node = SCNNode(geometry: sphere)
node.position = SCNVector3(0, 5, 0)
node.name = "player"
scene.rootNode.addChildNode(node)

// Attach a light
let lightNode = SCNNode()
lightNode.light = SCNLight()
lightNode.light!.type = .omni
lightNode.position = SCNVector3(10, 10, 10)
scene.rootNode.addChildNode(lightNode)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `position` | `SCNVector3` | Translation relative to parent (animatable) |
| `rotation` | `SCNVector4` | Rotation as axis + angle (animatable) |
| `scale` | `SCNVector3` | Scale factor (animatable) |
| `transform` | `SCNMatrix4` | Combined transform relative to parent (animatable) |
| `simdTransform` | `simd_float4x4` | SIMD equivalent of `transform` |
| `simdPosition` | `simd_float3` | SIMD equivalent of `position` |
| `pivot` | `SCNMatrix4` | Pivot point for transform (animatable) |
| `geometry` | `SCNGeometry?` | 3D shape attached to the node |
| `light` | `SCNLight?` | Light source attached to the node |
| `camera` | `SCNCamera?` | Camera attached to the node |
| `physicsBody` | `SCNPhysicsBody?` | Physics simulation body |
| `physicsField` | `SCNPhysicsField?` | Physics force field |
| `morpher` | `SCNMorpher?` | Geometry blending controller |
| `skinner` | `SCNSkinner?` | Skeletal animation controller |
| `name` | `String?` | Identifier for lookup |
| `isHidden` | `Bool` | Hides the node and its children (animatable) |
| `opacity` | `CGFloat` | Transparency (animatable) |
| `castsShadow` | `Bool` | Whether node casts shadows |
| `renderingOrder` | `Int` | Render order relative to other nodes |
| `filters` | `[CIFilter]?` | Core Image filters applied to rendered content |
| `parent` | `SCNNode?` | Parent node in hierarchy |
| `childNodes` | `[SCNNode]` | Direct children |

## Notes

- Available on iOS 8.0+, macOS 10.8+, tvOS 9.0+, watchOS 3.0+, visionOS 1.0+. Deprecated in version 26.0.
- `clone()` deep-copies a node and its children; `flattenedClone()` produces an optimized single-mesh copy.
- Find descendants with `childNode(withName:recursively:)`.
- Coordinate conversion: `simdConvertPosition(_:from:)` / `simdConvertPosition(_:to:)`.
- `simdLook(at:)` and `simdRotate(by:aroundTarget:)` provide convenient orientation helpers.
- World-space convenience properties: `simdWorldPosition`, `simdWorldTransform`, `simdWorldFront`.

## Related

- [SCNScene](./scnscene.md)
- [SCNGeometry](./scngeometry.md)
- [SCNLight](./scnlight.md)
- [SCNCamera](./scncamera.md)
- [SCNPhysicsBody](./scnphysicsbody.md)
- [SCNAction](./scnaction.md)
