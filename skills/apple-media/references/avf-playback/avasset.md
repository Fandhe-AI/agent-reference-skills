# AVAsset

An abstract class that models timed audiovisual media. Serves as a container for one or more `AVAssetTrack` instances representing audio, video, subtitles, and other uniformly typed media.

## Signature / Usage

```swift
@MainActor
class AVAsset: NSObject

// Typically instantiated via AVURLAsset
let asset = AVURLAsset(url: mediaURL)

// Load properties asynchronously (modern async/await API)
let duration = try await asset.load(.duration)
let tracks   = try await asset.load(.tracks)
let metadata = try await asset.load(.metadata)

// Load video tracks
let videoTracks = try await asset.loadTracks(withMediaType: .video)
```

## Options / Props

| Async Property | Type | Description |
|----------------|------|-------------|
| `duration` | `CMTime` | Total duration of the asset |
| `tracks` | `[AVAssetTrack]` | All tracks in the asset |
| `metadata` | `[AVMetadataItem]` | All metadata items |
| `commonMetadata` | `[AVMetadataItem]` | Common metadata identifiers |
| `isPlayable` | `Bool` | Whether the asset can be played |
| `isExportable` | `Bool` | Whether the asset can be exported |
| `isReadable` | `Bool` | Whether media data can be extracted |
| `isComposable` | `Bool` | Whether it can be used in a composition |
| `preferredRate` | `Float` | Preferred playback rate |
| `preferredVolume` | `Float` | Preferred audio volume |
| `preferredTransform` | `CGAffineTransform` | Preferred orientation/transform |
| `providesPreciseDurationAndTiming` | `Bool` | Whether duration/timing is precise |
| `minimumTimeOffsetFromLive` | `CMTime` | Closest to live edge for HLS |

## Notes

- iOS 4.0+, iPadOS 4.0+, macOS 10.7+, tvOS 9.0+, visionOS 1.0+, watchOS 1.0+
- `AVAsset` is abstract — always instantiate via `AVURLAsset`, `AVComposition`, or `AVMovie`.
- All properties use the async `load(_:)` API; do not access them synchronously on the main thread.
- Properties are loaded lazily; cancel loading with `cancelLoading()` when no longer needed.
- Conforms to `AVAsynchronousKeyValueLoading`.
- `AVAssetImageGenerator.dynamicRangePolicy` (iOS 18.0+, macOS 15.0+) preserves HDR data in generated images when set to match the source video (June 2024 Updates).
- Source: https://developer.apple.com/documentation/avfoundation/avassetimagegenerator/dynamicrangepolicy-swift.property (DocC JSON, fetched 2026-11-14)
- The synchronous accessors for the properties above (for example `duration`, `tracks`, `isPlayable`) are deprecated in iOS 16.0 / macOS 13.0; use `load(_:)`. `AVAssetTrack`'s synchronous accessors (for example `timeRange`) are deprecated at the same versions.
- Source: https://developer.apple.com/documentation/avfoundation/avasset/duration (DocC JSON, fetched 2026-11-14)

## Related

- [AVURLAsset](./avurlasset.md)
- [AVAssetTrack](./avassettrack.md)
- [AVPlayerItem](./avplayeritem.md)
- [AVMutableComposition](./avmutablecomposition.md)
