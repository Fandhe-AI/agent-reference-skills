# CADisplayLink

A timer object that allows your app to synchronize its drawing to the refresh rate of the display.

## Signature / Usage

```swift
class CADisplayLink : NSObject

// Create and schedule
let displayLink = CADisplayLink(target: self, selector: #selector(step))
displayLink.preferredFrameRateRange = CAFrameRateRange(minimum: 60, maximum: 120, preferred: 120)
displayLink.add(to: .main, forMode: .common)

@objc func step(_ link: CADisplayLink) {
    let elapsed = link.targetTimestamp - link.timestamp
    // Update your content here
}

// Stop when done
displayLink.invalidate()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `timestamp` | `CFTimeInterval` | Time when the last frame was displayed. |
| `targetTimestamp` | `CFTimeInterval` | Time when the next frame will be displayed. Use this for animation calculations to avoid lag. |
| `duration` | `CFTimeInterval` | Time interval between display refreshes (read-only). |
| `isPaused` | `Bool` | Suspends notifications when `true` without removing from the run loop. |
| `preferredFrameRateRange` | `CAFrameRateRange` | Desired minimum, maximum, and preferred frame rate (iOS 15+, macOS 14+). Preferred over deprecated properties. |
| `preferredFramesPerSecond` | `Int` | Deprecated. Use `preferredFrameRateRange`. |
| `frameInterval` | `Int` | Deprecated. Use `preferredFrameRateRange`. |

## Key Methods

```swift
init(target: Any, selector: Selector)                   // Create a display link
func add(to runloop: RunLoop, forMode mode: RunLoop.Mode)   // Schedule on a run loop
func remove(from runloop: RunLoop, forMode mode: RunLoop.Mode) // Deschedule from a run loop
func invalidate()                                        // Unschedule from all run loops
```

## Notes

- iOS 3.1+, iPadOS 3.1+, macOS 14.0+, tvOS 9.0+, visionOS 1.0+, Mac Catalyst 13.1+
- Do not subclass `CADisplayLink`.
- Always use `targetTimestamp` (not `timestamp`) for computing the state of animations to prevent a one-frame lag.
- On ProMotion devices, actual frame rates are factors of the maximum refresh rate (e.g., 15, 20, 30, 60, 80, 120 Hz on a 120 Hz display).
- Call `invalidate()` when the display link is no longer needed; the object is retained by the run loop until invalidated.
- For Metal rendering, prefer `CAMetalDisplayLink` which provides a drawable directly in the callback.

## Related

- [CALayer](./calayer.md)
- [CAAnimation](./caanimation.md)
