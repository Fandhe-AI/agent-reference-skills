# CAMediaTimingFunction

A function that defines the pacing of an animation as a timing curve, mapping normalized input time `[0, 1]` to normalized output time `[0, 1]`.

## Signature / Usage

```swift
class CAMediaTimingFunction : NSObject
// Conforms to: NSSecureCoding, NSCoding

// Predefined curve
let easeOut = CAMediaTimingFunction(name: .easeOut)

// Custom cubic Bézier (control points x1, y1, x2, y2)
let custom = CAMediaTimingFunction(controlPoints: 0.25, 0.1, 0.25, 1.0)

let anim = CABasicAnimation(keyPath: "opacity")
anim.timingFunction = easeOut
anim.duration = 0.3
```

## Options / Props

### Predefined names (`CAMediaTimingFunctionName`)

| Name | Description |
|------|-------------|
| `.linear` | Constant speed throughout. |
| `.easeIn` | Slow start, accelerates toward the end. |
| `.easeOut` | Fast start, decelerates toward the end. |
| `.easeInEaseOut` | Slow at both ends, fastest in the middle. |
| `.default` | System-defined default curve (similar to ease-in-ease-out). |

### Initializers

| Initializer | Description |
|-------------|-------------|
| `init(name: CAMediaTimingFunctionName)` | Creates a timing function from a predefined name. |
| `init(controlPoints: Float, Float, Float, Float)` | Creates a custom cubic Bézier curve with control points `(x1, y1, x2, y2)`. |

### Control point access

```swift
func getControlPoint(at index: Int, values: UnsafeMutablePointer<Float>)
// Returns the control point at the given index (0–3) into a 2-element Float buffer.
```

## Notes

- iOS 2.0+, iPadOS 2.0+, macOS 10.5+, tvOS 9.0+, visionOS 1.0+, Mac Catalyst 13.1+
- Control point format mirrors CSS `cubic-bezier(x1, y1, x2, y2)` — the two anchor points are always `(0,0)` and `(1,1)`.
- In `CAKeyframeAnimation`, use the `timingFunctions` array to specify a different curve per keyframe segment.

## Related

- [CAAnimation](./caanimation.md)
- [CABasicAnimation](./cabasicanimation.md)
- [CAKeyframeAnimation](./cakeyframeanimation.md)
- [CATransaction](./catransaction.md)
