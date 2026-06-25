# AVAssetTrack

A class that models a single, uniformly typed media track within an `AVAsset` (audio, video, subtitles, closed captions, timed metadata, etc.).

## Signature / Usage

```swift
class AVAssetTrack: NSObject

// Load tracks from an asset
let videoTracks = try await asset.loadTracks(withMediaType: .video)

// Load individual track properties asynchronously
if let track = videoTracks.first {
    let timeRange    = try await track.load(.timeRange)
    let frameRate    = try await track.load(.nominalFrameRate)
    let naturalSize  = try await track.load(.naturalSize)
    let isPlayable   = try await track.load(.isPlayable)
}
```

## Options / Props

| Async Property | Type | Description |
|----------------|------|-------------|
| `mediaType` | `AVMediaType` | The type of media (`.video`, `.audio`, `.text`, etc.) |
| `timeRange` | `CMTimeRange` | Track's time range within the asset timeline |
| `isEnabled` | `Bool` | Whether the track is enabled by default |
| `isPlayable` | `Bool` | Whether the track is playable in the current environment |
| `isDecodable` | `Bool` | Whether the track is decodable |
| `nominalFrameRate` | `Float` | Frame rate in frames per second (video tracks) |
| `naturalSize` | `CGSize` | Natural display dimensions of the track |
| `naturalTimeScale` | `CMTimeScale` | Natural time scale of the media |
| `estimatedDataRate` | `Float` | Estimated data rate in bits/sec |
| `formatDescriptions` | `[CMFormatDescription]` | Format descriptions of media samples |
| `mediaCharacteristics` | `[AVMediaCharacteristic]` | Characteristics (audible, visual, legible, etc.) |
| `segments` | `[AVAssetTrackSegment]` | Mapping of sample times to timeline times |
| `metadata` | `[AVMetadataItem]` | Track-level metadata |

## Notes

- iOS 4.0+, iPadOS 4.0+, macOS 10.7+, tvOS 9.0+, visionOS 1.0+, watchOS 1.0+
- Conforms to `AVAsynchronousKeyValueLoading`; all properties must be loaded via `load(_:)`.
- Access `AVAssetTrack` instances via `AVAsset.load(.tracks)` or `loadTracks(withMediaType:)`.
- Subclasses: `AVCompositionTrack`, `AVFragmentedAssetTrack`, `AVMovieTrack`.

## Related

- [AVAsset](./avasset.md)
- [AVURLAsset](./avurlasset.md)
- [AVMutableComposition](./avmutablecomposition.md)
