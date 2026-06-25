# Namespace

A dynamic property that provides access to a namespace defined by the persistent identity of its containing view, used to synchronize geometry between views.

## Signature / Usage

```swift
@frozen @propertyWrapper struct Namespace
```

```swift
struct ContentView: View {
    @Namespace private var animation
    @State private var isExpanded = false

    var body: some View {
        if isExpanded {
            RoundedRectangle(cornerRadius: 12)
                .matchedGeometryEffect(id: "card", in: animation)
                .frame(width: 300, height: 200)
        } else {
            RoundedRectangle(cornerRadius: 12)
                .matchedGeometryEffect(id: "card", in: animation)
                .frame(width: 100, height: 60)
        }
    }
}
```

## Notes

- iOS 14.0+ / macOS 11.0+ / tvOS 14.0+ / watchOS 7.0+ / visionOS 1.0+
- `wrappedValue` is a `Namespace.ID` — pass it to `matchedGeometryEffect(id:in:)` modifiers that should share geometry.
- `Namespace.ID` is opaque; two views sharing the same namespace ID and matching `id` value will animate geometry between each other.
- Conforms to `DynamicProperty`.

## Related

- [State](./state.md)
