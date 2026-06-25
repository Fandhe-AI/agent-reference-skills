# ObservedObject

A property wrapper that subscribes to an `ObservableObject` and invalidates a view when the object changes.

## Signature / Usage

```swift
@MainActor @propertyWrapper @preconcurrency @frozen
struct ObservedObject<ObjectType> where ObjectType : ObservableObject
```

```swift
class DataModel: ObservableObject {
    @Published var name = "Some Name"
    @Published var isEnabled = false
}

struct MyView: View {
    @StateObject private var model = DataModel()

    var body: some View {
        MySubView(model: model)
    }
}

struct MySubView: View {
    @ObservedObject var model: DataModel

    var body: some View {
        Toggle("Enabled", isOn: $model.isEnabled)
    }
}
```

## Notes

- iOS 13.0+ / macOS 10.15+ / tvOS 13.0+ / watchOS 6.0+ / visionOS 1.0+
- Does **not** own the object's lifetime — the parent (typically a `@StateObject`) owns it.
- Do not provide a default value; use only for properties received as input.
- `projectedValue` (prefix `$`) gives an `ObservedObject<ObjectType>.Wrapper` for bindings to published properties.
- **`@Observable` alternative**: for `@Observable` types, pass the object directly as a parameter and use `@Bindable` inside the child view to create bindings.
- Conforms to `DynamicProperty`.

## Related

- [StateObject](./stateobject.md)
- [Bindable](./bindable.md)
- [EnvironmentObject](./environmentobject.md)
