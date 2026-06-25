# TaskLocal

Wrapper type that defines a task-local value key.

## Signature

```swift
final class TaskLocal<Value> where Value : Sendable
```

Conforms to `Sendable`, `CustomStringConvertible`.

## Notes

- **Availability:** iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Task-local values are implicitly carried by a `Task` and inherited by all child tasks (via `async let` or `TaskGroup`).
- `Task.detached` does **not** inherit task-local values.
- Must be declared as `static` properties (or global properties, Swift 6.0+) with the `@TaskLocal` attribute.
- Outside of any task context, reading falls back to thread-local storage and returns the default value.

### Key members

| Member | Description |
|---|---|
| `wrappedValue` | The value currently bound to this key in the running task |
| `projectedValue` | The `TaskLocal` instance itself (accessed via `$` prefix) |
| `withValue(_:operation:isolation:file:line:)` | Binds a value for the duration of an async closure |
| `withValue(_:operation:file:line:)` | Synchronous variant |

## Usage

```swift
enum RequestContext {
    @TaskLocal
    static var traceID: String?
}

// Bind for a subtree of async work
await RequestContext.$traceID.withValue("abc-123") {
    await handleRequest()   // and any child tasks inherit "abc-123"
}

// Read from anywhere in the task tree
func log(_ message: String) {
    let id = RequestContext.traceID ?? "none"
    print("[\(id)] \(message)")
}
```

## Related

- [Task](./task.md)
- [withTaskGroup](./withtaskgroup.md)
