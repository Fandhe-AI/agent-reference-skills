# TaskPriority

The priority of a task.

## Signature

```swift
struct TaskPriority
```

Conforms to `Comparable`, `RawRepresentable`, `Sendable`, `Encodable`, `Decodable`.

## Options

| Value | Description |
|---|---|
| `.high` | High priority |
| `.medium` | Medium priority |
| `.low` | Low priority |
| `.background` | Background priority |
| `.utility` | Utility-level priority |
| `.userInitiated` | User-initiated priority |

## Notes

- **Availability:** iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Child tasks automatically inherit their parent task's priority.
- `Task.detached` does **not** inherit priority; priority must be specified explicitly.
- The runtime performs **priority elevation** to avoid priority inversion when a high-priority task awaits a lower-priority actor or task.
- Priority semantics are platform- and executor-defined.

## Usage

```swift
Task(priority: .background) {
    await indexSearchDatabase()
}

Task.detached(priority: .userInitiated) {
    await handleUserRequest()
}
```

## Related

- [Task](./task.md)
- [withTaskGroup](./withtaskgroup.md)
