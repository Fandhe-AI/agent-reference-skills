# CheckedContinuation

A mechanism to interface between synchronous and asynchronous code, logging correctness violations.

## Signature

```swift
struct CheckedContinuation<T, E> where E : Error
```

Conforms to `Sendable`.

## Usage

```swift
// Non-throwing: wrap a callback API
func fetchData(from url: URL) async -> Data {
    await withCheckedContinuation { continuation in
        URLSession.shared.dataTask(with: url) { data, _, _ in
            continuation.resume(returning: data ?? Data())
        }.resume()
    }
}

// Throwing: propagate errors
func fetchData(from url: URL) async throws -> Data {
    try await withCheckedThrowingContinuation { continuation in
        URLSession.shared.dataTask(with: url) { data, _, error in
            if let error { continuation.resume(throwing: error) }
            else { continuation.resume(returning: data ?? Data()) }
        }.resume()
    }
}
```

## Options / Props

Resume methods:

| Method | Description |
| --- | --- |
| `resume()` | Resumes the suspended task with `Void` |
| `resume(returning:)` | Resumes with a value of type `T` |
| `resume(throwing:)` | Resumes by throwing an error (requires `E: Error`) |
| `resume(with:)` | Resumes with a `Result<T, E>` |

## Notes

- **Availability:** iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Obtain via `withCheckedContinuation` (non-throwing) or `withCheckedThrowingContinuation` (throwing).
- **You must call exactly one resume method on every execution path.** `CheckedContinuation` detects violations at runtime:
  - Resuming more than once → runtime warning (undefined behavior for `UnsafeContinuation`)
  - Never resuming → task suspended indefinitely; resource leak
- iOS 27.0+: the noncopyable `Continuation<Success, Failure>` is available as an alternative; the type itself guarantees the continuation is resumed exactly once (see [Continuation](./continuation.md)).
- Prefer `CheckedContinuation` over `UnsafeContinuation` (see [UnsafeContinuation](./unsafecontinuation.md)) during development; swap for performance-critical production paths if needed.

## Related

- [withCheckedContinuation](./withcheckedcontinuation.md)
- [Continuation](./continuation.md)
- [UnsafeContinuation](./unsafecontinuation.md)
- [AsyncStream](./asyncstream.md)
- [Task](./task.md)
