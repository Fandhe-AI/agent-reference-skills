# NSSlider

A bar representing a continuous range of numerical values with a knob representing the currently selected value.

## Signature / Usage

```swift
class NSSlider : NSControl
```

```swift
// Simple slider with range and action
let slider = NSSlider(value: 0.5, minValue: 0.0, maxValue: 1.0, target: self, action: #selector(sliderChanged))
slider.numberOfTickMarks = 5
slider.allowsTickMarkValuesOnly = false

// Vertical slider
slider.isVertical = true
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `minValue` | `Double` | Minimum value of the range |
| `maxValue` | `Double` | Maximum value of the range |
| `sliderType` | `NSSlider.SliderType` | `.linear` (bar) or `.circular` (rotary knob) |
| `isVertical` | `Bool` | Horizontal (`false`) or vertical (`true`) orientation |
| `numberOfTickMarks` | `Int` | Number of tick marks displayed along the slider |
| `allowsTickMarkValuesOnly` | `Bool` | Constrain knob to tick mark positions only |
| `altIncrementValue` | `Double` | Step size when the user Option-drags the knob |
| `knobThickness` | `CGFloat` | Thickness of the knob in points |
| `trackFillColor` | `NSColor?` | Color of the filled portion of the track |
| `neutralValue` | `Double` | Value from which the fill begins (defaults to `minValue`) |
| `tintProminence` | `NSTintProminence` | How strongly the tint color is applied |

## Notes

- Platform: macOS.
- The current value is read via `NSControl.doubleValue` (inherited).
- Convenience initializers: `init(target:action:)` and `init(value:minValue:maxValue:target:action:)`.

## Related

- [NSControl](./nscontrol.md)
- [NSProgressIndicator](./nsprogressindicator.md)
