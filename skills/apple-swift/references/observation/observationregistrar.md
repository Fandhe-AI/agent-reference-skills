# ObservationRegistrar

Provides storage for tracking and access to data changes.

## Signature

```swift
struct ObservationRegistrar
```

## Usage

```swift
// Typically synthesized by @Observable; manual use is rare.
struct MyModel: Observable {
    let _$observationRegistrar = ObservationRegistrar()
}
```

## Options / Props

| Member | Signature | Description |
|--------|-----------|-------------|
| `init()` | `init()` | Creates an instance of the observation registrar. |
| `access(_:keyPath:)` | `func access<Subject, Member>(_ subject: Subject, keyPath: KeyPath<Subject, Member>)` | Registers access to a specific property for observation. |
| `withMutation(of:keyPath:_:)` | `func withMutation<Subject, Member, T>(of subject: Subject, keyPath: KeyPath<Subject, Member>, _ mutation: () throws -> T) rethrows -> T` | Identifies mutations to the transactions registered for observers. |
| `willSet(_:keyPath:)` | `func willSet<Subject, Member>(_ subject: Subject, keyPath: KeyPath<Subject, Member>)` | A property observation called before setting the value of the subject. |
| `didSet(_:keyPath:)` | `func didSet<Subject, Member>(_ subject: Subject, keyPath: KeyPath<Subject, Member>)` | A property observation called after setting the value of the subject. |

## Notes

- When using the `@Observable` macro, `ObservationRegistrar` is synthesized automatically as `_$observationRegistrar`; you rarely need to create one manually.
- Conforms to `Sendable`, `Hashable`, `Equatable`, `Encodable`, `Decodable`, and `Copyable`.
- Available: iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, visionOS 1.0+, watchOS 10.0+

## Related

- [@Observable macro](./observable-macro.md)
- [Observable protocol](./observable-protocol.md)
- [withObservationTracking(_:onChange:)](./withobservationtracking.md)
