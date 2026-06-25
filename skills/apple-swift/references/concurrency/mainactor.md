# MainActor

A singleton actor whose executor is equivalent to the main dispatch queue.

## Signature

```swift
@globalActor
final actor MainActor
```

Conforms to `Actor`, `GlobalActor`, `Sendable`.

## Notes

- **Availability:** iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Annotate types, methods, or properties with `@MainActor` to require execution on the main thread.
- `@MainActor` classes are implicitly `Sendable` and may have mutable, non-Sendable stored properties.
- Use `MainActor.run { }` to hop to the main actor from a non-isolated context.

### Key members

| Member | Description |
|---|---|
| `MainActor.shared` | The singleton actor instance |
| `MainActor.run(resultType:body:)` | Executes a closure on the main actor and returns its result |
| `MainActor.assumeIsolated(_:file:line:)` | Synchronous access asserting current main-thread isolation |
| `unownedExecutor` | The underlying serial executor (wraps `DispatchQueue.main`) |

## Usage

```swift
// Annotate a type
@MainActor
class ViewModel: ObservableObject {
    @Published var title = ""

    func update(with text: String) {
        title = text   // safe — always on main actor
    }
}

// Hop to main actor from a background task
Task.detached {
    let result = await heavyComputation()
    await MainActor.run {
        label.text = result
    }
}
```

## Related

- [GlobalActor](./globalactor.md)
- [Actor](./actor.md)
- [Sendable](./sendable.md)
