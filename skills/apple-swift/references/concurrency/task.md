# Task

A unit of asynchronous work.

## Signature

```swift
@frozen struct Task<Success, Failure>
where Success : Sendable, Failure : Error
```

## Notes

- **Availability:** iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Creating a `Task` schedules it immediately; no explicit start needed.
- Unstructured tasks inherit actor isolation and task-local values of the creating context; detached tasks do not.
- After a task's closure completes, captured references are eagerly released — retaining a `Task` handle does not keep the closure alive.
- Cancellation is cooperative: the task body must check `Task.isCancelled` or call `Task.checkCancellation()`.

### Creating tasks

| Initializer / Method | Description |
|---|---|
| `init(name:priority:operation:)` | Unstructured task inheriting actor isolation |
| `Task.detached(name:priority:operation:)` | Detached task; does not inherit isolation or task-locals |
| `Task.immediate(name:priority:executorPreference:operation:)` | Starts immediately without a suspension point |

### Accessing results

| Member | Type | Description |
|---|---|---|
| `value` | `Success` | Awaits completion and returns the result (rethrows on `Failure`) |
| `result` | `Result<Success, Failure>` | Awaits completion and returns a `Result` |

### Cancellation

| Member | Description |
|---|---|
| `cancel()` | Signals cancellation of this task |
| `Task.isCancelled` | `true` if the current task has been cancelled |
| `Task.checkCancellation()` | Throws `CancellationError` if cancelled |
| `Task.withTaskCancellationHandler(operation:onCancel:isolation:)` | Runs `onCancel` immediately on cancellation |

### Suspending

| Member | Description |
|---|---|
| `Task.yield()` | Suspends the current task and allows other tasks to run |
| `Task.sleep(for:tolerance:clock:)` | Suspends for a `Duration` |
| `Task.sleep(until:tolerance:clock:)` | Suspends until a `Clock` deadline |

## Usage

```swift
// Unstructured task
let task = Task {
    let data = try await fetchData()
    return process(data)
}
let result = try await task.value

// Detached task (no inherited context)
Task.detached(priority: .background) {
    await expensiveBackgroundWork()
}

// Cancellation check
Task {
    for item in items {
        try Task.checkCancellation()
        await process(item)
    }
}
```

## Related

- [TaskGroup](./taskgroup.md)
- [TaskPriority](./taskpriority.md)
- [TaskLocal](./tasklocal.md)
- [withTaskGroup](./withtaskgroup.md)
