# SpeechModels

Namespace for methods related to model management.

## Signature / Usage

```swift
enum SpeechModels
```

```swift
// Release all models held by cached recognizer instances
await SpeechModels.endRetention()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `static endRetention()` | `async` | Releases all models held by cached recognizer instances. The method does not return until all models are released. |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+.
- Pairs with `SpeechAnalyzer.Options.ModelRetention`, which caches models for later analyzers.

## Related

- [SpeechAnalyzer](./speechanalyzer.md)
- [AssetInstallationRequest](./assetinstallationrequest.md)
