# AppStorage

A property wrapper that reflects a value from `UserDefaults` and invalidates a view when the value changes.

## Signature / Usage

```swift
@frozen @propertyWrapper struct AppStorage<Value>
```

```swift
struct ContentView: View {
    @AppStorage("username") private var username: String = "Guest"
    @AppStorage("darkMode") private var darkMode: Bool = false

    var body: some View {
        Toggle("Dark Mode", isOn: $darkMode)
        Text("Hello, \(username)")
    }
}
```

## Notes

- iOS 14.0+ / macOS 11.0+ / tvOS 14.0+ / watchOS 7.0+ / visionOS 1.0+
- Backed by `UserDefaults.standard` by default; specify a custom store with the `store:` parameter.
- Supported value types: `Bool`, `Int`, `Double`, `String`, `URL`, `Data`, and `RawRepresentable` types whose `RawValue` is one of the above.
- `projectedValue` is a `Binding<Value>`, usable with `$` prefix.
- Use `View.defaultAppStorage(_:)` to set a custom default `UserDefaults` store for all `@AppStorage` properties in a subtree.
- For per-scene (non-persistent) state restoration, use `@SceneStorage`.
- Conforms to `DynamicProperty`.

## Related

- [SceneStorage](./scenestorage.md)
