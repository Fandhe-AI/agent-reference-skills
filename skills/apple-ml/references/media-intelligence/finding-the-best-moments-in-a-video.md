# Finding the best moments in a video

Identify keyframes and highlight segments using on-device analysis. `VideoAnalyzer` evaluates engagement across a video and returns highlights and the most representative frame.

## Signature / Usage

```swift
let assetID: String // identifier your app persists for this file, e.g. a UUID
let asset = MediaIntelligenceVideoAsset(
    id: MediaIntelligenceVideoAsset.ID(assetID),
    kind: .url(videoURL)
)

// Keyframe
let result = try await VideoAnalyzer.shared.analyze(asset, for: KeyFrameAnalysisRequest())
switch result {
case .success(let keyframe):
    let timestamp = keyframe.timestamp
case .failure(let error):
    // Handle the error.
}

// Highlights, and highlights + keyframe in one call
let (highlightResult, keyframeResult) = try await VideoAnalyzer.shared.analyze(
    asset,
    for: HighlightAnalysisRequest(),
         KeyFrameAnalysisRequest()
)

switch highlightResult {
case .success(let analysis):
    // Work with highlights and engagement levels.
case .failure(let error):
    // Handle the highlight analysis error.
}
```

## Notes

- Concurrent requests are queued and processed serially. The framework imposes no maximum queue depth or timeout; the app manages how many analyses it enqueues.
- `HighlightAnalysisRequest.Result.highlights` is an array of `CMTimeRange` for the most engaging segments. `levels` is a per-segment breakdown with a floating-point engagement level from `0` (least engaging) to `9` (most engaging).
- `KeyFrameAnalysisRequest` result `timestamp` is a `CMTime`; use it to seek a player or generate a thumbnail (for example with `AVAssetImageGenerator`).
- Passing several requests to a single `analyze(_:for:)` call decodes the video once, so it is more efficient. Each request produces its own `Result`, so successes and failures are handled independently.
- Cancellation is cooperative: cancel the Task calling `analyze(_:for:)`. The analyzer checks periodically and returns early, but because in-progress Neural Engine work must be cancelled the method can take a moment to return.
- The official sample uses `url.lastPathComponent`, which collides for files with the same name; absolute container paths can change across app updates or restores, so this page uses an identifier the app persists (or a path relative to a managed root).
- Source: https://developer.apple.com/documentation/mediaintelligence/finding-the-best-moments-in-a-video

## Related

- [VideoAnalyzer](./videoanalyzer.md)
- [MediaIntelligenceVideoAsset](./mediaintelligencevideoasset.md)
- [HighlightAnalysisRequest](./highlightanalysisrequest.md)
- [KeyFrameAnalysisRequest](./keyframeanalysisrequest.md)
