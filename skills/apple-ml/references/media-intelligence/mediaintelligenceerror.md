# MediaIntelligenceError

An error that indicates a media analysis operation failed. Framework methods throw it when they encounter a problem processing a request.

## Signature / Usage

```swift
enum MediaIntelligenceError

let asset: MediaIntelligenceVideoAsset = ...

do {
    let result = try await VideoAnalyzer.shared.analyze(asset, for: HighlightAnalysisRequest())
    switch result {
    case .success(let highlights):
        _ = highlights
    case .failure(let error as MediaIntelligenceError):
        // e.g. .mediaProcessing
        _ = error
    case .failure(let error):
        _ = error
    }
} catch let error as MediaIntelligenceError {
    // Thrown before per-request results are returned
    _ = error
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
- Illustrative pattern, not from the source page: per the `analyze(_:for:)` discussion, individual request failures are returned as `Result.failure` (typed `any Error`), so a `MediaIntelligenceError` may appear there as well as being thrown. The source page documents only the type and its cases.
- Source: https://developer.apple.com/documentation/mediaintelligence/mediaintelligenceerror

## Related

- [FaceGroupAnalyzer](./facegroupanalyzer.md)
- [VideoAnalyzer](./videoanalyzer.md)
