# JobPriority

The priority of this job.

## Signature / Usage

```swift
@frozen struct JobPriority
```

Conforms to `BitwiseCopyable`, `Comparable`, `Copyable`, `Equatable`, `Sendable`, `SendableMetatype`.

```swift
init(_: TaskPriority)          // Construct from a TaskPriority
init(rawValue: JobPriority.RawValue)
var rawValue: JobPriority.RawValue   // The raw priority value
static func != (JobPriority, JobPriority) -> Bool
```

## Notes

- **Availability:** iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, visionOS 1.0+, watchOS 10.0+
- The executor determines how priority information affects the way tasks are scheduled; the behavior varies depending on the executor currently being used. Typically, executors attempt to run tasks with a higher priority before tasks with a lower priority, but the semantics of how priority is treated are left up to each platform and `Executor` implementation.
- An `ExecutorJob`'s priority is roughly equivalent to a `TaskPriority`; since not all jobs are tasks, it is represented as a separate type. Conversions between the two priorities are available as initializers on the respective types.

## Related

- [ExecutorJob](./executorjob.md)
- [UnownedJob](./unownedjob.md)
- [TaskPriority](./taskpriority.md)
- [Executor](./executor.md)
