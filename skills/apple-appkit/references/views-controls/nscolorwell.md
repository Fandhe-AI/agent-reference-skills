# NSColorWell

A control that displays a color value and lets the user change that color value, typically by opening a color picker popover or the system color panel.

## Signature / Usage

```swift
class NSColorWell : NSControl
```

```swift
// Default color well
let colorWell = NSColorWell(style: .default)
colorWell.color = .systemBlue
colorWell.supportsAlpha = false
colorWell.target = self
colorWell.action = #selector(colorChanged(_:))

@objc func colorChanged(_ sender: NSColorWell) {
    applyColor(sender.color)
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `color` | `NSColor` | The currently selected color |
| `isActive` | `Bool` | Whether the color well is currently active (showing the panel) |
| `colorWellStyle` | `NSColorWell.Style` | Appearance and interaction style |
| `supportsAlpha` | `Bool` | Whether the color picker exposes alpha/opacity controls |
| `pulldownTarget` | `AnyObject?` | Target for color-area click action |
| `pulldownAction` | `Selector?` | Action performed when the color area is clicked |
| `maximumLinearExposure` | `CGFloat` | Maximum linear exposure for HDR color support (≥1, default 1) |
| `isBordered` | `Bool` | Whether a border is drawn (deprecated) |

## Notes

- Platform: macOS.
- `activate(_:)` activates the well and shows the color panel; `deactivate()` dismisses it.
- `takeColorFrom(_:)` changes the selected color to match another object's color.
- `init(style:)` is the preferred initializer; use `NSColorWell.Style` to choose between default, minimal, and expanded styles.

## Related

- [NSControl](./nscontrol.md)
