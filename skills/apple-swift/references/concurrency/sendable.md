# Sendable

A thread-safe type whose values can be shared across arbitrary concurrent contexts without introducing a risk of data races.

## Signature

```swift
protocol Sendable : SendableMetatype
```

## Notes

- **Availability:** iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+
- Conformance must be declared in the same file as the type declaration.
- Swift enforces `Sendable` requirements at compile time under strict concurrency checking.

### Automatic conformance rules

| Type | Condition for implicit conformance |
|---|---|
| `struct` / `enum` | All stored properties / associated values are `Sendable` |
| `actor` | Always implicitly `Sendable` |
| `final class` | Immutable stored properties that are all `Sendable`; no superclass or `NSObject` |
| `@MainActor class` | Implicitly `Sendable`; may have mutable non-Sendable properties |
| Tuple | All elements are `Sendable` |
| Metatype | Always `Sendable` |

### `@Sendable` closures

Closures marked `@Sendable` may only capture `Sendable` values by value.

```swift
let work: @Sendable () -> Void = {
    print("safe to send across actors")
}
```

### Opting out of checking

```swift
// You are responsible for manual synchronization
final class MyCache: @unchecked Sendable {
    private let lock = NSLock()
    private var store: [String: Any] = [:]
}
```

## Usage

```swift
// Value type — all properties Sendable → automatic conformance
struct Point: Sendable {
    var x: Double
    var y: Double
}

// Pass across actor boundary
actor Renderer {
    func draw(_ point: Point) { ... }  // Point crosses isolation boundary safely
}
```

## Related

- [Actor](./actor.md)
- [MainActor](./mainactor.md)
- [Task](./task.md)
