# MeshResource

A high-level representation of vertices and edges that define a 3D shape.

## Signature / Usage

```swift
@MainActor @preconcurrency class MeshResource: Resource

// Procedural primitives
let box    = MeshResource.generateBox(size: 0.1, cornerRadius: 0.005)
let sphere = MeshResource.generateSphere(radius: 0.05)
let plane  = MeshResource.generatePlane(width: 1, depth: 1, cornerRadius: 0)

// Use with ModelComponent
let model = ModelComponent(mesh: box, materials: [material])
entity.components.set(model)
```

## Options / Props

| Generator | Description |
|-----------|-------------|
| `generateBox(size:cornerRadius:)` | Uniform box |
| `generateBox(size:cornerRadius:)` taking `SIMD3<Float>` | Non-uniform box |
| `generateBox(width:height:depth:cornerRadius:splitFaces:)` | Box with per-face material support |
| `generateSphere(radius:)` | UV sphere |
| `generatePlane(width:height:cornerRadius:)` | Horizontal plane |
| `generatePlane(width:depth:cornerRadius:)` | Horizontal plane (depth variant) |
| `generateCylinder(height:radius:)` | Cylinder |
| `generateCone(height:radius:)` | Cone |
| `generateText(_:extrusionDepth:font:containerFrame:alignment:lineBreakMode:)` | Extruded 3D text |

| Property | Type | Description |
|----------|------|-------------|
| `bounds` | `BoundingBox` | Axis-aligned bounding box in local space |
| `expectedMaterialCount` | `Int` | Number of materials the mesh requires |
| `contents` | `MeshResource.Contents` | Underlying mesh data |
| `lowLevelMesh` | `LowLevelMesh?` | Low-level mesh handle, if any |

## Notes

- Available: iOS 13.0+, iPadOS 13.0+, macOS 10.15+, Mac Catalyst 13.0+, tvOS 26.0+, visionOS 1.0+
- Conforms to `Resource`, `Sendable`.
- Custom geometry: use `MeshDescriptor` + `MeshResource(from:)` or `LowLevelMesh` for GPU-side buffers.
- `expectedMaterialCount` must match the materials array length in `ModelComponent`.

## Related

- [ModelComponent](./modelcomponent.md)
- [ModelEntity](./modelentity.md)
- [Material](./material.md)
