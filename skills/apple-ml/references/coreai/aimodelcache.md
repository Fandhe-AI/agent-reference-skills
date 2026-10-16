# AIModelCache

A cache that stores the specialized model artifacts for inference. Holds the optimized, device-specific artifacts that `AIModel` loads to execute its inference functions.

## Signature / Usage

```swift
final class AIModelCache

static let `default`: AIModelCache
init?(appGroup: String)
func model(for: URL, options: SpecializationOptions) throws -> AIModel?
func deleteEntry(for: URL, options: SpecializationOptions) throws
func deleteEntries(for: URL) throws
func deleteAll() throws
static func deleteEntry(referencedBy: Data) throws
```

## Options / Props

| Name | Description |
|------|-------------|
| `default` | The shared cache scoped to your app bundle |
| `init?(appGroup:)` | Creates a cache that shares specialized assets across an app group |
| `model(for:options:)` | Returns a previously specialized model from the cache, if available |
| `deleteEntry(for:options:)` | Deletes the entry for a specific model and specialization options combination |
| `deleteEntries(for:)` | Deletes all entries for a specific model, regardless of specialization options |
| `deleteAll()` | Deletes all entries in the cache |
| `deleteEntry(referencedBy:)` | Static. Deletes a cache entry referenced by bookmark data |
| `AIModelCache.Policy` | A policy that controls when the system purges specialized assets from a cache |

## Notes

- iOS 27.0+, iPadOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+. Conforms to `Sendable`, `SendableMetatype`.
- Each cache entry contains a specialized asset formed from a specific `.aimodel` or `.aimodelc` and `SpecializationOptions` combination.
- Source: https://developer.apple.com/documentation/coreai/aimodelcache

## Related

- [AIModel](./aimodel.md)
- [SpecializationOptions](./specializationoptions.md)
- [Managing model specialization and caching](./managing-model-specialization-and-caching.md)
- [Compiling Core AI models ahead of time](./compiling-core-ai-models-ahead-of-time.md)
