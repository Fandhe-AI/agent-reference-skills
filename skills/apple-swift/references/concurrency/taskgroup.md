# TaskGroup

A group that contains dynamically created child tasks.

## Signature

```swift
@frozen struct TaskGroup<ChildTaskResult> where ChildTaskResult : Sendable
```

Conforms to `AsyncSequence`. Use `withTaskGroup(of:returning:isolation:body:)` to obtain an instance.

## Notes

- **Availability:** iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- The group **always** waits for all child tasks to complete before the `withTaskGroup` call returns, even on early return.
- Do not let a `TaskGroup` escape the scope in which it was created.
- Child tasks automatically inherit the group's cancellation state.

### Adding tasks

| Method | Description |
|---|---|
| `addTask(name:priority:operation:)` | Adds a child task |
| `addTaskUnlessCancelled(name:priority:operation:)` | Adds a child task only if not cancelled |
| `addImmediateTask(name:priority:executorPreference:operation:)` | Adds a task that starts immediately |

### Collecting results

| Member | Description |
|---|---|
| `next()` | Awaits the next completed child task result |
| `waitForAll()` | Awaits all remaining child tasks (discards results) |
| `isEmpty` | `true` when no child tasks remain |

### Cancellation

| Member | Description |
|---|---|
| `cancelAll()` | Sends cancellation signal to all child tasks |
| `isCancelled` | `true` if the group has been cancelled |

## Usage

```swift
let results = await withTaskGroup(of: Int.self) { group in
    for i in 1...5 {
        group.addTask { await compute(i) }
    }
    var collected: [Int] = []
    for await result in group {
        collected.append(result)
    }
    return collected
}
```

## Related

- [ThrowingTaskGroup](./throwingtaskgroup.md)
- [withTaskGroup](./withtaskgroup.md)
- [Task](./task.md)
