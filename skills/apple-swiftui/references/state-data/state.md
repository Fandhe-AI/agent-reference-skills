# State

A property wrapper type that can read and write a value managed by SwiftUI.

## Signature / Usage

```swift
// Xcode 27 or later: State() macro
@attached(accessor, names: named(init), named(get), named(set)) @attached(peer, names: prefixed(`_`), prefixed(__), prefixed(`$`)) macro State()

// Xcode 26 or earlier: property wrapper
@frozen @propertyWrapper struct State<Value>

// Declare as private; access via name or $name for Binding
@State private var isPlaying: Bool = false
```

```swift
struct PlayButton: View {
    @State private var isPlaying: Bool = false

    var body: some View {
        Button(isPlaying ? "Pause" : "Play") {
            isPlaying.toggle()
        }
    }
}
```

## Notes

- iOS 13.0+ / macOS 10.15+ / tvOS 13.0+ / watchOS 6.0+ / visionOS 1.0+
- `State()` macro (Xcode 27): when you build with Xcode 27 or later, `@State` resolves to the `State()` macro; when you build with Xcode 26 or earlier, the system uses the `State` property wrapper instead. Xcode 27 is a build-tool requirement, not an OS floor — the macro page lists the same availability (iOS 13.0+ / macOS 10.15+ / tvOS 13.0+ / watchOS 6.0+ / visionOS 1.0+).
- SwiftUI updates note: "This change only initializes and stores your property once when it's a class." A `State()` property instantiates its default value the first time SwiftUI instantiates the view.
- Declare `private` to prevent external mutation via memberwise initializer.
- `wrappedValue` gives the underlying value; `projectedValue` (prefix `$`) gives a `Binding`.
- Safe to mutate from any thread; SwiftUI schedules UI updates on the main actor.
- Use `@State` with value types (structs, enums, primitives). For `@Observable` class objects, `@State` also works — pass the object to subviews via environment or direct parameter.
- For `ObservableObject` reference types, use `@StateObject` instead.

## Related

- [Binding](./binding.md)
- [Bindable](./bindable.md)
- [StateObject](./stateobject.md)
