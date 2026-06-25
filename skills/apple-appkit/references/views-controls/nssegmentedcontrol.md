# NSSegmentedControl

A control that displays one or more buttons in a single horizontal group.

## Signature / Usage

```swift
class NSSegmentedControl : NSControl
```

```swift
let segmented = NSSegmentedControl(
    labels: ["Day", "Week", "Month"],
    trackingMode: .selectOne,
    target: self,
    action: #selector(segmentChanged(_:))
)
segmented.segmentStyle = .automatic
segmented.selectedSegment = 0

@objc func segmentChanged(_ sender: NSSegmentedControl) {
    print("Selected index:", sender.selectedSegment)
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `segmentCount` | `Int` | Number of segments in the control |
| `selectedSegment` | `Int` | Index of the selected segment (-1 if none) |
| `segmentStyle` | `NSSegmentedControl.Style` | Visual style (`.automatic`, `.rounded`, `.texturedRounded`, `.separated`, etc.) |
| `trackingMode` | `NSSegmentedControl.SwitchTracking` | Selection behavior (`.selectOne`, `.selectAny`, `.momentary`, `.momentaryAccelerator`) |
| `segmentDistribution` | `NSSegmentedControl.Distribution` | Spacing distribution of segments |
| `borderShape` | `NSSegmentedControl.BorderShape` | Shape of the border |

## Notes

- Platform: macOS.
- Configure individual segments with `setLabel(_:forSegment:)`, `setImage(_:forSegment:)`, `setMenu(_:forSegment:)`, `setEnabled(_:forSegment:)`, `setWidth(_:forSegment:)`.
- `selectSegment(withTag:)` selects a segment by its tag value.
- Text is truncated and images are clipped if segments are too small.

## Related

- [NSControl](./nscontrol.md)
- [NSButton](./nsbutton.md)
- [NSPopUpButton](./nspopupbutton.md)
