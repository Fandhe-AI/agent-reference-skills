# SceneStorage

A property wrapper that reads and writes persisted, per-scene storage for state restoration.

## Signature / Usage

```swift
@frozen @propertyWrapper struct SceneStorage<Value>
```

```swift
struct DocumentView: View {
    @SceneStorage("selectedTab") private var selectedTab: Int = 0

    var body: some View {
        TabView(selection: $selectedTab) {
            Text("Tab 1").tag(0)
            Text("Tab 2").tag(1)
        }
    }
}
```

## Notes

- iOS 14.0+ / macOS 11.0+ / tvOS 14.0+ / watchOS 7.0+ / visionOS 1.0+
- Automatically restored by the system when a scene resumes; timing and frequency of persistence are not guaranteed.
- Each scene has its own isolated storage — data is not shared across scenes.
- Store only lightweight data (not large model data).
- Data is **destroyed** when a scene is explicitly closed (iPadOS switcher dismiss, macOS window close) — do not store sensitive data.
- Supported value types mirror `AppStorage`: `Bool`, `Int`, `Double`, `String`, `URL`, `Data`, and `RawRepresentable` types.
- `projectedValue` is a `Binding<Value>` accessible via `$`.
- Conforms to `DynamicProperty`.

## Related

- [AppStorage](./appstorage.md)
- [State](./state.md)
