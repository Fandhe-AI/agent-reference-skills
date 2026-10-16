# MediaIntelligenceError

An error that indicates a media analysis operation failed. Framework methods throw it when they encounter a problem processing a request.

## Signature / Usage

```swift
enum MediaIntelligenceError

do {
    let result = try await VideoAnalyzer.shared.analyze(asset, for: HighlightAnalysisRequest())
} catch let error as MediaIntelligenceError {
    // Inspect the case, e.g. .mediaProcessing
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `faceGroupProcessing` | case | The framework can't complete a face grouping operation |
| `mediaProcessing` | case | The framework can't process a media asset |
| `resultFetching` | case | The framework can't retrieve analysis results |
| `workingDirectory` | case | The framework can't access the working directory |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+
- Conforms to `Equatable`, `Error`, `Hashable`, `LocalizedError`, `Sendable` and `SendableMetatype`.
- The `catch` pattern above is illustrative; the source page documents only the type and its cases.
- Source: https://developer.apple.com/documentation/mediaintelligence/mediaintelligenceerror

## Related

- [FaceGroupAnalyzer](./facegroupanalyzer.md)
- [VideoAnalyzer](./videoanalyzer.md)
