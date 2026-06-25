# SimpleMaterial

A basic material that responds to lighting in the scene.

## Signature / Usage

```swift
struct SimpleMaterial: Material

let material = SimpleMaterial(color: .red, isMetallic: false)
let model = ModelComponent(mesh: .generateBox(size: 1), materials: [material])
entity.components.set(model)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `color` | `SimpleMaterial.BaseColor` | Base color (solid `UIColor`/`NSColor` or texture) |
| `roughness` | `MaterialScalarParameter` | Surface roughness (0 = smooth, 1 = rough) |
| `metallic` | `MaterialScalarParameter` | Metallic reflectance (0 = dielectric, 1 = metallic) |
| `faceCulling` | `MaterialFaceCulling` | Which polygon faces to cull before rendering |
| `triangleFillMode` | `MaterialTriangleFillMode` | Wireframe or solid fill |
| `readsDepth` | `Bool` | Whether depth testing is performed |
| `writesDepth` | `Bool` | Whether the material writes to the depth buffer |

## Notes

- Available: iOS 13.0+, iPadOS 13.0+, macOS 10.15+, Mac Catalyst 13.0+, tvOS 26.0+, visionOS 1.0+
- The deprecated `tintColor` property (`UIColor`/`NSColor`) has been superseded by `color`.
- For more realistic results, prefer `PhysicallyBasedMaterial`.
- Conforms to `Material`.

## Related

- [Material](./material.md)
- [PhysicallyBasedMaterial](./physicallybasedmaterial.md)
- [ModelComponent](./modelcomponent.md)
