# EnvironmentObject

A property wrapper type for an `ObservableObject` that a parent or ancestor view supplies via `.environmentObject(_:)`.

## Signature / Usage

```swift
@MainActor @frozen @propertyWrapper @preconcurrency
struct EnvironmentObject<ObjectType> where ObjectType : ObservableObject
```

```swift
class UserSettings: ObservableObject {
    @Published var username = "Guest"
}

struct ContentView: View {
    @StateObject private var settings = UserSettings()

    var body: some View {
        ProfileView()
            .environmentObject(settings)
    }
}

struct ProfileView: View {
    @EnvironmentObject var settings: UserSettings

    var body: some View {
        Text("Hello, \(settings.username)")
    }
}
```

## Notes

- iOS 13.0+ / macOS 10.15+ / tvOS 13.0+ / watchOS 6.0+ / visionOS 1.0+
- Requires the object to be injected with `.environmentObject(_:)` on an ancestor view; crashes at runtime if missing.
- `projectedValue` (prefix `$`) returns a `Wrapper` that provides bindings via dynamic member lookup.
- **Prefer `@Observable` + `@Environment`** for new code targeting iOS 17+ / macOS 14+; `@EnvironmentObject` is the `ObservableObject` (Combine) equivalent.
- Conforms to `DynamicProperty`.

## Related

- [Environment](./environment.md)
- [StateObject](./stateobject.md)
- [ObservedObject](./observedobject.md)
