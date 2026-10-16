# SerialExecutor

A service that executes jobs.

## Signature / Usage

```swift
protocol SerialExecutor : Executor
```

```swift
actor MyActor {
  let myExecutor: MyExecutor

  // accepts an executor to run this actor on.
  init(executor: MyExecutor) {
    self.myExecutor = executor
  }

  nonisolated var unownedExecutor: UnownedSerialExecutor {
    self.myExecutor.asUnownedSerialExecutor()
  }
}
```

A shared executor reused by all instances:

```swift
actor MyActor {
  // Serial executor reused by *all* instances of MyActor!
  static let sharedMyActorsExecutor = MyExecutor() // implements SerialExecutor

  nonisolated var unownedExecutor: UnownedSerialExecutor {
    Self.sharedMyActorsExecutor.asUnownedSerialExecutor()
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| isMainExecutor | `Bool` | Instance property (no abstract in the docs) |
| enqueue(_:) | `(consuming ExecutorJob)` | Required; enqueues a job. Two other overloads taking `UnownedJob` and `consuming Job` are deprecated |
| asUnownedSerialExecutor() | `() -> UnownedSerialExecutor` | Convert this executor value to the optimized form of borrowed executor references (has a default implementation) |
| checkIsolated() | `()` | Last resort fallback isolation check, called when the runtime compares executors (e.g. during `assumeIsolated(_:file:line:)`) and cannot prove serial equivalence with the current executor (has a default implementation) |
| isIsolatingCurrentContext() | `() -> Bool?` | Checks if the current execution context is isolated by this executor (has a default implementation) |
| isSameExclusiveExecutionContext(other:) | `(Self) -> Bool` | Lets the executor decide whether it and `other` represent the same serial, exclusive, isolation context; invoked after the pointer-based equality check fails and both executors have the same type |
| assertIsolated(_:file:line:) | `(@autoclosure () -> String, StaticString, UInt)` | Stops program execution if the current task is not executing on this serial executor |
| preconditionIsolated(_:file:line:) | `(@autoclosure () -> String, StaticString, UInt)` | Stops program execution if the current task is not executing on this serial executor |

## Notes

- **Availability:** iOS 13.0+, iPadOS 13.0+, Mac Catalyst 13.0+, macOS 10.15+, tvOS 13.0+, visionOS 1.0+, watchOS 6.0+
- By default, all actor types execute tasks on a shared global concurrent pool, which does not guarantee thread (or dispatch queue) affinity. Implement a custom executor by conforming a type to `SerialExecutor` and implementing `enqueue(_:)`, then implement the actor's `unownedExecutor` computed property.
- Custom executors are useful, for example, when an actor performs heavy blocking operations (such as IO) that should be kept off the global shared pool.
- The `UnownedSerialExecutor` returned by `unownedExecutor` does not retain the executor: ensure the executor's lifetime extends beyond any actor or task using it, otherwise enqueuing work on a released executor may crash. The executor returned by `unownedExecutor` must always be the same object.
- Existing serial executor implementations such as Dispatch's `DispatchSerialQueue` can also be used.
- Deprecated: the `enqueue(_: UnownedJob)` and `enqueue(_: consuming Job)` requirements.

## Related

- [Executor](./executor.md)
- [ExecutorJob](./executorjob.md)
- [UnownedSerialExecutor](./unownedserialexecutor.md)
- [Actor](./actor.md)
