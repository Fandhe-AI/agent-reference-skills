# withCheckedContinuation / withCheckedThrowingContinuation

Functions that suspend the current task and bridge to synchronous callback-based code with runtime correctness checks.

## Signature

```swift
// Non-throwing
func withCheckedContinuation<T>(
    isolation: isolated (any Actor)? = #isolation,
    function: String = #function,
    _ body: (CheckedContinuation<T, Never>) -> Void
) async -> sending T

// Throwing
func withCheckedThrowingContinuation<T>(
    isolation: isolated (any Actor)? = #isolation,
    function: String = #function,
    _ body: (CheckedContinuation<T, any Error>) -> Void
) async throws -> sending T
```

## Parameters

| Name | Type | Description |
|---|---|---|
| `isolation` | `isolated (any Actor)?` | Actor isolation for the continuation; defaults to `#isolation` |
| `function` | `String` | Caller's function name for diagnostics; defaults to `#function` |
| `body` | `(CheckedContinuation<T, _>) -> Void` | Closure performing callback-based async work; must call resume exactly once |

## Notes

- **Availability:** iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- The `body` closure runs synchronously before the task suspends.
- `CheckedContinuation` logs a warning if `resume` is called more than once; failing to call `resume` leaks the suspended task.
- For performance-sensitive paths where checks are not needed, use `withUnsafeContinuation` / `withUnsafeThrowingContinuation`.

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

## Related

- [CheckedContinuation](./checkedcontinuation.md)
- [AsyncStream](./asyncstream.md)
