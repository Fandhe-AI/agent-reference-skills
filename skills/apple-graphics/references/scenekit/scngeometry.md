# SCNGeometry

A 3D shape (mesh) that can be displayed in a SceneKit scene. Combines immutable vertex data with mutable material assignments.

## Signature / Usage

```swift
// Create from vertex sources and index element
let geometry = SCNGeometry(sources: [vertexSource, normalSource, uvSource],
                           elements: [element])
let node = SCNNode(geometry: geometry)

// Reuse geometry on multiple nodes
let sphere = SCNSphere(radius: 1.0)  // built-in subclass
let nodeA = SCNNode(geometry: sphere)
let nodeB = SCNNode(geometry: sphere)  // shared, different positions

// Copy with independent materials
let copy = sphere.copy() as! SCNGeometry
copy.firstMaterial?.diffuse.contents = UIColor.red
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `materials` | `[SCNMaterial]` | Materials applied to geometry elements |
| `firstMaterial` | `SCNMaterial?` | Shorthand for `materials[0]` |
| `sources` | `[SCNGeometrySource]` | Vertex data (positions, normals, UVs, …) |
| `elements` | `[SCNGeometryElement]` | Index data describing primitives |
| `elementCount` | `Int` | Number of geometry elements |
| `name` | `String?` | Identifier |
| `levelsOfDetail` | `[SCNLevelOfDetail]?` | LOD substitutions at increasing distances |
| `subdivisionLevel` | `Int` | Catmull-Clark subdivision passes at render time |
| `wantsAdaptiveSubdivision` | `Bool` | Camera-distance-based subdivision density |
| `tessellator` | `SCNGeometryTessellator?` | GPU tessellation configuration |

## Notes

- Available on iOS 8.0+, macOS 10.8+, tvOS 9.0+, visionOS 1.0+. Deprecated in version 26.0.
- Vertex data (`sources`) is immutable after creation; only `materials` can be changed on an existing geometry.
- Use `copy()` to get an independent copy that shares vertex buffers but has its own materials array.
- `sources(for:)` retrieves sources by semantic (`.vertex`, `.normal`, `.texcoord`, …).
- `material(named:)`, `insertMaterial(_:at:)`, `removeMaterial(at:)` manage the materials array.
- Conforms to `SCNAnimatable`, `SCNBoundingVolume`, `SCNShadable`.

## Related

- [SCNGeometrySource](./scngeometrysource.md)
- [SCNMaterial](./scnmaterial.md)
- [SCNNode](./scnnode.md)
- [SCNBox](./scnbox.md)
- [SCNSphere](./scnsphere.md)
