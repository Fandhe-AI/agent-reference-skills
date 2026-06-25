# WidgetFamily

An enumeration of values that define the widget's size and shape.

## Signature / Usage

```swift
@preconcurrency enum WidgetFamily
```

```swift
.supportedFamilies([.systemSmall, .systemMedium, .systemLarge])

// In a TimelineProvider, check the current family:
func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> Void) {
    let isSmall = context.family == .systemSmall
    // ...
}
```

## Options / Props

**System families (Home Screen / Today View):**

| Case | Description |
|------|-------------|
| `systemSmall` | Small widget |
| `systemMedium` | Medium widget |
| `systemLarge` | Large widget |
| `systemExtraLarge` | Extra-large widget (iPad) |
| `systemExtraLargePortrait` | Extra-large portrait widget |

**Accessory families (watch face / Lock Screen complications):**

| Case | Description |
|------|-------------|
| `accessoryCircular` | Circular widget |
| `accessoryRectangular` | Rectangular widget |
| `accessoryInline` | Single-row inline widget |
| `accessoryCorner` | Corner of a watch face (watchOS) |

## Notes

- iOS 14.0+, iPadOS 14.0+, macOS 11.0+, watchOS 9.0+, visionOS 26.0+
- Conforms to `Sendable`, `Equatable`, `Hashable`, `RawRepresentable`
- Physical pixel dimensions vary by device; design content to be flexible rather than using fixed values
- Access the current family via `TimelineProviderContext.family`

## Related

- [Widget](./widget.md)
- [StaticConfiguration](./staticconfiguration.md)
- [TimelineProviderContext](./timelineprovidercontext.md)
