# KeyFrameAnalysisRequest

A request that identifies the best representative frame of a video. The result contains the frame's timestamp.

## Signature / Usage

```swift
final class KeyFrameAnalysisRequest: VideoAnalyzer.Request

let request = KeyFrameAnalysisRequest()
let result = try await VideoAnalyzer.shared.analyze(asset, for: request)

switch result {
case .success(let keyframe):
    // Move the player to this frame or extract a thumbnail.
    let timestamp = keyframe.timestamp
case .failure(let error):
    // Handle the error.
}
```

## Options / Props

`KeyFrameAnalysisRequest.Result` (struct, "the output of a key frame analysis"):

| Name | Type | Description |
|------|------|-------------|
| `timestamp` | `CMTime` | Identifies the most representative frame in the video |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+
- Created with `init()`. Conforms to `Sendable`, `SendableMetatype` and `VideoAnalyzer.Request`.
- Use the timestamp to seek a player or extract a thumbnail (for example with `AVAssetImageGenerator`).

## Related

- [VideoAnalyzer](./videoanalyzer.md)
- [HighlightAnalysisRequest](./highlightanalysisrequest.md)
- [Finding the best moments in a video](./finding-the-best-moments-in-a-video.md)
