# Material

A protocol describing the surface properties of a 3D mesh, such as color and texture.

## Signature / Usage

```swift
protocol Material

// Assign materials to a ModelComponent
let materials: [any Material] = [
    SimpleMaterial(color: .red, isMetallic: false),
]
let model = ModelComponent(mesh: mesh, materials: materials)
```

## Conforming Types

| Type | Description |
|------|-------------|
| `SimpleMaterial` | Basic material responding to scene lights |
| `PhysicallyBasedMaterial` | Full PBR material with roughness, metallic, clearcoat, etc. |
| `UnlitMaterial` | Flat color/texture with no lighting or shadows |
| `VideoMaterial` | Renders a video stream on a mesh surface |
| `OcclusionMaterial` | Hides real-world content behind virtual objects |
| `ShaderGraphMaterial` | Material driven by a Reality Composer Pro shader graph |
| `CustomMaterial` | Fully custom Metal shader integration |
| `PortalMaterial` | Renders content visible only through a portal |

## Notes

- Available: iOS 13.0+, iPadOS 13.0+, macOS 10.15+, Mac Catalyst 13.0+, tvOS 26.0+, visionOS 1.0+
- A `ModelComponent` can have multiple materials; the count must match `mesh.expectedMaterialCount`.
- USDZ import automatically creates `PhysicallyBasedMaterial` instances from embedded material data.

## Related

- [SimpleMaterial](./simplematerial.md)
- [PhysicallyBasedMaterial](./physicallybasedmaterial.md)
- [ModelComponent](./modelcomponent.md)
- [MeshResource](./meshresource.md)
