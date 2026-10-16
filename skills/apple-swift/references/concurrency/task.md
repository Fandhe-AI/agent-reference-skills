# Task

A unit of asynchronous work.

## Signature

```swift
@frozen struct Task<Success, Failure>
where Success : Sendable, Failure : Error
```

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

## Options / Props

### Creating tasks

| Initializer / Method | Description |
|---|---|
| `init(name:priority:operation:)` | Unstructured task inheriting actor isolation |
| `init(name:executorPreference:priority:operation:)` | Unstructured task with a `TaskExecutor` preference (`executorPreference taskExecutor: (any TaskExecutor)?`); iOS 18.0+ |
| `Task.detached(name:priority:operation:)` | Detached task; does not inherit isolation or task-locals |
| `Task.detached(name:executorPreference:priority:operation:)` | Detached task with a `TaskExecutor` preference; iOS 18.0+ |
| `Task.immediate(name:priority:executorPreference:operation:)` | Starts immediately without a suspension point |
| `Task.immediateDetached(name:priority:executorPreference:operation:)` | Detached variant of `immediate`; `static func`, `operation` is `sending @escaping @isolated(any) () async throws -> Success`; iOS 26.0+ |

### Priority

| Member | Description |
|---|---|
| `static var currentPriority: TaskPriority` | The current task's priority |
| `static var basePriority: TaskPriority?` | The current task's base priority |
| `escalatePriority(to:)` | `func escalatePriority(to: TaskPriority)`; iOS 26.0+ |
| `withTaskPriorityEscalationHandler(operation:onPriorityEscalated:)` | `func withTaskPriorityEscalationHandler<T, E>(operation: nonisolated(nonsending) () async throws(E) -> T, onPriorityEscalated: (TaskPriority, TaskPriority) -> Void) async throws(E) -> T`; iOS 26.0+ |

### Name

| Member | Description |
|---|---|
| `Task.name` | `static var name: String?`; iOS 26.0+ |

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
| `withTaskCancellationHandler(operation:onCancel:isolation:)` | Global function; runs `onCancel` immediately on cancellation |
| `withTaskCancellationHandler(operation:onCancel:)` | Global function; overload without the `isolation` parameter |

### Cancellation shield

| Member | Description |
|---|---|
| `withTaskCancellationShield(operation:)` | Runs `operation` so that code inside does not observe the surrounding task's cancellation; sync `(operation: () throws(Failure) -> Value) throws(Failure) -> Value` and `nonisolated(nonsending)` async overloads; iOS 27.0+ |
| `Task.hasActiveCancellationShield` | `static var hasActiveCancellationShield: Bool`; iOS 27.0+ |

### Suspending

| Member | Description |
|---|---|
| `Task.yield()` | Suspends the current task and allows other tasks to run |
| `Task.sleep(for:tolerance:clock:)` | Suspends for a `Duration` |
| `Task.sleep(until:tolerance:clock:)` | Suspends until a `Clock` deadline |

## Notes

- **Availability:** iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Creating a `Task` schedules it immediately; no explicit start needed.
- Unstructured tasks inherit actor isolation and task-local values of the creating context; detached tasks do not.
- After a task's closure completes, captured references are eagerly released — retaining a `Task` handle does not keep the closure alive.
- Cancellation is cooperative: the task body must check `Task.isCancelled` or call `Task.checkCancellation()`.
- Deprecated members (`Task.Handle`, `runDetached`, `suspend()`, `sleep(_:)`, etc.) are listed in Apple's Deprecated section of the Task page.
- Availability of the iOS 18.0+ / 26.0+ / 27.0+ members above is taken from each member's own documentation page.

## Related

- [TaskGroup](./taskgroup.md)
- [TaskPriority](./taskpriority.md)
- [TaskLocal](./tasklocal.md)
- [withTaskGroup](./withtaskgroup.md)
- [withTaskExecutorPreference](./withtaskexecutorpreference.md)
- [UnsafeCurrentTask](./unsafecurrenttask.md)
