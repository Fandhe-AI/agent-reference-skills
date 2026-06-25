# NSProgressIndicator

An interface that provides visual feedback to the user about the status of an ongoing task.

## Signature / Usage

```swift
class NSProgressIndicator : NSView
```

```swift
// Determinate bar
let bar = NSProgressIndicator()
bar.style = .bar
bar.isIndeterminate = false
bar.minValue = 0
bar.maxValue = 100
bar.doubleValue = 42

// Indeterminate spinning indicator
let spinner = NSProgressIndicator()
spinner.style = .spinning
spinner.isIndeterminate = true
spinner.startAnimation(nil)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `doubleValue` | `Double` | Current progress value |
| `minValue` | `Double` | Minimum value of the range |
| `maxValue` | `Double` | Maximum value of the range |
| `isIndeterminate` | `Bool` | `true` = spinning/animating; `false` = determinate |
| `style` | `NSProgressIndicator.Style` | `.bar` (horizontal bar) or `.spinning` (activity spinner) |
| `isDisplayedWhenStopped` | `Bool` | Whether the indicator hides when animation stops |
| `usesThreadedAnimation` | `Bool` | Whether animation runs on a background thread |
| `controlSize` | `NSControl.ControlSize` | Size variant: `.regular`, `.small`, `.mini` |

## Notes

- Platform: macOS.
- `startAnimation(_:)` / `stopAnimation(_:)` control animation for indeterminate indicators.
- `increment(by:)` advances `doubleValue` for determinate progress updates.
- `sizeToFit()` resizes the view to the natural size for the current `controlSize`.

## Related

- [NSView](./nsview.md)
- [NSSlider](./nsslider.md)
