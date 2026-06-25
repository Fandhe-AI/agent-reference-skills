# SKTexture

A GPU-decoded image that can be applied to `SKSpriteNode`, `SKShapeNode`, `SKEmitterNode`, and `SKTileMapNode`. Texture data is immutable once created; multiple nodes may share one instance.

## Signature / Usage

```swift
// Load from app bundle asset catalog
let texture = SKTexture(imageNamed: "hero")

// Sub-texture from an atlas region
let subTexture = SKTexture(rect: CGRect(x: 0, y: 0, width: 0.5, height: 1.0),
                            in: atlasTexture)
```

## Options / Props

### Properties

| Name | Type | Description |
|------|------|-------------|
| `filteringMode` | `SKTextureFilteringMode` | `.nearest` (pixel art) or `.linear` (default, smooth) |
| `usesMipmaps` | `Bool` | Generate mipmaps for smoother scaling at small sizes |

### Key Methods

```swift
func size() -> CGSize        // Native size of the texture in points
func textureRect() -> CGRect // Normalized texture coordinates (0–1 range)
func cgImage() -> CGImage    // Returns underlying Quartz image
```

### Initializers

```swift
// From bundle / assets
SKTexture(imageNamed: String)

// From images
SKTexture(image: UIImage)
SKTexture(cgImage: CGImage)

// Sub-region of an existing texture
SKTexture(rect: CGRect, in: SKTexture)

// Raw pixel data
SKTexture(data: Data, size: CGSize)
SKTexture(data: Data, size: CGSize, rowLength: UInt32, alignment: UInt32)

// Noise
SKTexture(noiseMap: GKNoiseMap)
SKTexture(vectorNoiseWithSmoothness: CGFloat, size: CGSize, grayscale: Bool)
```

### Preloading

```swift
// Preload a single texture asynchronously
func preload(completionHandler: @escaping () -> Void)

// Preload multiple textures
class func preload(_ textures: [SKTexture],
                   withCompletionHandler: @escaping () -> Void)
```

## Notes

- Available: iOS 7+, macOS 10.9+, tvOS 9+, visionOS 1+, watchOS 10+.
- A texture stays in GPU memory until all strong references (from sprites, atlases, and your code) are released.
- Use `SKTextureAtlas` to pack related textures for fewer draw calls.
- `SKMutableTexture` allows dynamic pixel updates for procedural content.

## Related

- [SKTextureAtlas](./sktextureatlas.md)
- [SKSpriteNode](./skspritenode.md)
- [SKEmitterNode](./skemitternode.md)
