# AVPlayerLayer

A Core Animation layer that presents the visual contents of an `AVPlayer`. Use it when you need direct CALayer integration or custom rendering pipelines.

## Signature / Usage

```swift
class AVPlayerLayer: CALayer

// Create with a player
let playerLayer = AVPlayerLayer(player: player)
playerLayer.frame = view.bounds
playerLayer.videoGravity = .resizeAspect
view.layer.addSublayer(playerLayer)

// Recommended UIKit pattern — make AVPlayerLayer the view's backing layer
class PlayerView: UIView {
    override class var layerClass: AnyClass { AVPlayerLayer.self }

    var player: AVPlayer? {
        get { playerLayer.player }
        set { playerLayer.player = newValue }
    }

    private var playerLayer: AVPlayerLayer { layer as! AVPlayerLayer }
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `player` | `AVPlayer?` | The player providing visual content |
| `videoGravity` | `AVLayerVideoGravity` | Fit/fill mode: `.resizeAspect`, `.resizeAspectFill`, `.resize` |
| `isReadyForDisplay` | `Bool` | `true` once the first frame is ready to show |
| `videoRect` | `CGRect` | Actual video frame within the layer's bounds (read-only) |

## Notes

- iOS 4.0+, iPadOS 4.0+, macOS 10.7+, tvOS 9.0+, visionOS 1.0+, Mac Catalyst 13.1+
- The inherited `contents` property is opaque; do not modify it.
- KVO-observe `isReadyForDisplay` to know when the first frame is available.
- For frame-accurate pixel buffer access, attach an `AVPlayerItemVideoOutput` instead.
- On macOS use `AVPlayerView` (AppKit) for a ready-made controls UI.

## Related

- [AVPlayer](./avplayer.md)
- [AVPlayerViewController](./avplayerviewcontroller.md)
- [AVPlayerItemVideoOutput](./avplayeritemvideooutput.md)
