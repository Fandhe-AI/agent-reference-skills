# withTaskExecutorPreference(_:isolation:operation:)

Configure the current task hierarchy's task executor preference to the passed `TaskExecutor`, and execute the passed in closure by immediately hopping to that executor.

## Signature / Usage

```swift
func withTaskExecutorPreference<T, Failure>(
    _ taskExecutor: (any TaskExecutor)?,
    isolation: isolated (any Actor)? = #isolation,
    operation: () async throws(Failure) -> T
) async throws(Failure) -> T where Failure : Error
```

```swift
Task {
  await withTaskExecutorPreference(specific) {
    // 'specific' task executor preference
    await SomeDefaultActor().hello() // 'hello' executes on 'specific' executor
    await ActorWithCustomExecutor().hello() // executes on actor's custom executor

    await withTaskGroup(of: Int.self) { group in
      group.addTask { 7 } // child task executes on 'specific' executor
      group.addTask(executorPreference: globalConcurrentExecutor) { 13 } // global concurrent executor
    }

    // disable the task executor preference:
    await withTaskExecutorPreference(globalConcurrentExecutor) {
      // equivalent to "no task executor preference"
    }
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| taskExecutor | `(any TaskExecutor)?` | The executor to use as preferred task executor for this operation, and any child tasks created inside the `operation` closure. If `nil`, it is interpreted as "no preference" and has no impact on execution semantics of the `operation` |
| isolation | `isolated (any Actor)?` | Defaults to `#isolation` |
| operation | `() async throws(Failure) -> T` | The operation to execute on the passed executor |

Return value: the value returned from the `operation` closure. Throws: if the operation closure throws.

## Notes

- **Availability:** iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+
- Task executors influence where nonisolated asynchronous functions and default actor methods execute. The preferred executor is used whenever possible, rather than hopping to the global concurrent pool.
- Passing `nil` as executor disables any preference (if it was set); the task hierarchy executes without any executor preference until a different preference is set.
- Without a task executor preference, `nonisolated async` functions execute on the global concurrent executor; with one, they execute on the preferred task executor. Isolated functions semantically execute on the actor they are isolated to; if that actor does not declare a custom executor (a "default actor") and a preference is present, tasks executing on the actor use the preferred executor as the source of threads while isolated on the actor.

## Related

- [TaskExecutor](./taskexecutor.md)
- [globalConcurrentExecutor](./globalconcurrentexecutor.md)
- [Task](./task.md)
- [Executor](./executor.md)
