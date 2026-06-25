# AsyncStream

An asynchronous sequence generated from a closure that calls a continuation to produce new elements.

## Signature

```swift
struct AsyncStream<Element>
```

Conforms to `AsyncSequence`, `Sendable`.

## Notes

- **Availability:** iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Well-suited to wrapping callback- or delegation-based APIs for use with `async`/`await`.
- The `Continuation` is `Sendable` — safe to call `yield` and `finish` from any thread.
- Default buffer policy is `.unbounded` (`Int.max`); configure with `BufferingPolicy` to apply backpressure.
- Use `makeStream(of:bufferingPolicy:)` to obtain both the stream and its continuation for separate use.

### Continuation API

| Method | Description |
|---|---|
| `continuation.yield(_:)` | Produces a new element |
| `continuation.finish()` | Terminates the stream |
| `continuation.onTermination` | Closure called when the stream is cancelled or finished |

### Buffering policies

| Policy | Description |
|---|---|
| `.unbounded` | No limit (default) |
| `.bufferingOldest(N)` | Keep oldest N elements; drop new ones when full |
| `.bufferingNewest(N)` | Keep newest N elements; drop old ones when full |

## Usage

```swift
// Wrap a callback-based API
extension QuakeMonitor {
    static var quakes: AsyncStream<Quake> {
        AsyncStream { continuation in
            let monitor = QuakeMonitor()
            monitor.quakeHandler = { continuation.yield($0) }
            continuation.onTermination = { @Sendable _ in monitor.stopMonitoring() }
            monitor.startMonitoring()
        }
    }
}

for await quake in QuakeMonitor.quakes {
    print(quake.magnitude)
}
```

## Related

- [AsyncThrowingStream](./asyncthrowingstream.md)
- [AsyncSequence](./asyncsequence.md)
- [CheckedContinuation](./checkedcontinuation.md)
