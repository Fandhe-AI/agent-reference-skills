# UnownedSerialExecutor

An unowned reference to a serial executor (a `SerialExecutor` value).

## Signature / Usage

```swift
@frozen struct UnownedSerialExecutor
```

Conforms to `BitwiseCopyable`, `Copyable`, `Sendable`, `SendableMetatype`.

```swift
init(Builtin.Executor)
init<E>(_: E)                  // Automatically opt-in to complex equality semantics if the executor implements Equatable
init<E>(complexEquality: E)    // Opts the executor into complex "same exclusive execution context" equality checks
init<E>(ordinary: E)
func asSerialExecutor() -> (any SerialExecutor)?
```

## Notes

- **Availability:** iOS 13.0+, iPadOS 13.0+, Mac Catalyst 13.0+, macOS 10.15+, tvOS 13.0+, visionOS 1.0+, watchOS 6.0+
- This is an optimized type used internally by the core scheduling operations. It is an unowned reference to avoid unnecessary reference-counting work even when working with actors abstractly.
- Extra constraints are imposed on core operations to allow this: keeping an actor alive must also keep the actor's associated executor alive; if they are different objects, the executor must be referenced strongly by the actor.
- Source: https://developer.apple.com/documentation/swift/unownedserialexecutor

## Related

- [SerialExecutor](./serialexecutor.md)
- [Executor](./executor.md)
- [UnownedTaskExecutor](./unownedtaskexecutor.md)
- [Actor](./actor.md)
