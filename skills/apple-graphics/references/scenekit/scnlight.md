# SCNLight

A light source that can be attached to an `SCNNode` to illuminate a scene.

## Signature / Usage

```swift
let light = SCNLight()
light.type = .spot
light.color = UIColor.white
light.intensity = 1000          // lumens
light.castsShadow = true
light.shadowRadius = 3.0
light.spotInnerAngle = 30
light.spotOuterAngle = 60
light.attenuationEndDistance = 100

let lightNode = SCNNode()
lightNode.light = light
lightNode.position = SCNVector3(0, 10, 0)
scene.rootNode.addChildNode(lightNode)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `type` | `SCNLight.LightType` | `.omni`, `.directional`, `.spot`, `.ambient`, `.IES`, `.probe`, `.area` |
| `color` | `Any` | Light color (animatable) |
| `intensity` | `CGFloat` | Luminous flux in lumens (animatable) |
| `temperature` | `CGFloat` | Color temperature in Kelvin (animatable) |
| `castsShadow` | `Bool` | Enables shadow casting |
| `shadowRadius` | `CGFloat` | Shadow edge softness (animatable) |
| `shadowColor` | `Any` | Shadow color (animatable) |
| `shadowMapSize` | `CGSize` | Resolution of the shadow map |
| `shadowSampleCount` | `Int` | Samples per pixel for shadow map |
| `shadowMode` | `SCNShadowMode` | Rendering mode (`.forward`, `.deferred`, `.modulated`) |
| `shadowBias` | `CGFloat` | Bias to reduce self-shadowing artifacts |
| `zNear` | `CGFloat` | Near distance for shadow rendering |
| `zFar` | `CGFloat` | Far distance for shadow rendering |
| `attenuationStartDistance` | `CGFloat` | Distance where intensity begins to fade (animatable) |
| `attenuationEndDistance` | `CGFloat` | Distance where intensity reaches zero (animatable) |
| `attenuationFalloffExponent` | `CGFloat` | Falloff curve exponent (animatable) |
| `spotInnerAngle` | `CGFloat` | Fully lit cone angle in degrees (animatable) |
| `spotOuterAngle` | `CGFloat` | Partially lit cone angle in degrees (animatable) |
| `gobo` | `SCNMaterialProperty?` | Texture that shapes the light's illumination |
| `categoryBitMask` | `Int` | Selectively illuminates nodes with matching masks |
| `iesProfileURL` | `URL?` | IES photometric profile for `.IES` type |

## Notes

- Available on iOS 8.0+, macOS 10.8+, tvOS 9.0+, visionOS 1.0+. Deprecated in version 26.0.
- Limit to 3 real-time lights per scene element for performance; prefer baked light maps for static scenes.
- Set `attenuationEndDistance` to restrict a light's area of influence and reduce GPU load.
- Conforms to `SCNAnimatable`.

## Related

- [SCNNode](./scnnode.md)
- [SCNMaterial](./scnmaterial.md)
- [SCNScene](./scnscene.md)
