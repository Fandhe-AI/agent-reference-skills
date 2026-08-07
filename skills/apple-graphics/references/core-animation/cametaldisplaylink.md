# CAMetalDisplayLink

A class that allows Metal apps to register for callbacks to synchronize animations with display refresh rates, with specialized control over timing windows and rendering delays.

## Signature / Usage

```swift
class CAMetalDisplayLink : NSObject

let displayLink = CAMetalDisplayLink(metalLayer: metalLayer)
displayLink.delegate = myDelegate
displayLink.preferredFrameRateRange = CAFrameRateRange(minimum: 60, maximum: 120, preferred: 120)
displayLink.add(to: RunLoop.main, forMode: .common)

// CAMetalDisplayLinkDelegate
func metalDisplayLink(_ link: CAMetalDisplayLink, needsUpdate update: CAMetalDisplayLink.Update) {
    let drawable = update.drawable
    // encode and present using drawable.texture
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `delegate` | `CAMetalDisplayLinkDelegate?` | Instance implementing `CAMetalDisplayLinkDelegate` that responds to system callbacks. |
| `preferredFrameRateRange` | `CAFrameRateRange` | Range of frequencies for frame updates; affects callback frequency. |
| `preferredFrameLatency` | `Int` | Amount of time (in frames) the app requests to render a frame. |
| `isPaused` | `Bool` | Suspends/resumes notifications without removing from the run loop. |

## Notes

- iOS 17.0+, iPadOS 17.0+, macOS 14.0+, tvOS 17.0+, visionOS 1.0+, Mac Catalyst 17.0+
- For less visually intensive apps or non-Metal apps, use `CADisplayLink` instead.
- Register with `add(to:forMode:)` and remove with `remove(from:forMode:)`; call `invalidate()` to remove from all run loops.
- `CAMetalDisplayLink.Update` carries the information (including a `CAMetalDrawable`) for a single frame update.

## Related

- [CADisplayLink](./cadisplaylink.md)
- [CAMetalDrawable](./cametaldrawable.md)
