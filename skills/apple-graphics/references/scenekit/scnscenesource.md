# SCNSceneSource

Manages data-reading tasks for loading scene contents from a file or data object, with optional selective element extraction.

## Signature / Usage

```swift
// Load full scene from bundle URL
let url = Bundle.main.url(forResource: "scene", withExtension: "dae",
                          subdirectory: "art.scnassets")!
let source = SCNSceneSource(url: url, options: nil)!
let scene = try source.scene(options: nil)

// Load selectively — extract a single node by identifier
let node = source.entryWithIdentifier("Hero", withClass: SCNNode.self)

// List all geometry identifiers
let ids = source.identifiersOfEntries(withClass: SCNGeometry.self)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `url` | `URL?` | Source file URL |
| `data` | `Data?` | In-memory scene data |

### Key `SCNSceneSource.LoadingOption` keys

| Key | Description |
|-----|-------------|
| `.animationImportPolicy` | How animations are imported |
| `.assetDirectoryURLs` | Additional asset search paths |
| `.strictConformance` | Strict vs. lenient format parsing |
| `.createNormalsIfAbsent` | Auto-generate surface normals |
| `.flattenScene` | Merge scene graph into one node |
| `.checkConsistency` | Validate scene consistency on load |

## Notes

- Available on iOS 8.0+, macOS 10.8+, tvOS 9.0+, visionOS 1.0+. Deprecated in version 26.0.
- Supported formats: `.dae` (Collada), `.abc` (Alembic), `.scn` (SceneKit archive).
- `entryWithIdentifier(_:withClass:)` loads only one object, reducing memory compared to loading the full scene.
- `entries(passingTest:)` allows custom filtering across all entries.
- `scene(options:statusHandler:)` provides async progress callbacks for large files.
- `property(forKey:)` retrieves scene-level metadata (author, creation date, etc.).

## Related

- [SCNScene](./scnscene.md)
- [SCNNode](./scnnode.md)
- [SCNGeometry](./scngeometry.md)
