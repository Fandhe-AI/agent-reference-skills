# EnvironmentValues

A collection of environment values propagated through a view hierarchy.

## Signature / Usage

```swift
struct EnvironmentValues
```

```swift
// Read a value
@Environment(\.locale) var locale: Locale

// Set a value
MyView()
    .environment(\.lineLimit, 2)
```

```swift
// Define a custom environment value using @Entry macro (iOS 17+ / macOS 14+)
extension EnvironmentValues {
    @Entry var myCustomValue: String = "Default"
}

extension View {
    func myCustomValue(_ value: String) -> some View {
        environment(\.myCustomValue, value)
    }
}
```

## Notes

- iOS 13.0+ / macOS 10.15+ / tvOS 13.0+ / watchOS 6.0+ / visionOS 1.0+
- Contains many built-in keys: `colorScheme`, `locale`, `font`, `dismiss`, `scenePhase`, `isEnabled`, `dynamicTypeSize`, `managedObjectContext`, `modelContext`, etc.
- iOS 27.1+ built-in keys: `splitArrangementAxis` (`Axis?`, the split axis of the enclosing split arrangement view, `nil` outside one), `overlayArrangementZIndex` (`Int`, z-index of a view inside an overlay arrangement view), `toolbarVerticalEdge` (`HorizontalEdge?`, read-only, the system's preferred edge for the vertical bar, `nil` where no vertical bar is used). The first two relate to `ArrangementView` (see the `adaptive-layout` category); `toolbarVerticalEdge` relates to vertical-axis toolbars (see [toolbar-vertical](../navigation/toolbar-vertical.md)).
- Custom keys: use the `@Entry` macro (iOS 17+/macOS 14+) or implement `EnvironmentKey` manually for older targets.
- Values flow down the view tree; a child sees the nearest ancestor's value.

## Related

- [Environment](./environment.md)
