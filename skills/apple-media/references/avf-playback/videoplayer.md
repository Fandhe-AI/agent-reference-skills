# VideoPlayer

A SwiftUI view that displays content from an `AVPlayer` with native transport controls, chapter navigation, Picture in Picture, subtitles, and closed captions.

## Signature / Usage

```swift
// AVKit (SwiftUI)
@MainActor @preconcurrency
struct VideoPlayer<VideoOverlay> where VideoOverlay: View

// Basic usage
import AVKit
import AVFoundation

struct ContentView: View {
    @State private var player: AVPlayer?

    var body: some View {
        VideoPlayer(player: player)
            .frame(width: 320, height: 180)
            .task {
                player = AVPlayer(url: mediaURL)
                player?.play()
            }
    }
}

// With custom overlay
VideoPlayer(player: player) {
    VStack {
        Text("Custom overlay")
        Spacer()
    }
}
```

## Options / Props

| Initializer | Description |
|-------------|-------------|
| `init(player: AVPlayer?)` | Basic player view; `VideoOverlay` is `EmptyView` |
| `init(player: AVPlayer?, videoOverlay: () -> VideoOverlay)` | Player view with a custom overlay `View` on top |

## Notes

- iOS 14.0+, iPadOS 14.0+, macOS 11.0+, tvOS 14.0+, visionOS 1.0+, watchOS 7.0+, Mac Catalyst 14.0+
- Marked `@MainActor`.
- Playback is controlled entirely through the `AVPlayer` instance — call `play()`, `pause()`, `seek(to:)` on the player directly.
- Use `.task` to create the player to avoid side effects during SwiftUI body evaluation.
- The overlay view is rendered above the video but below the system transport controls.
- For UIKit, use `AVPlayerViewController` instead.

## Related

- [AVPlayer](./avplayer.md)
- [AVPlayerViewController](./avplayerviewcontroller.md)
