# UnownedJob

A unit of schedulable work.

## Signature / Usage

```swift
@frozen struct UnownedJob
```

Conforms to `BitwiseCopyable`, `Copyable`, `CustomStringConvertible`, `Escapable`, `Sendable`, `SendableMetatype`.

```swift
init(_: ExecutorJob)   // lifetime must be managed carefully until run exactly once
init(_: Job)           // deprecated Job
var priority: JobPriority
func runSynchronously(on: UnownedSerialExecutor)
func runSynchronously(on: UnownedTaskExecutor)
func runSynchronously(isolatedTo: UnownedSerialExecutor, taskExecutor: UnownedTaskExecutor)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| priority | `JobPriority` | The priority of this job |
| runSynchronously(on:) | `UnownedSerialExecutor` | Run this job on the passed in executor |
| runSynchronously(on:) | `UnownedTaskExecutor` | Run this job isolated to the passed task executor |
| runSynchronously(isolatedTo:taskExecutor:) | `UnownedSerialExecutor`, `UnownedTaskExecutor` | Run this job isolated to the passed in serial executor, while executing it on the specified task executor |

## Notes

- **Availability:** iOS 13.0+, iPadOS 13.0+, Mac Catalyst 13.0+, macOS 10.15+, tvOS 13.0+, visionOS 1.0+, watchOS 6.0+
- Unless you are implementing a scheduler, you do not generally interact with jobs directly.
- An `UnownedJob` must eventually be run exactly once using `runSynchronously(on:)`. Not doing so effectively leaks and hangs the work that the job represents (e.g. a `Task`).

## Related

- [ExecutorJob](./executorjob.md)
- [Executor](./executor.md)
- [JobPriority](./jobpriority.md)
- [Task](./task.md)
