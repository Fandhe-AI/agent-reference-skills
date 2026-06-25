# AsyncThrowingStream

An asynchronous sequence generated from an error-throwing closure that calls a continuation to produce new elements.

## Signature

```swift
struct AsyncThrowingStream<Element, Failure> where Failure : Error
```

Conforms to `AsyncSequence`, `Sendable`.

## Notes

- **Availability:** iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Like `AsyncStream` but can terminate with a thrown error via `continuation.finish(throwing:)`.
- Iterate with `for try await element in stream { }`.
- The `Continuation` is `Sendable` — safe to call from any thread or queue.
- Use `makeStream(of:throwing:bufferingPolicy:)` to obtain both stream and continuation separately.

### Continuation API

| Method | Description |
|---|---|
| `continuation.yield(_:)` | Produces a new element |
| `continuation.finish()` | Terminates the stream normally |
| `continuation.finish(throwing:)` | Terminates the stream with an error |
| `continuation.onTermination` | Closure called on cancellation or termination |

## Usage

```swift
extension QuakeMonitor {
    static var quakes: AsyncThrowingStream<Quake, Error> {
        AsyncThrowingStream { continuation in
            let monitor = QuakeMonitor()
            monitor.quakeHandler = { continuation.yield($0) }
            monitor.errorHandler = { continuation.finish(throwing: $0) }
            continuation.onTermination = { @Sendable _ in monitor.stopMonitoring() }
            monitor.startMonitoring()
        }
    }
}

do {
    for try await quake in QuakeMonitor.quakes {
        print(quake.magnitude)
    }
} catch {
    print("Monitor failed: \(error)")
}
```

## Related

- [AsyncStream](./asyncstream.md)
- [AsyncSequence](./asyncsequence.md)
- [CheckedContinuation](./checkedcontinuation.md)
