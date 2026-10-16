# Executor

A service that can execute jobs.

## Signature

```swift
protocol Executor : AnyObject, Sendable
```

Inherits from `Sendable`, `SendableMetatype`. Inherited by `SerialExecutor`, `TaskExecutor`.

## Notes

- **Availability:** iOS 13.0+, iPadOS 13.0+, Mac Catalyst 13.0+, macOS 10.15+, tvOS 13.0+, visionOS 1.0+, watchOS 6.0+
- The `enqueue(_: consuming Job)` requirement is deprecated; `Job` is the deprecated equivalent of `ExecutorJob`.

### Requirements

| Member | Description |
|---|---|
| `enqueue(_: consuming ExecutorJob)` | Enqueues a job for execution (has default implementations) |
| `enqueue(_: UnownedJob)` | Overload taking an `UnownedJob` (has default implementations) |
| `enqueue(_: consuming Job)` | Deprecated overload taking `Job` (has default implementations) |

## Related

- [SerialExecutor](./serialexecutor.md)
- [TaskExecutor](./taskexecutor.md)
- [ExecutorJob](./executorjob.md)
- [UnownedJob](./unownedjob.md)
- [JobPriority](./jobpriority.md)
- [UnownedSerialExecutor](./unownedserialexecutor.md)
- [UnownedTaskExecutor](./unownedtaskexecutor.md)
- [globalConcurrentExecutor](./globalconcurrentexecutor.md)
- [withTaskExecutorPreference](./withtaskexecutorpreference.md)
