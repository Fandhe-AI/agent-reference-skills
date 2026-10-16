# AsyncPublisher / AsyncThrowingPublisher

Publishers that expose their elements as an asynchronous sequence, so callers can receive values with the `for`-`await`-`in` syntax rather than attaching a `Subscriber`.

## Signature / Usage

```swift
struct AsyncPublisher<P> where P : Publisher, P.Failure == Never

struct AsyncThrowingPublisher<P> where P : Publisher
```

Use the `values` property of the `Publisher` protocol to wrap an existing publisher with an instance of these types:

```swift
// Publisher where Failure == Never
var values: AsyncPublisher<Self> { get }

// Any Publisher
var values: AsyncThrowingPublisher<Self> { get }
```

### Members (both types)

| Name | Description |
|------|-------------|
| `init(_:)` | `AsyncPublisher`: creates a publisher that exposes elements received from an upstream publisher as an asynchronous sequence. `AsyncThrowingPublisher`: same, as a throwing asynchronous sequence. |
| `makeAsyncIterator()` | Creates the asynchronous iterator that produces elements of this asynchronous sequence. |
| `Iterator` | The iterator that produces elements of the asynchronous publisher sequence. |
| `Element` | The type of element produced by this asynchronous sequence. |

## Notes

- Both types conform to `AsyncSequence`; receive values with the `for`-`await`-`in` syntax on `values`.
- `AsyncThrowingPublisher`: if the upstream publisher terminates with an error, it throws the error to the awaiting caller.
- `Publisher.values` (`AsyncPublisher<Self>`) is available when `Failure` is `Never`; the `AsyncThrowingPublisher<Self>` variant has no such constraint.
- Availability: iOS 15.0+, iPadOS 15.0+, Mac Catalyst 15.0+, macOS 12.0+, tvOS 15.0+, visionOS 1.0+, watchOS 8.0+
- For a single value from a `Future`, see `Future.value` (`async` / `async throws`).
- Source: https://developer.apple.com/documentation/combine/asyncpublisher , https://developer.apple.com/documentation/combine/asyncthrowingpublisher (fetched 2026-10-16, iOS 27 SDK docs)

## Related

- [Publisher](./publisher.md)
- [Future](./future.md)
- [sink](./sink.md)
- [Subscriber](./subscriber.md)
