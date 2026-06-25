# Binding

A property wrapper type that can read and write a value owned by a source of truth.

## Signature / Usage

```swift
@frozen @propertyWrapper @dynamicMemberLookup struct Binding<Value>
```

```swift
struct PlayButton: View {
    @Binding var isPlaying: Bool

    var body: some View {
        Button(isPlaying ? "Pause" : "Play") {
            isPlaying.toggle()
        }
    }
}

struct PlayerView: View {
    @State private var isPlaying: Bool = false

    var body: some View {
        PlayButton(isPlaying: $isPlaying) // pass binding with $ prefix
    }
}
```

## Notes

- iOS 13.0+ / macOS 10.15+ / tvOS 13.0+ / watchOS 6.0+ / visionOS 1.0+
- Does not own data — connects a view to a source of truth elsewhere (e.g., `@State`, `@StateObject`).
- Use the `$` prefix on a `@State` or `@StateObject` property to obtain a `Binding`.
- Conforms to `DynamicProperty`, `Identifiable`, `Sequence`, `Collection`, `RandomAccessCollection`.

## Related

- [State](./state.md)
- [Bindable](./bindable.md)
