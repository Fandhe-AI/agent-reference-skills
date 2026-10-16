# withUnsafeContinuation / withUnsafeThrowingContinuation

Invokes the passed in closure with an unsafe continuation for the current task.

## Signature / Usage

```swift
nonisolated(nonsending) func withUnsafeContinuation<T>(
    _ fn: (UnsafeContinuation<T, Never>) -> Void
) async -> sending T

func withUnsafeThrowingContinuation<T, E>(
    _ body: (UnsafeContinuation<T, E>) -> Void
) async throws(E) -> sending T

func withUnsafeThrowingContinuation<T>(
    _ body: (UnsafeContinuation<T, any Error>) -> Void
) async throws -> sending T
```

Deprecated source-compatibility overloads:

```swift
func withUnsafeContinuation<T>(
    isolation: isolated (any Actor)?,
    _ fn: (UnsafeContinuation<T, Never>) -> Void
) async -> sending T

func withUnsafeThrowingContinuation<T>(
    isolation: isolated (any Actor)?,
    _ fn: (UnsafeContinuation<T, any Error>) -> Void
) async throws -> sending T
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| fn | `(UnsafeContinuation<T, Never>) -> Void` | A closure that takes an `UnsafeContinuation` parameter. Return value: the value the continuation is resumed with |

## Notes

- **Availability:** iOS 13.0+, iPadOS 13.0+, Mac Catalyst 13.0+, macOS 10.15+, tvOS 13.0+, visionOS 1.0+, watchOS 6.0+
- The body of the closure executes synchronously on the calling task, and once it returns the calling task is suspended. It is possible to immediately resume the task, or escape the continuation in order to complete it afterwards.
- You must invoke the continuation's `resume` method exactly once. Missing to invoke it (eventually) causes the calling task to remain suspended indefinitely (the task hangs and is leaked with no possibility to destroy it).
- Unlike the "checked" continuation variant, `UnsafeContinuation` does not detect or diagnose misuse: calling `resume` twice or forgetting to call it is not diagnosed.
- Deprecated: the `isolation:` overloads of `withUnsafeContinuation` and `withUnsafeThrowingContinuation` are marked "Source-compatibility overload"; deprecation message: "Replaced by nonisolated(nonsending) overload".
- Source: https://developer.apple.com/documentation/swift/withunsafecontinuation(_:) ; https://developer.apple.com/documentation/swift/withunsafethrowingcontinuation(_:)-32nwt

## Related

- [UnsafeContinuation](./unsafecontinuation.md)
- [withCheckedContinuation](./withcheckedcontinuation.md)
- [withContinuation](./withcontinuation.md)
