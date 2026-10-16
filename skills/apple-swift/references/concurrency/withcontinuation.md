# withContinuation(of:_:) / withContinuation(of:throwing:_:)

Invokes the passed in closure with a non-copyable continuation for the current task.

## Signature / Usage

```swift
nonisolated(nonsending) func withContinuation<Success>(
    of: Success.Type = Success.self,
    _ body: (consuming Continuation<Success, Never>) -> Void
) async -> sending Success where Success : ~Copyable

nonisolated(nonsending) func withContinuation<Success, Failure>(
    of: Success.Type = Success.self,
    throwing: Failure.Type,
    _ body: (consuming Continuation<Success, Failure>) -> Void
) async throws(Failure) -> sending Success where Failure : Error, Success : ~Copyable
```

```swift
let data = await withContinuation(of: Data.self) { continuation in
    bridge.store(continuation)
}

let data2 = try await withContinuation(of: Data.self, throwing: NetworkError.self) { continuation in
    // ...
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| of | `Success.Type` | The `Success` type returned by the continuation (default `Success.self`) |
| throwing | `Failure.Type` | The `Failure` type that may be thrown (throwing overload only) |
| body | `(consuming Continuation<Success, Failure>) -> Void` | A closure that takes a `Continuation` parameter |

Return value: the value the continuation is resumed with.

## Notes

- **Availability:** iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- The body of the closure executes synchronously on the calling task, and once it returns the calling task is suspended. It is possible to immediately resume the task, or escape the continuation to complete it afterwards.
- You must invoke the continuation's `resume` method exactly once. Multiple resume calls are prevented at compile time (resuming consumes it); if the continuation is dropped without being resumed, the program traps.
- SE-0528 mapping: `withCheckedContinuation { ... }` corresponds to `withContinuation(of: T.self) { ... }`; `withCheckedThrowingContinuation { ... }` corresponds to `withContinuation(of: T.self, throwing: (any Error).self) { ... }`.
- Source: https://developer.apple.com/documentation/swift/withcontinuation(of:_:) ; https://developer.apple.com/documentation/swift/withcontinuation(of:throwing:_:) ; SE-0528, swift-evolution commit f006bf3cf2594bdd4a972f9126f93bd1743ed524

## Related

- [Continuation](./continuation.md)
- [withCheckedContinuation](./withcheckedcontinuation.md)
- [withUnsafeContinuation](./withunsafecontinuation.md)
