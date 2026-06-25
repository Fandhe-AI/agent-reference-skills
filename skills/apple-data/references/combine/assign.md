# assign(to:on:)

Assigns each element from a publisher to a property on an object, identified by a key path.

## Signature / Usage

```swift
func assign<Root>(
    to keyPath: ReferenceWritableKeyPath<Root, Self.Output>,
    on object: Root
) -> AnyCancellable
```

```swift
class MyClass {
    var anInt: Int = 0 {
        didSet { print("anInt was set to: \(anInt)") }
    }
}

var myObject = MyClass()
let cancellable = (0...2).publisher
    .assign(to: \.anInt, on: myObject)
// Prints: "anInt was set to: 0; anInt was set to: 1; anInt was set to: 2"
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `keyPath` | `ReferenceWritableKeyPath<Root, Output>` | Key path to the property to assign values to |
| `object` | `Root` | The object that contains the target property |

## Notes

- iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- The `Assign` subscriber holds a **strong reference** to `object`, which can cause retain cycles if `object` holds a reference to the pipeline
- For `@Published` properties, prefer `assign(to:)` (without `on:`) to avoid retain cycles — it takes an `inout Published<Output>.Publisher`
- The returned `AnyCancellable` must be retained

## Related

- [sink](./sink.md)
- [AnyCancellable](./anycancellable.md)
- [Published](./published.md)
