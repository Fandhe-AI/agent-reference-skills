# GlobalActor

A type that represents a globally-unique actor used to isolate declarations anywhere in the program.

## Signature

```swift
protocol GlobalActor
```

## Requirements

| Member | Type | Description |
|---|---|---|
| `ActorType` | associated type | The actor type that backs this global actor (must conform to `Actor`) |
| `shared` | `ActorType` | The singleton actor instance |
| `sharedUnownedExecutor` | `UnownedSerialExecutor` | Shorthand for `shared.unownedExecutor` |

## Notes

- **Availability:** iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Declare a custom global actor with the `@globalActor` attribute on a type that also conforms to `GlobalActor`.
- Use the custom attribute (e.g. `@MyActor`) on any declaration to isolate it to that actor.
- The only standard library conforming type is `MainActor`.
- A global actor's executor can be customised by providing `unownedExecutor` in the `ActorType`.

## Usage

```swift
@globalActor
actor DatabaseActor: GlobalActor {
    static let shared = DatabaseActor()
}

@DatabaseActor
func readRecord(id: Int) async -> Record { ... }

@DatabaseActor
class RecordCache {
    var entries: [Int: Record] = [:]
}
```

## Related

- [MainActor](./mainactor.md)
- [Actor](./actor.md)
