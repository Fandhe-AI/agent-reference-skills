# AVPlayerItemVideoOutput

An object that outputs video pixel buffers from a player item for custom rendering or frame-level processing (e.g., Metal, Core Image, OpenGL).

## Signature / Usage

```swift
class AVPlayerItemVideoOutput: AVPlayerItemOutput

// Create with pixel buffer attributes
let attributes: CVPixelBufferAttributes = [
    kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA
]
let output = AVPlayerItemVideoOutput(pixelBufferAttributes: attributes)

// Or with output settings
let output = AVPlayerItemVideoOutput(outputSettings: [
    kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA
])

// Attach to player item
playerItem.add(output)

// In a display link or render loop:
let currentTime = playerItem.currentTime()
if output.hasNewPixelBuffer(forItemTime: currentTime) {
    let (pixelBuffer, displayTime) = output.pixelBufferAndDisplayTime(forItemTime: currentTime)
    // render pixelBuffer
}
```

## Options / Props

| Initializer | Description |
|-------------|-------------|
| `init(pixelBufferAttributes:)` | Create with `CVPixelBufferAttributes` dictionary |
| `init(outputSettings:)` | Create with output settings dictionary |

| Method | Signature | Description |
|--------|-----------|-------------|
| `hasNewPixelBuffer(forItemTime:)` | `(CMTime) -> Bool` | Whether a new pixel buffer is available at the given time |
| `pixelBufferAndDisplayTime(forItemTime:)` | `(CMTime) -> (CVReadOnlyPixelBuffer?, CMTime)` | Retrieve pixel buffer and the time at which it should be displayed |
| `copyPixelBuffer(forItemTime:itemTimeForDisplay:)` | `(CMTime, UnsafeMutablePointer<CMTime>?) -> CVPixelBuffer?` | Deprecated — use `pixelBufferAndDisplayTime` |
| `requestNotificationOfMediaDataChange(withAdvanceInterval:)` | `(TimeInterval)` | Request delegate notification before new data arrives |
| `setDelegate(_:queue:)` | `(AVPlayerItemOutputPullDelegate?, DispatchQueue?)` | Set delegate for pull-mode notifications |

| Property | Type | Description |
|----------|------|-------------|
| `delegate` | `AVPlayerItemOutputPullDelegate?` | Receives media-data-change notifications |
| `delegateQueue` | `DispatchQueue?` | Queue on which delegate callbacks are called |

## Notes

- iOS 6.0+, iPadOS 6.0+, macOS 10.8+, tvOS 9.0+, visionOS 1.0+, Mac Catalyst 13.1+
- Must be added to an `AVPlayerItem` via `add(_:)` before use; remove with `remove(_:)` when done.
- Drive frame retrieval from a `CADisplayLink` or `MTKView` render loop synchronized to the display refresh rate.
- `copyPixelBuffer(forItemTime:itemTimeForDisplay:)` is deprecated; prefer `pixelBufferAndDisplayTime(forItemTime:)`.

## Related

- [AVPlayerItem](./avplayeritem.md)
- [AVPlayerLayer](./avplayerlayer.md)
