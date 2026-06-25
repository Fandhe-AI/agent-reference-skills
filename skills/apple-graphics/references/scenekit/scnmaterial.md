# SCNMaterial

A set of shading attributes that define the appearance of a geometry's surface when rendered.

## Signature / Usage

```swift
let material = SCNMaterial()
material.diffuse.contents = UIColor.red          // solid color
material.normal.contents = UIImage(named: "bump") // texture
material.lightingModel = .physicallyBased
material.metalness.contents = 0.8
material.roughness.contents = 0.2
material.isDoubleSided = true

geometry.materials = [material]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `diffuse` | `SCNMaterialProperty` | Diffuse response to lighting |
| `specular` | `SCNMaterialProperty` | Specular (shiny) response to lighting |
| `ambient` | `SCNMaterialProperty` | Response to ambient lighting |
| `normal` | `SCNMaterialProperty` | Surface normal map for per-pixel lighting |
| `emission` | `SCNMaterialProperty` | Color emitted regardless of lighting |
| `metalness` | `SCNMaterialProperty` | PBR metallic factor |
| `roughness` | `SCNMaterialProperty` | PBR surface roughness |
| `ambientOcclusion` | `SCNMaterialProperty` | Multiplied with ambient light |
| `clearCoat` | `SCNMaterialProperty` | Clear coat layer (PBR) |
| `lightingModel` | `SCNMaterial.LightingModel` | Rendering algorithm (`.physicallyBased`, `.blinn`, `.phong`, `.lambert`, `.constant`) |
| `transparency` | `CGFloat` | Uniform transparency 0–1 (animatable) |
| `transparencyMode` | `SCNTransparencyMode` | How alpha is interpreted |
| `blendMode` | `SCNBlendMode` | Pixel blending mode |
| `isDoubleSided` | `Bool` | Render both front and back faces |
| `fillMode` | `SCNFillMode` | Polygon fill (`.fill`, `.lines`) |
| `name` | `String?` | Identifier |

## Notes

- Available on iOS 8.0+, macOS 10.8+, tvOS 9.0+, visionOS 1.0+. Deprecated in version 26.0.
- Each visual property (`diffuse`, `specular`, etc.) is an `SCNMaterialProperty` whose `contents` can be a `UIColor`/`NSColor`, `UIImage`/`NSImage`, `CALayer`, `SKScene`, `MDLTexture`, or a number.
- Multiple geometries can share the same material instance.
- Conforms to `SCNAnimatable`, `SCNShadable`.

## Related

- [SCNGeometry](./scngeometry.md)
- [SCNLight](./scnlight.md)
- [SCNNode](./scnnode.md)
