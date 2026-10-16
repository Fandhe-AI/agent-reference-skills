# withCheckedContinuation / withCheckedThrowingContinuation

Functions that suspend the current task and bridge to synchronous callback-based code with runtime correctness checks.

## Signature

```swift
// Non-throwing
nonisolated(nonsending) func withCheckedContinuation<T>(
    function: String = #function,
    _ body: (CheckedContinuation<T, Never>) -> Void
) async -> sending T

// Throwing (untyped throws)
nonisolated(nonsending) func withCheckedThrowingContinuation<T>(
    function: String = #function,
    _ body: (CheckedContinuation<T, any Error>) -> Void
) async throws -> sending T

// Throwing (typed throws)
nonisolated(nonsending) func withCheckedThrowingContinuation<T, E>(
    function: String = #function,
    _ body: (CheckedContinuation<T, E>) -> Void
) async throws(E) -> sending T
```

## Usage

```swift
// Wrap a delegate-based download
func download(_ url: URL) async throws -> Data {
    try await withCheckedThrowingContinuation { continuation in
        downloader.start(url: url) { result in
            continuation.resume(with: result)
        }
    }
}
```

## Options / Props

| Name | Type | Description |
|---|---|---|
| `function` | `String` | Caller's function name for diagnostics; defaults to `#function` |
| `body` | `(CheckedContinuation<T, _>) -> Void` | Closure performing callback-based async work; must call resume exactly once |

## Notes

- **Availability:** iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- The `body` closure runs synchronously before the task suspends.
- `CheckedContinuation` logs a warning if `resume` is called more than once; failing to call `resume` leaks the suspended task.
- **Deprecated:** the `withCheckedContinuation(isolation:function:_:)` / `withCheckedThrowingContinuation(isolation:function:_:)` overloads carry the deprecation text "Replaced by nonisolated(nonsending) overload". Apple describes them as source-compatibility overloads, declared with `@backDeployed(before: macOS 15.0, iOS 18.0, watchOS 11.0, tvOS 18.0, visionOS 2.0)`.
- iOS 27.0+ adds a noncopyable `Continuation` and `withContinuation(of:_:)` / `withContinuation(of:throwing:_:)` as an alternative (see [Continuation](./continuation.md)).
- For performance-sensitive paths where checks are not needed, use `withUnsafeContinuation` / `withUnsafeThrowingContinuation`.

## Related

- [CheckedContinuation](./checkedcontinuation.md)
- [Continuation](./continuation.md)
- [UnsafeContinuation](./unsafecontinuation.md)
- [AsyncStream](./asyncstream.md)
