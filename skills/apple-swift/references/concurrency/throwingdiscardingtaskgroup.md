# ThrowingDiscardingTaskGroup

A throwing discarding group that contains dynamically created child tasks.

## Signature

```swift
@frozen struct ThrowingDiscardingTaskGroup<Failure> where Failure : Error
```

Use `withThrowingDiscardingTaskGroup(returning:isolation:body:)` to obtain an instance.

## Notes

- **Availability:** iOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- Like `DiscardingTaskGroup`, child tasks and their results are eagerly discarded as soon as they complete instead of being retained for `next()`.
- Becomes cancelled when `cancelAll()` is invoked, an error escapes the `withThrowingDiscardingTaskGroup` closure, the enclosing `Task` is cancelled, or (unique to this type) **any** child task throws — the first thrown error is retained and rethrown, and all remaining child tasks are cancelled.
- Catch errors inside a child task body to prevent them from cancelling the whole group.

### Adding tasks

| Method | Description |
|---|---|
| `addTask(priority:operation:)` | Adds a throwing child task |
| `addTask(name:priority:operation:)` | Adds a named throwing child task |
| `addTaskUnlessCancelled(priority:operation:)` | Adds a task only if not cancelled (returns `Bool`) |
| `addImmediateTask(name:priority:executorPreference:operation:)` | Adds a task that runs immediately in the calling context |

### State

| Member | Description |
|---|---|
| `isCancelled` | `true` if the group was cancelled |
| `isEmpty` | `true` when no child tasks remain |
| `cancelAll()` | Cancels all remaining tasks in the group |

## Usage

```swift
try await withThrowingDiscardingTaskGroup { group in
    group.addTask {
        do {
            try boom()
        } catch is HarmlessError {
            return
        }
    }
}
```

## Related

- [withThrowingDiscardingTaskGroup](./withthrowingdiscardingtaskgroup.md)
- [DiscardingTaskGroup](./discardingtaskgroup.md)
- [ThrowingTaskGroup](./throwingtaskgroup.md)
