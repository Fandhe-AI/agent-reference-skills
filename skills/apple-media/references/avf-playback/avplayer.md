# AVPlayer

An object that provides the interface to control the player's transport behavior. Manages playback and timing of media assets, supporting local files, remote files, and HTTP Live Streaming.

## Signature / Usage

```swift
@MainActor
class AVPlayer: NSObject

// Create from URL
let player = AVPlayer(url: url)

// Create from player item
let player = AVPlayer(playerItem: item)

// Playback control
player.play()
player.pause()

// Seeking
player.seek(to: time) { finished in ... }

// Periodic observation
let token = player.addPeriodicTimeObserver(
    forInterval: CMTime(seconds: 0.5, preferredTimescale: 600),
    queue: .main
) { time in
    // update UI
}
// Must balance with removeTimeObserver(_:)
```

## Options / Props

| Property / Method | Type | Description |
|-------------------|------|-------------|
| `currentItem` | `AVPlayerItem?` | The currently playing item |
| `status` | `AVPlayer.Status` | Readiness: `.unknown`, `.readyToPlay`, `.failed` |
| `timeControlStatus` | `AVPlayer.TimeControlStatus` | `.paused`, `.playing`, `.waitingToPlayAtSpecifiedRate` |
| `rate` | `Float` | Current playback rate (1.0 = normal speed) |
| `defaultRate` | `Float` | Rate used when `play()` is called |
| `volume` | `Float` | Audio volume 0.0–1.0 |
| `isMuted` | `Bool` | Mute state |
| `error` | `(any Error)?` | Error if `status == .failed` |
| `automaticallyWaitsToMinimizeStalling` | `Bool` | Buffer-before-play behavior |
| `reasonForWaitingToPlay` | `AVPlayer.WaitingReason?` | Why playback is waiting |
| `actionAtItemEnd` | `AVPlayer.ActionAtItemEnd` | Behavior when item finishes (`.advance`, `.pause`, `.none`) |
| `allowsExternalPlayback` | `Bool` | Enables AirPlay / HDMI output |
| `sourceClock` | `CMClock?` | Reference clock for synchronised multi-player playback |
| `replaceCurrentItem(with:)` | method | Swap current item without creating a new player |
| `seek(to:toleranceBefore:toleranceAfter:completionHandler:)` | method | Precise seek with tolerance control |
| `playImmediately(atRate:)` | method | Play at rate without waiting |
| `addPeriodicTimeObserver(forInterval:queue:using:)` | method | Callback at regular time intervals |
| `addBoundaryTimeObserver(forTimes:queue:using:)` | method | Callback when playhead crosses times |
| `removeTimeObserver(_:)` | method | Remove a previously added time observer |

## Notes

- iOS 4.0+, iPadOS 4.0+, macOS 10.7+, tvOS 9.0+, visionOS 1.0+, watchOS 1.0+
- Marked `@MainActor`; access only from the main thread.
- To display video, attach the player to an `AVPlayerLayer` or use `AVPlayerViewController` / `VideoPlayer`.
- Observe `status` via KVO or Swift Observation before calling `play()` to ensure the player is ready.
- Time observer tokens must be kept alive and removed with `removeTimeObserver(_:)` to avoid retain cycles.
- `AVQueuePlayer` is the recommended subclass for playlist-style playback.

## Related

- [AVQueuePlayer](./avqueueplayer.md)
- [AVPlayerItem](./avplayeritem.md)
- [AVPlayerLayer](./avplayerlayer.md)
- [AVPlayerViewController](./avplayerviewcontroller.md)
- [VideoPlayer](./videoplayer.md)
