# TaskExecutor

An executor that may be used as the preferred executor by a task.

## Signature

```swift
protocol TaskExecutor: Executor, Sendable
```

## Options / Props

| Member | Description |
|---|---|
| `asUnownedTaskExecutor()` | Returns an `UnownedTaskExecutor` (has a default implementation) |
| `enqueue(_:)` | Enqueues a job for execution (multiple overloads: `ExecutorJob`, `Job`, `UnownedJob`); one `enqueue(_:)` overload is marked deprecated in Apple's documentation |

## Notes

- **Availability:** iOS 18.0+, macOS 15.0+, tvOS 18.0+, watchOS 11.0+, visionOS 2.0+
- By default, nonisolated `async` functions execute on Swift's global concurrent executor.
- Set a task executor preference via `withTaskExecutorPreference(_:isolation:operation:)`, `Task(executorPreference:)`, or `group.addTask(executorPreference:)` to prefer running the task and its structured child tasks on the given executor.
- Unstructured tasks do **not** inherit the task executor preference.
- The default executor is exposed as `globalConcurrentExecutor` (`var globalConcurrentExecutor: any TaskExecutor`, iOS 18.0+); see [globalConcurrentExecutor](./globalconcurrentexecutor.md).

## Related

- [Executor](./executor.md)
- [UnownedTaskExecutor](./unownedtaskexecutor.md)
- [withTaskExecutorPreference](./withtaskexecutorpreference.md)
- [globalConcurrentExecutor](./globalconcurrentexecutor.md)
- [Task](./task.md)
- [TaskGroup](./taskgroup.md)
- [DiscardingTaskGroup](./discardingtaskgroup.md)
