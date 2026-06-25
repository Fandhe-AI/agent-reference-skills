# StateObject

A property wrapper type that instantiates an `ObservableObject` and owns its lifetime.

## Signature / Usage

```swift
@MainActor @frozen @propertyWrapper @preconcurrency
struct StateObject<ObjectType> where ObjectType : ObservableObject
```

```swift
class DataModel: ObservableObject {
    @Published var name = "Some Name"
    @Published var isEnabled = false
}

struct MyView: View {
    @StateObject private var model = DataModel()

    var body: some View {
        Text(model.name)
        MySubView()
            .environmentObject(model)
    }
}
```

## Notes

- iOS 14.0+ / macOS 11.0+ / tvOS 14.0+ / watchOS 7.0+ / visionOS 1.0+
- SwiftUI creates the object **once** for the lifetime of the container; survives view re-renders.
- Declare `private` to prevent external initialization via memberwise initializer.
- To initialize with external parameters, assign `_model` in `init`:
  ```swift
  init(name: String) {
      _model = StateObject(wrappedValue: DataModel(name: name))
  }
  ```
  The closure runs only once — later parameter changes do not reinitialize the object.
- Use `.id(value)` on the view to force reinitialization when an identity-changing value changes (resets all state).
- **`@Observable` alternative**: for types using the Swift Observation `@Observable` macro, use `@State` instead of `@StateObject`.

## Related

- [ObservedObject](./observedobject.md)
- [EnvironmentObject](./environmentobject.md)
- [State](./state.md)
