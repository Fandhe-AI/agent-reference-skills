# UnsafeContinuation

A mechanism to interface between synchronous and asynchronous code, without correctness checking.

## Signature / Usage

```swift
@frozen struct UnsafeContinuation<T, E> where E : Error
```

Conforms to `BitwiseCopyable`, `Copyable`, `Sendable`, `SendableMetatype` (the `BitwiseCopyable` / `Copyable` conformances apply when `T` conforms to `Copyable` and `Escapable` and `E` conforms to `Error`).

Obtain one via `withUnsafeContinuation(_:)` or `withUnsafeThrowingContinuation(_:)`, then call a resume method:

```swift
func resume()
func resume(returning: sending T)
func resume(throwing: consuming E)
func resume(with: sending Result<T, E>)
init(_: consuming Continuation<T, E>)   // convert a non-copyable continuation
```

## Notes

- **Availability:** iOS 13.0+, iPadOS 13.0+, Mac Catalyst 13.0+, macOS 10.15+, tvOS 13.0+, visionOS 1.0+, watchOS 6.0+
- A continuation is an opaque representation of program state. You must call a resume method exactly once on every execution path throughout the program. Resuming more than once is undefined behavior; never resuming leaves the task suspended indefinitely and leaks any associated resources.
- `CheckedContinuation` performs runtime checks for missing or multiple resume operations. `UnsafeContinuation` avoids enforcing these invariants at runtime because it aims to be a low-overhead mechanism for interfacing Swift tasks with event loops, delegate methods, callbacks, and other non-`async` scheduling mechanisms.
- Both types have the same interface, so in most circumstances you can replace one with the other without other changes.
- The `UnsafeThrowingContinuation` typealias is deprecated; use `UnsafeContinuation<T, any Error>` instead.
- `init(_:)` ("Convert a non-copyable continuation to an `UnsafeContinuation`") is listed under Initializers.

## Related

- [withUnsafeContinuation](./withunsafecontinuation.md)
- [CheckedContinuation](./checkedcontinuation.md)
- [Continuation](./continuation.md)
