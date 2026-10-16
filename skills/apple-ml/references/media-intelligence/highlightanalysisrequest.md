# HighlightAnalysisRequest

A request that identifies the most engaging segments of a video and scores every segment for engagement.

## Signature / Usage

```swift
final class HighlightAnalysisRequest: VideoAnalyzer.Request

let result = try await VideoAnalyzer.shared.analyze(asset, for: HighlightAnalysisRequest())

switch result {
case .success(let analysis):
    for highlight in analysis.highlights {
        // Each highlight is a time range that identifies an engaging segment.
    }
    for segment in analysis.levels {
        // Each segment pairs a time range with a floating-point engagement level.
    }
case .failure(let error):
    // Handle the error.
}
```

## Options / Props

`HighlightAnalysisRequest.Result` (struct):

| Name | Type | Description |
|------|------|-------------|
| `highlights` | `[CMTimeRange]` | The time ranges the framework identifies as highlights |
| `levels` | `[(timeRange: CMTimeRange, level: Float)]` | The engagement level of each segment in the video (0 least engaging to 9 most engaging) |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+
- Created with `init()`. Conforms to `Sendable`, `SendableMetatype` and `VideoAnalyzer.Request`.
- Combine with `KeyFrameAnalysisRequest` in one `analyze(_:for:)` call to decode the video once.

## Related

- [VideoAnalyzer](./videoanalyzer.md)
- [KeyFrameAnalysisRequest](./keyframeanalysisrequest.md)
- [Finding the best moments in a video](./finding-the-best-moments-in-a-video.md)
