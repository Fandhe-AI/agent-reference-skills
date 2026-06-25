# PhysicallyBasedMaterial

A material that simulates real-world surfaces using Physically Based Rendering (PBR).

## Signature / Usage

```swift
struct PhysicallyBasedMaterial: Material

var material = PhysicallyBasedMaterial()
material.baseColor = .init(tint: .white, texture: albedoMap)
material.roughness = .init(floatLiteral: 0.4)
material.metallic  = .init(floatLiteral: 0.8)
material.emissiveColor = .init(color: .orange)

let model = ModelComponent(mesh: mesh, materials: [material])
entity.components.set(model)
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `baseColor` | `BaseColor` | Unlit surface color (solid tint or texture map) |
| `roughness` | `Roughness` | Light scattering at surface (0 = mirror, 1 = diffuse) |
| `metallic` | `Metallic` | Metallic reflectance (0 = dielectric, 1 = metallic) |
| `normal` | `Normal` | Normal map for surface detail |
| `emissiveColor` | `EmissiveColor` | Self-emitted light color |
| `clearcoat` | `Clearcoat` | Strength of transparent top coat |
| `clearcoatRoughness` | `ClearcoatRoughness` | Roughness of the clearcoat layer |
| `blending` | `Blending` | Transparency mode (`.opaque`, `.transparent(opacity:)`) |
| `faceCulling` | `FaceCulling` | Which faces are removed before rendering |
| `readsDepth` | `Bool` | Whether depth testing is performed |
| `writesDepth` | `Bool` | Whether depth buffer is written |

## Notes

- Available: iOS 15.0+, iPadOS 15.0+, macOS 12.0+, Mac Catalyst 15.0+, tvOS 26.0+, visionOS 1.0+
- USDZ import automatically produces `PhysicallyBasedMaterial` from embedded material data.
- Supports texture maps for all major properties, anisotropy, and subsurface scattering.
- Conforms to `Material`.

## Related

- [Material](./material.md)
- [SimpleMaterial](./simplematerial.md)
- [ModelComponent](./modelcomponent.md)
