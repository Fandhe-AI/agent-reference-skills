# UISegmentedControl

A horizontal control made of multiple segments that functions as a set of mutually exclusive buttons.

## Signature / Usage

```swift
@MainActor
class UISegmentedControl : UIControl

let control = UISegmentedControl(items: ["Day", "Week", "Month"])
control.selectedSegmentIndex = 0
control.addTarget(self, action: #selector(segmentChanged(_:)), for: .valueChanged)

@objc func segmentChanged(_ sender: UISegmentedControl) {
    print("Selected:", sender.selectedSegmentIndex)
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `selectedSegmentIndex` | `Int` | Index of the currently selected segment; `-1` if none |
| `numberOfSegments` | `Int` | Read-only count of segments |
| `isMomentary` | `Bool` | Segments do not retain selected state when `true` |
| `selectedSegmentTintColor` | `UIColor?` | Highlight color for the selected segment |
| `apportionsSegmentWidthsByContent` | `Bool` | Auto-sizes each segment to its content width |

**Managing segments:**

| Method | Description |
|--------|-------------|
| `insertSegment(withTitle:at:animated:)` | Insert a text segment |
| `insertSegment(with:at:animated:)` | Insert an image segment |
| `removeSegment(at:animated:)` | Remove a segment |
| `removeAllSegments()` | Remove all segments |
| `setTitle(_:forSegmentAt:)` | Update segment title |
| `setImage(_:forSegmentAt:)` | Update segment image |
| `setEnabled(_:forSegmentAt:)` | Enable or disable a segment |
| `setWidth(_:forSegmentAt:)` | Set fixed width for a segment |

## Notes

- Available iOS 2.0+, iPadOS 2.0+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+.
- Fires `UIControl.Event.valueChanged` when the selection changes.
- Use `UISegmentedControl(frame:actions:)` (iOS 14+) to attach `UIAction` closures directly.

## Related

- [UIControl](./uicontrol.md)
- [UIButton](./uibutton.md)
