# SKSpriteNode

An onscreen graphical element rendered from a texture or solid color. The primary node type for displaying 2D images in SpriteKit.

## Signature / Usage

```swift
// From image asset
let hero = SKSpriteNode(imageNamed: "hero")
hero.position = CGPoint(x: 200, y: 300)
scene.addChild(hero)

// Solid color
let box = SKSpriteNode(color: .red, size: CGSize(width: 50, height: 50))
```

## Options / Props

### Core

| Name | Type | Description |
|------|------|-------------|
| `texture` | `SKTexture?` | Texture used to draw the sprite |
| `size` | `CGSize` | Dimensions in points |
| `anchorPoint` | `CGPoint` | Point within the sprite that maps to `position` (default `(0.5, 0.5)`) |
| `color` | `UIColor` | Tint color or solid fill when no texture |
| `colorBlendFactor` | `CGFloat` | Blend between texture and `color` (0 = texture only, 1 = color only) |
| `blendMode` | `SKBlendMode` | How the sprite composites onto its parent's framebuffer |

### Lighting & Shadows

| Name | Type | Description |
|------|------|-------------|
| `lightingBitMask` | `UInt32` | Lights (by category) that illuminate this sprite |
| `shadowedBitMask` | `UInt32` | Lights that cast shadows onto this sprite |
| `shadowCastBitMask` | `UInt32` | Lights this sprite occludes (casts shadow for) |
| `normalTexture` | `SKTexture?` | Normal map for 3D lighting simulation |

### Advanced Rendering

| Name | Type | Description |
|------|------|-------------|
| `centerRect` | `CGRect` | Enable nine-part (9-slice) texture stretching |
| `shader` | `SKShader?` | Custom GLSL fragment shader |
| `attributeValues` | `[String: SKAttributeValue]` | Per-node values passed to the shader |

### Initializers

```swift
convenience init(imageNamed name: String)
convenience init(imageNamed name: String, normalMapped: Bool)
convenience init(texture: SKTexture?)
convenience init(texture: SKTexture?, size: CGSize)
convenience init(texture: SKTexture?, color: UIColor, size: CGSize)
convenience init(color: UIColor, size: CGSize)
```

## Notes

- Available: iOS 7+, macOS 10.9+, tvOS 9+, visionOS 1+, watchOS 10+.
- Multiple sprites can share the same `SKTexture` instance — load once, reuse freely.
- Use `colorBlendFactor` with `SKAction.colorize` for runtime tint animations.

## Related

- [SKTexture](./sktexture.md)
- [SKTextureAtlas](./sktextureatlas.md)
- [SKNode](./sknode.md)
- [SKAction](./skaction.md)
