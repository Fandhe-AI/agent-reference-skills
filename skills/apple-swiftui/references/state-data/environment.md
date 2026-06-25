# Environment

A property wrapper that reads a value from a view's environment.

## Signature / Usage

```swift
@frozen @propertyWrapper struct Environment<Value>
```

```swift
// Read a built-in environment value via key path
@Environment(\.colorScheme) var colorScheme: ColorScheme

// Read an @Observable object injected into the environment
@Environment(Library.self) private var library
```

```swift
struct LibraryView: View {
    @Environment(Library.self) private var library

    var body: some View {
        Text("Books: \(library.books.count)")
    }
}

// Inject at a parent:
ContentView()
    .environment(Library())
    .environment(\.locale, Locale(identifier: "ja"))
```

## Notes

- iOS 13.0+ / macOS 10.15+ / tvOS 13.0+ / watchOS 6.0+ / visionOS 1.0+
- Two overloads: `init(_:)` for key-path access (`EnvironmentValues` key paths) and type-based access for `@Observable` objects.
- For `ObservableObject` types use `@EnvironmentObject` instead.
- Reading an `@Observable` object via `Environment` can return an optional (`Library?`) if the object may not be present.
- Conforms to `DynamicProperty`.

## Related

- [EnvironmentValues](./environmentvalues.md)
- [EnvironmentObject](./environmentobject.md)
