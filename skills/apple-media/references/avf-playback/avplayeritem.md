# AVPlayerItem

An object that models the timing and presentation state of an asset during playback. Acts as the bridge between an `AVAsset` and `AVPlayer`.

## Signature / Usage

```swift
@MainActor
class AVPlayerItem: NSObject

// Create from URL (asset created implicitly)
let item = AVPlayerItem(url: url)

// Create from asset
let asset = AVURLAsset(url: url)
let item = AVPlayerItem(asset: asset)

// Observe buffering state (KVO)
item.addObserver(self, forKeyPath: "status", options: .new, context: nil)

// Seek within item
item.seek(to: time, toleranceBefore: .zero, toleranceAfter: .zero) { finished in }

// Listen for playback end
NotificationCenter.default.addObserver(
    self,
    selector: #selector(itemDidFinish),
    name: .AVPlayerItemDidPlayToEndTime,
    object: item
)
```

## Options / Props

| Property / Method | Type | Description |
|-------------------|------|-------------|
| `status` | `AVPlayerItem.Status` | `.unknown`, `.readyToPlay`, `.failed` |
| `error` | `Error?` | Non-nil when `status == .failed` |
| `asset` | `AVAsset` | The underlying asset |
| `duration` | `CMTime` | Total duration (may be `.indefinite` for live streams) |
| `currentTime()` | `() -> CMTime` | Current playback position |
| `timebase` | `CMTimebase?` | Reference timebase |
| `isPlaybackLikelyToKeepUp` | `Bool` | Buffer sufficient for continued playback |
| `isPlaybackBufferEmpty` | `Bool` | Buffer exhausted |
| `isPlaybackBufferFull` | `Bool` | Buffer fully preloaded |
| `loadedTimeRanges` | `[NSValue]` (CMTimeRange) | Buffered time ranges |
| `seekableTimeRanges` | `[NSValue]` (CMTimeRange) | Seekable time ranges |
| `tracks` | `[AVPlayerItemTrack]` | Player item tracks |
| `audioMix` | `AVAudioMix?` | Per-track audio mix parameters |
| `videoComposition` | `AVVideoComposition?` | Video composition (effects, size) |
| `textStyleRules` | `[AVTextStyleRule]?` | Subtitle/caption text style overrides |
| `preferredPeakBitRate` | `Double` | Bandwidth cap in bits/sec (0 = no limit) |
| `preferredForwardBufferDuration` | `TimeInterval` | How far ahead to buffer |
| `canPlayFastForward` | `Bool` | Supports fast-forward |
| `canPlayReverse` | `Bool` | Supports reverse playback |
| `step(byCount:)` | `(Int)` | Advance/retreat by frame count |
| `cancelPendingSeeks()` | `()` | Cancel in-flight seek operations |
| `add(_ output:)` / `remove(_ output:)` | methods | Attach/detach `AVPlayerItemOutput` instances |
| `accessLog()` | `() -> AVPlayerItemAccessLog?` | Network access log |
| `errorLog()` | `() -> AVPlayerItemErrorLog?` | Playback error log |

## Notes

- iOS 4.0+, iPadOS 4.0+, macOS 10.7+, tvOS 9.0+, visionOS 1.0+, watchOS 1.0+
- Marked `@MainActor`.
- An `AVPlayerItem` can only be associated with one `AVPlayer` at a time.
- Key notifications: `.AVPlayerItemDidPlayToEndTime`, `.AVPlayerItemFailedToPlayToEndTime`, `.AVPlayerItemPlaybackStalled`.
- Prefer `AVPlayerItem(asset:automaticallyLoadedAssetKeys:)` to control which asset keys are preloaded before status becomes `.readyToPlay`.

## Related

- [AVPlayer](./avplayer.md)
- [AVAsset](./avasset.md)
- [AVURLAsset](./avurlasset.md)
- [AVPlayerItemVideoOutput](./avplayeritemvideooutput.md)
