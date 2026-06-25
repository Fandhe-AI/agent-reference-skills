# ModelComponent

A component that provides a mesh and materials for an entity's visual appearance.

## Signature / Usage

```swift
struct ModelComponent: Component

let mesh = MeshResource.generateBox(size: 1, cornerRadius: 0.05)
let material = SimpleMaterial(color: .blue, isMetallic: true)

let modelComponent = ModelComponent(mesh: mesh, materials: [material])
entity.components.set(modelComponent)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `mesh` | `MeshResource` | The geometry defining the model's shape |
| `materials` | `[any Material]` | Surface materials; count must match `mesh.expectedMaterialCount` |
| `boundsMargin` | `Float` | Extra margin on the bounding box for visibility culling |

## Notes

- Available: iOS 13.0+, iPadOS 13.0+, macOS 10.15+, Mac Catalyst 13.0+, tvOS 26.0+, visionOS 1.0+
- The number of materials should equal `mesh.expectedMaterialCount`; mismatches may cause rendering artifacts.
- Conforms to `Component`, `Copyable`, `Escapable`.

## Related

- [MeshResource](./meshresource.md)
- [Material](./material.md)
- [SimpleMaterial](./simplematerial.md)
- [PhysicallyBasedMaterial](./physicallybasedmaterial.md)
- [ModelEntity](./modelentity.md)
