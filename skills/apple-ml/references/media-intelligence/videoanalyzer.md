# VideoAnalyzer

An object that analyzes video assets for highlights and key frames. It is the central object in the video analysis pipeline.

## Signature / Usage

```swift
final class VideoAnalyzer

static let shared: VideoAnalyzer

func analyze<each T>(_: MediaIntelligenceVideoAsset, for: repeat each T) async throws
    -> (repeat Result<(each T).Result, any Error>)
```

```swift
let result = try await VideoAnalyzer.shared.analyze(asset, for: HighlightAnalysisRequest())
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `shared` | `static let VideoAnalyzer` | The shared video analyzer |
| `Request` | `protocol` | A type that describes a video analysis operation |
| `Result` | `protocol` | A type that represents the output of a video analysis operation |
| `analyze(_:for:)` | `async throws` | Analyzes a video asset using the specified requests |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+
- Conforms to `Sendable` and `SendableMetatype`.
- `analyze(_:for:)` returns a tuple containing one `Swift.Result` per request, in the same order the requests are provided.
- Concurrent calls are queued and processed serially; no maximum queue depth or timeout. Supports cooperative cancellation via Swift concurrency.
- Source: https://developer.apple.com/documentation/mediaintelligence/videoanalyzer

## Related

- [Finding the best moments in a video](./finding-the-best-moments-in-a-video.md)
- [MediaIntelligenceVideoAsset](./mediaintelligencevideoasset.md)
- [HighlightAnalysisRequest](./highlightanalysisrequest.md)
- [KeyFrameAnalysisRequest](./keyframeanalysisrequest.md)
- [MediaIntelligenceError](./mediaintelligenceerror.md)
