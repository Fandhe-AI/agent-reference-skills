# UIStepper

A control for incrementing or decrementing a numeric value.

## Signature / Usage

```swift
@MainActor
class UIStepper : UIControl

let stepper = UIStepper()
stepper.minimumValue = 0
stepper.maximumValue = 10
stepper.stepValue = 1
stepper.value = 0
stepper.addTarget(self, action: #selector(stepperChanged(_:)), for: .valueChanged)

@objc func stepperChanged(_ sender: UIStepper) {
    print("Value:", sender.value)
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `value` | `Double` | Current numeric value |
| `minimumValue` | `Double` | Lowest allowed value |
| `maximumValue` | `Double` | Highest allowed value |
| `stepValue` | `Double` | Amount added/subtracted per tap |
| `isContinuous` | `Bool` | Fires `.valueChanged` continuously while held when `true` |
| `autorepeat` | `Bool` | Repeatedly changes value while button is held (default `true`) |
| `wraps` | `Bool` | Value wraps from max to min (and vice versa) when `true` |

## Notes

- Available iOS 5.0+, iPadOS 5.0+, Mac Catalyst 13.1+, visionOS 1.0+.
- `maximumValue` must be ≥ `minimumValue`; violating this sets both to the new value.
- Fires `UIControl.Event.valueChanged` on each increment or decrement.

## Related

- [UIControl](./uicontrol.md)
- [UISlider](./uislider.md)
