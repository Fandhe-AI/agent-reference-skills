# AVPlayerViewController

An AVKit view controller that displays media content from a player and presents a native system playback UI. Automatically adopts new OS styling and features.

## Signature / Usage

```swift
// AVKit
@MainActor
class AVPlayerViewController: UIViewController  // iOS/tvOS/visionOS

// Basic setup
import AVKit
import AVFoundation

let vc = AVPlayerViewController()
vc.player = AVPlayer(url: mediaURL)
present(vc, animated: true) {
    vc.player?.play()
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `player` | `AVPlayer?` | The player providing media content |
| `showsPlaybackControls` | `Bool` | Show/hide native transport controls |
| `videoGravity` | `AVLayerVideoGravity` | `.resizeAspect` (default), `.resizeAspectFill`, `.resize` |
| `contentOverlayView` | `UIView?` | View inserted between video and controls for custom overlays |
| `allowsPictureInPicturePlayback` | `Bool` | Enable Picture in Picture |
| `canStartPictureInPictureAutomaticallyFromInline` | `Bool` | Auto-start PiP on backgrounding |
| `entersFullScreenWhenPlaybackBegins` | `Bool` | Auto full-screen on play |
| `exitsFullScreenWhenPlaybackEnds` | `Bool` | Auto dismiss on end |

## Notes

- iOS 8.0+, iPadOS 8.0+, tvOS 9.0+, visionOS 1.0+, Mac Catalyst 13.1+
- Marked `@MainActor`. Subclassing is not supported.
- AirPlay is automatically enabled; configure your app's background audio capability for AirPlay to continue when backgrounded.
- For SwiftUI, prefer the `VideoPlayer` struct from AVKit instead.
- The `delegate` property (`AVPlayerViewControllerDelegate`) allows responding to full-screen transitions and PiP events.

## Related

- [AVPlayer](./avplayer.md)
- [VideoPlayer](./videoplayer.md)
- [AVPlayerLayer](./avplayerlayer.md)
