# Future

A publisher that eventually produces a single value and then finishes or fails.

## Signature / Usage

```swift
final class Future<Output, Failure> where Failure : Error
```

```swift
func generateAsyncRandomNumberFromFuture() -> Future <Int, Never> {
    return Future() { promise in
        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            let number = Int.random(in: 1...10)
            promise(Result.success(number))
        }
    }
}

cancellable = generateAsyncRandomNumberFromFuture()
    .sink { number in print("Got random number \(number).") }
```

### init(_:)

Creates a publisher that invokes the given closure once when the Future is initialized; the closure performs the work and calls the supplied Promise to deliver a single result.

```swift
init(_ attemptToFulfill: @escaping (@escaping Future<Output, Failure>.Promise) -> Void)
```

- `attemptToFulfill`: a closure that Future calls at initialization. It receives a `Promise`; call `promise(.success(value))` or `promise(.failure(error))` to complete the future.

### Promise

A type that represents a closure to invoke in the future, when an element or error is available. The promise closure receives one parameter: a `Result` that contains either a single element published by a `Future`, or an error.

```swift
typealias Promise = (Result<Output, Failure>) -> Void
```

### value (async)

The published value of the future, delivered asynchronously. Subscribes to the `Future` and delivers the value when the `Future` publishes it.

```swift
// Failure == Never
final var value: Output { get async }

// Failure : Error
final var value: Output { get async throws }
```

```swift
let number = await generateAsyncRandomNumberFromFuture().value
print("Got random number \(number).")
```

- If the `Future` terminates with an error, the awaiting caller receives the error instead (throwing variant, for a `Failure` type that is not `Never`).

### Alternative: continuations

The `async`-`await` syntax can replace a future entirely when you want to perform some operation after an asynchronous task completes, using `withCheckedContinuation` and `withCheckedThrowingContinuation`.

```swift
func generateAsyncRandomNumberFromContinuation() async -> Int {
    return await withCheckedContinuation { continuation in
        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            let number = Int.random(in: 1...10)
            continuation.resume(returning: number)
        }
    }
}

let asyncRandom = await generateAsyncRandomNumberFromContinuation()
```

## Notes

- `Future`, `init(_:)`, `Promise`: iOS 13.0+, iPadOS 13.0+, Mac Catalyst 13.0+, macOS 10.15+, tvOS 13.0+, visionOS 1.0+, watchOS 6.0+
- `value` (both variants): iOS 15.0+, iPadOS 15.0+, Mac Catalyst 15.0+, macOS 12.0+, tvOS 15.0+, visionOS 1.0+, watchOS 8.0+
- Unlike other `Publisher` types that may publish many elements, a `Future` only publishes one element (or fails), which is why it exposes `value` for `async`-`await`.
- Apple's abstract describes the parameter as a Promise invoked on emission; per the declaration it is a closure that receives the Promise and runs at init (use Deferred to delay execution until subscription).
- Conforms to `Publisher`.
- Source: https://developer.apple.com/documentation/combine/future (fetched 2026-10-16, iOS 27 SDK docs)

## Related

- [Convenience publishers](./convenience-publishers.md)
- [Publisher](./publisher.md)
- [sink](./sink.md)
- [AsyncPublisher](./async-publisher.md)
