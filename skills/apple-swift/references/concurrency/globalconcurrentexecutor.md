# globalConcurrentExecutor

The global concurrent executor that is used by default for Swift Concurrency tasks.

## Signature / Usage

```swift
var globalConcurrentExecutor: any TaskExecutor { get }
```

```swift
group.addTask(executorPreference: globalConcurrentExecutor) { 13 } // child task executes on global concurrent executor
```

## Notes

- **Availability:** iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+
- The executor's implementation is platform dependent. By default it uses a fixed size pool of threads and should not be used for blocking operations which do not guarantee forward progress, as doing so may prevent other tasks from being executed and render the system unresponsive.
- You may pass this executor explicitly to a `Task` initializer as a task executor preference, to ensure and document that the task is executed on the global executor instead of, e.g., inheriting the enclosing actor's executor. See `withTaskExecutorPreference(_:isolation:operation:)` for a detailed discussion of task executor preferences.
- Customizing the global concurrent executor is currently not supported.
- Source: https://developer.apple.com/documentation/swift/globalconcurrentexecutor

## Related

- [TaskExecutor](./taskexecutor.md)
- [withTaskExecutorPreference](./withtaskexecutorpreference.md)
- [Task](./task.md)
- [Executor](./executor.md)
