# SKTextureAtlas

A collection of textures packed into a single GPU resource, reducing draw calls and improving rendering performance. Best when a set of textures is always used together.

## Signature / Usage

```swift
// Load an atlas from the app bundle (.atlas folder or asset catalog group)
let atlas = SKTextureAtlas(named: "Characters")
let heroTexture = atlas.textureNamed("hero_idle")
let sprite = SKSpriteNode(texture: heroTexture)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `textureNames` | `[String]` | Names of all textures contained in the atlas (read-only) |

### Initializers

```swift
convenience init(named name: String)                    // Load from bundle
convenience init(dictionary: [String: Any])             // Create programmatically from image data
```

### Accessing Textures

```swift
func textureNamed(_ name: String) -> SKTexture
```

### Preloading

```swift
// Preload one atlas
func preload(completionHandler: @escaping () -> Void)

// Preload multiple atlases by reference
class func preloadTextureAtlases(_ textureAtlases: [SKTextureAtlas],
    withCompletionHandler: @escaping () -> Void)

// Preload multiple atlases by name (with error handling)
class func preloadTextureAtlasesNamed(_ atlasNames: [String],
    withCompletionHandler: @escaping (Error?, [SKTextureAtlas]) -> Void)
```

## Notes

- Available: iOS 7+, macOS 10.9+, tvOS 9+, visionOS 1+, watchOS 10+.
- SpriteKit implicitly loads an atlas when any of its textures are accessed; call `preload` for explicit control over timing.
- Organize atlas folders in the asset catalog for the best Xcode tooling and automatic 1x/2x/3x scaling.
- `textureNamed(_:)` does not require the file extension in the name string.

## Related

- [SKTexture](./sktexture.md)
- [SKSpriteNode](./skspritenode.md)
