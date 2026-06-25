# @Published

A property wrapper that creates a `Publisher` for a class property, publishing a new element whenever the property's value changes.

## Signature / Usage

```swift
@propertyWrapper
struct Published<Value>
```

```swift
class Weather {
    @Published var temperature: Double
    init(temperature: Double) { self.temperature = temperature }
}

let weather = Weather(temperature: 20)
let cancellable = weather.$temperature
    .sink { print("Temperature: \($0)") }
// Prints: Temperature: 20.0

weather.temperature = 25
// Prints: Temperature: 25.0
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `projectedValue` | `Published<Value>.Publisher` | The underlying publisher; accessed via `$` prefix |
| `init(wrappedValue:)` | `(Value)` | Creates the wrapper with an initial value |

## Notes

- iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Class-constrained: only usable on class properties, not structs
- Publishing occurs in `willSet` — subscribers receive the new value before the property is actually set on the object
- Commonly used with `ObservableObject` to drive SwiftUI updates

## Related

- [Publisher](./publisher.md)
- [CurrentValueSubject](./currentvaluesubject.md)
- [sink](./sink.md)
