# WidgetPreviewContext

A specification for the context of a widget preview.

## Signature / Usage

```swift
struct WidgetPreviewContext
```

```swift
struct Widget_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            MyWidgetView()
                .previewContext(WidgetPreviewContext(family: .systemSmall))
        }
    }
}
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `init(family:)` | `init(family: WidgetFamily)` | Creates a context for previewing a widget or a widget's view |

## Notes

- Available iOS 14.0+, iPadOS 14.0+, Mac Catalyst 14.0+, macOS 11.0+, visionOS 26.0+, watchOS 9.0+. Conforms to `PreviewContext`.
- To preview a widget in Xcode, use `previewContext(_:)` and pass a `WidgetPreviewContext` initialized with the appropriate `WidgetFamily`.
- Source: https://developer.apple.com/documentation/widgetkit/widgetpreviewcontext (fetched 2026-11-14)

## Related

- [WidgetFamily](./widgetfamily.md)
- [Widget](./widget.md)
