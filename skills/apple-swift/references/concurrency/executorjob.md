# ExecutorJob

A unit of schedulable work.

## Signature / Usage

```swift
@frozen struct ExecutorJob
```

Conforms to `Sendable`, `SendableMetatype`.

```swift
init(_: Job)          // deprecated Job
init(_: UnownedJob)
var description: String
var priority: JobPriority
func runSynchronously(on: UnownedSerialExecutor)
func runSynchronously(on: UnownedTaskExecutor)
func runSynchronously(isolatedTo: UnownedSerialExecutor, taskExecutor: UnownedTaskExecutor)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| priority | `JobPriority` | The priority of the job |
| description | `String` | Textual description |
| runSynchronously(on:) | `UnownedSerialExecutor` | Run this job on the passed in executor |
| runSynchronously(on:) | `UnownedTaskExecutor` | Run this job on the passed in task executor |
| runSynchronously(isolatedTo:taskExecutor:) | `UnownedSerialExecutor`, `UnownedTaskExecutor` | Run this job isolated to the passed in serial executor, while executing it on the specified task executor |

## Notes

- **Availability:** iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, visionOS 1.0+, watchOS 10.0+
- Unless you are implementing a scheduler, you do not generally interact with jobs directly.
- The `Job` typealias (struct `Job`, "Deprecated equivalent of `ExecutorJob`") is deprecated; use `ExecutorJob`.
- Source: https://developer.apple.com/documentation/swift/executorjob

## Related

- [Executor](./executor.md)
- [UnownedJob](./unownedjob.md)
- [JobPriority](./jobpriority.md)
- [SerialExecutor](./serialexecutor.md)
