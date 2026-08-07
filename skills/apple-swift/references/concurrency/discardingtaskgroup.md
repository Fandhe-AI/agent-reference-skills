# DiscardingTaskGroup

A discarding group that contains dynamically created child tasks.

## Signature

```swift
@frozen struct DiscardingTaskGroup
```

Use `withDiscardingTaskGroup(returning:isolation:body:)` to obtain an instance.

## Notes

- **Availability:** iOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- Unlike `TaskGroup`, child tasks and their results are **eagerly discarded and released** as soon as they complete — results are not retained for a `next()` call, so memory usage stays flat.
- Best applied where the child task's purpose is a side effect rather than a value to collect.
- Becomes cancelled when `cancelAll()` is invoked or the enclosing `Task` is cancelled; cancellation propagates to all child tasks.
- Use `addTaskUnlessCancelled(...)` to avoid adding new tasks once the group is already cancelled.

### Adding tasks

| Method | Description |
|---|---|
| `addTask(priority:operation:)` | Adds a child task |
| `addTask(name:priority:operation:)` | Adds a named child task |
| `addTask(executorPreference:priority:operation:)` | Adds a task with executor preference |
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
await withDiscardingTaskGroup { group in
    for item in items {
        group.addTask { await process(item) }
    }
}
```

## Related

- [withDiscardingTaskGroup](./withdiscardingtaskgroup.md)
- [ThrowingDiscardingTaskGroup](./throwingdiscardingtaskgroup.md)
- [TaskGroup](./taskgroup.md)
