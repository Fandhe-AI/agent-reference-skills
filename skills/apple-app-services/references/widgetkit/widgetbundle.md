# WidgetBundle

A container used to expose multiple widgets from a single widget extension.

## Signature / Usage

```swift
@MainActor @preconcurrency
protocol WidgetBundle

var body: Self.Body { get }  // required
```

```swift
@main
struct GameWidgets: WidgetBundle {
    var body: some Widget {
        GameStatusWidget()
        CharacterDetailWidget()
        LeaderboardWidget()
    }
}
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `body` | `Self.Body` | Declares all widgets the extension exposes (required) |
| `Body` | `associatedtype: Widget` | The type of widget returned from `body` |

## Notes

- iOS 14.0+, iPadOS 14.0+, macOS 11.0+, watchOS 9.0+, visionOS 1.0+
- Apply `@main` to the `WidgetBundle` conforming type to designate it as the extension entry point
- Use `WidgetBundle` whenever your extension provides more than one widget type; a single widget may use `@main` on the `Widget` conformance directly
- `ControlWidget` types can also be included in a `WidgetBundle` alongside regular widgets (iOS 18+)

## Related

- [Widget](./widget.md)
- [WidgetFamily](./widgetfamily.md)
