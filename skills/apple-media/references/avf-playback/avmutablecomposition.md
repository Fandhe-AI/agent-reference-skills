# AVMutableComposition

A mutable subclass of `AVComposition` (and thus `AVAsset`) that lets you build a composite media asset by inserting, removing, and rearranging tracks and time ranges from existing assets.

## Signature / Usage

```swift
class AVMutableComposition: AVComposition

// Create an empty composition
let composition = AVMutableComposition()

// Add a video track
guard let videoTrack = composition.addMutableTrack(
    withMediaType: .video,
    preferredTrackID: kCMPersistentTrackID_Invalid
) else { return }

// Insert a time range from a source asset
let sourceAsset = AVURLAsset(url: clipURL)
let sourceDuration = try await sourceAsset.load(.duration)
let sourceTracks   = try await sourceAsset.loadTracks(withMediaType: .video)

try videoTrack.insertTimeRange(
    CMTimeRange(start: .zero, duration: sourceDuration),
    of: sourceTracks[0],
    at: .zero
)

// Use composition for playback
let playerItem = AVPlayerItem(asset: composition)
let player = AVPlayer(playerItem: playerItem)
```

## Options / Props

| Method | Signature | Description |
|--------|-----------|-------------|
| `init(urlAssetInitializationOptions:)` | `([String: Any]?)` | Create composition with options passed to internal URL assets |
| `addMutableTrack(withMediaType:preferredTrackID:)` | `(AVMediaType, CMPersistentTrackID) -> AVMutableCompositionTrack?` | Add an empty mutable track |
| `removeTrack(_:)` | `(AVCompositionTrack)` | Remove a track from the composition |
| `mutableTrack(compatibleWith:)` | `(AVAssetTrack) -> AVMutableCompositionTrack?` | Find/return a compatible existing track |
| `insertTimeRange(_:of:at:isolation:)` | async | Insert all tracks from an asset in a time range at a given start time |
| `insertEmptyTimeRange(_:)` | `(CMTimeRange)` | Insert silence/blank frames across all tracks |
| `removeTimeRange(_:)` | `(CMTimeRange)` | Remove a time range from all tracks |
| `scaleTimeRange(_:toDuration:)` | `(CMTimeRange, CMTime)` | Time-stretch a range across all tracks |

| Property | Type | Description |
|----------|------|-------------|
| `tracks` | `[AVMutableCompositionTrack]` | Mutable array of composition tracks |
| `naturalSize` | `CGSize` | Set the encoded/authored visual size |

## Notes

- iOS 4.0+, iPadOS 4.0+, macOS 10.7+, tvOS 9.0+, visionOS 1.0+, watchOS 1.0+
- Inherits all `AVAsset` async loading APIs.
- Use `kCMPersistentTrackID_Invalid` as `preferredTrackID` to let the system assign a track ID.
- Audio and video tracks must be inserted separately; one `insertTimeRange` call only inserts tracks of the same media type on a single `AVMutableCompositionTrack`.
- For export, wrap the composition in `AVAssetExportSession`; for playback, wrap in `AVPlayerItem`.
- Call `composition.copy() as? AVComposition` to get an immutable snapshot for export or playback.

## Related

- [AVAsset](./avasset.md)
- [AVAssetTrack](./avassettrack.md)
- [AVPlayerItem](./avplayeritem.md)
