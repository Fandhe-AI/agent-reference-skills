# UnownedTaskExecutor

An unowned reference to a task executor (a `TaskExecutor` value).

## Signature / Usage

```swift
@frozen struct UnownedTaskExecutor
```

Conforms to `BitwiseCopyable`, `Copyable`, `Equatable`, `Hashable`, `Sendable`, `SendableMetatype`.

```swift
init(Builtin.Executor)
init<E>(_: E)
init<E>(ordinary: E)
func asTaskExecutor() -> (any TaskExecutor)?
```

## Notes

- **Availability:** iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+
- The official page carries no abstract or discussion for this type; the member list above is from its Initializers and Instance Methods topic sections. This is the type returned by `UnsafeCurrentTask.unownedTaskExecutor`.
- Source: https://developer.apple.com/documentation/swift/unownedtaskexecutor

## Related

- [TaskExecutor](./taskexecutor.md)
- [UnownedSerialExecutor](./unownedserialexecutor.md)
- [UnsafeCurrentTask](./unsafecurrenttask.md)
- [Executor](./executor.md)
