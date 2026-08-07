# TaskExecutor

An executor that may be used as the preferred executor by a task.

## Signature

```swift
protocol TaskExecutor: Executor, Sendable
```

## Requirements

| Member | Description |
|---|---|
| `asUnownedTaskExecutor()` | Returns an `UnownedTaskExecutor` (has a default implementation) |
| `enqueue(_:)` | Enqueues a job for execution (multiple overloads: `ExecutorJob`, `Job`, `UnownedJob`) |

## Notes

- **Availability:** iOS 18.0+, macOS 15.0+, tvOS 18.0+, watchOS 11.0+, visionOS 2.0+
- By default, nonisolated `async` functions execute on Swift's global concurrent executor.
- Set a task executor preference via `withTaskExecutorPreference(_:operation:)`, `Task(executorPreference:)`, or `group.addTask(executorPreference:)` to prefer running the task and its structured child tasks on the given executor.
- Unstructured tasks do **not** inherit the task executor preference.

## Related

- [Task](./task.md)
- [TaskGroup](./taskgroup.md)
- [DiscardingTaskGroup](./discardingtaskgroup.md)
