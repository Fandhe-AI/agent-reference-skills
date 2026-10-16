# ObservableObject / ObservableObjectPublisher

A type of object with a publisher that emits before the object has changed, and the publisher class that publishes those changes.

## Signature / Usage

```swift
protocol ObservableObject : AnyObject

final class ObservableObjectPublisher   // conforms to Publisher
```

By default an `ObservableObject` synthesizes an `objectWillChange` publisher (Output == Void) that emits before any of its `@Published` properties changes. It carries no value; subscribe to a property's projected publisher (`$name`) to receive new values.

```swift
class Contact: ObservableObject {
    @Published var name: String
    @Published var age: Int

    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }

    func haveBirthday() -> Int {
        age += 1
        return age
    }
}

let john = Contact(name: "John Appleseed", age: 24)
cancellable = john.objectWillChange
    .sink { _ in
        print("\(john.age) will change")
}
print(john.haveBirthday())
// Prints "24 will change"
// Prints "25"
```

### ObservableObject members

| Name | Description |
|------|-------------|
| `objectWillChange` | A publisher that emits before the object has changed. Required; has a default implementation. |
| `ObjectWillChangePublisher` | The type of publisher that emits before the object has changed (`associatedtype ObjectWillChangePublisher : Publisher = ObservableObjectPublisher`). |

### ObservableObjectPublisher members

| Name | Description |
|------|-------------|
| `init()` | Creates an observable object publisher instance. |
| `send()` | Sends a will-change notification (Void) to the downstream subscriber. |

## Notes

- iOS 13.0+, iPadOS 13.0+, Mac Catalyst 13.0+, macOS 10.15+, tvOS 13.0+, visionOS 1.0+, watchOS 6.0+
- Apple's abstract says "emits the changed value"; the declared Output is Void.
- Distance line: `ObservableObject` / `@Published` is the Combine-based observation model. The Observation framework (`@Observable` macro) is a different mechanism and is covered by the apple-swiftui skill; do not mix the two APIs.
- Source: https://developer.apple.com/documentation/combine/observableobject , https://developer.apple.com/documentation/combine/observableobjectpublisher (fetched 2026-10-16, iOS 27 SDK docs)

## Related

- [Published](./published.md)
- [Publisher](./publisher.md)
- [sink](./sink.md)
- [AnyCancellable](./anycancellable.md)
