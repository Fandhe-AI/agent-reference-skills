# ObservableObject

A Combine protocol for reference types that emit change notifications before any `@Published` property changes.

## Signature / Usage

```swift
protocol ObservableObject : AnyObject  // Combine framework
```

```swift
class Contact: ObservableObject {
    @Published var name: String
    @Published var age: Int

    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
}

struct ContactView: View {
    @ObservedObject var contact: Contact

    var body: some View {
        Text("\(contact.name), age \(contact.age)")
    }
}
```

## Notes

- iOS 13.0+ / macOS 10.15+ / tvOS 13.0+ / watchOS 6.0+ / visionOS 1.0+
- Part of the **Combine** framework; requires `import Combine` (implicit when using SwiftUI wrappers).
- The compiler synthesizes `objectWillChange: ObservableObjectPublisher` automatically; it fires before any `@Published` property changes.
- Use `@Published` on stored properties to have the synthesized publisher fire automatically. For custom logic, call `objectWillChange.send()` manually.
- **`@Observable` (iOS 17+ / macOS 14+)**: The Swift Observation macro replaces `ObservableObject`+`@Published`. With `@Observable`, use `@State`/`@Bindable`/`@Environment` instead of `@StateObject`/`@ObservedObject`/`@EnvironmentObject`.

## Related

- [StateObject](./stateobject.md)
- [ObservedObject](./observedobject.md)
- [EnvironmentObject](./environmentobject.md)
