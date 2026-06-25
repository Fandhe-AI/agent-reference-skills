# UISlider

A control for selecting a single value from a continuous range.

## Signature / Usage

```swift
@MainActor
class UISlider : UIControl

let slider = UISlider()
slider.minimumValue = 0
slider.maximumValue = 100
slider.value = 50
slider.isContinuous = true
slider.addTarget(self, action: #selector(sliderChanged(_:)), for: .valueChanged)

@objc func sliderChanged(_ sender: UISlider) {
    print("Value:", sender.value)
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `value` | `Float` | Current slider value |
| `minimumValue` | `Float` | Minimum selectable value |
| `maximumValue` | `Float` | Maximum selectable value |
| `isContinuous` | `Bool` | `true` (default) fires `.valueChanged` continuously; `false` fires only on release |
| `minimumTrackTintColor` | `UIColor?` | Track color between minimum and thumb |
| `maximumTrackTintColor` | `UIColor?` | Track color between thumb and maximum |
| `thumbTintColor` | `UIColor?` | Thumb (knob) color |
| `minimumValueImage` | `UIImage?` | Image displayed at the minimum end |
| `maximumValueImage` | `UIImage?` | Image displayed at the maximum end |

**Key methods:**

| Method | Description |
|--------|-------------|
| `setValue(_:animated:)` | Set value programmatically with optional animation |
| `setMinimumTrackImage(_:for:)` | Custom track image for a control state |
| `setMaximumTrackImage(_:for:)` | Custom track image for a control state |
| `setThumbImage(_:for:)` | Custom thumb image for a control state |

## Notes

- Available iOS 2.0+, iPadOS 2.0+, Mac Catalyst 13.1+, visionOS 1.0+.
- Values outside the `[minimumValue, maximumValue]` range are clamped.
- Use either tint colors or custom images—applying both resolves in favor of the most recently set property.
- When using custom track/thumb images, provide images for every relevant `UIControl.State`.

## Related

- [UIControl](./uicontrol.md)
- [UIStepper](./uistepper.md)
- [UISwitch](./uiswitch.md)
