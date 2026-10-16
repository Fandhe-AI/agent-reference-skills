# Convenience Publishers

Publishers for common one-off cases: `Just`, `Deferred`, `Empty`, `Fail`, `Record`. (`Future` has its own page.)

## Signature / Usage

### Just

A publisher that emits an output to each subscriber just once, and then finishes.

```swift
struct Just<Output>

init(_ output: Output)   // Initializes a publisher that emits the specified output just once.
let output: Output       // The one element that the publisher emits.
static func == (Just<Output>, Just<Output>) -> Bool   // when Output : Equatable
```

- Use a `Just` publisher to start a chain of publishers. Also useful when replacing a value with `Publishers.Catch`.
- In contrast with `Result.Publisher`, a `Just` publisher can't fail with an error. Unlike `Optional.Publisher`, a `Just` publisher always produces a value.
- Conforms to `Equatable`, `Publisher`.

### Deferred

A publisher that awaits subscription before running the supplied closure to create a publisher for the new subscriber.

```swift
struct Deferred<DeferredPublisher> where DeferredPublisher : Publisher

init(createPublisher: @escaping () -> DeferredPublisher)   // Creates a deferred publisher.
let createPublisher: () -> DeferredPublisher               // The closure to execute when this deferred publisher receives a subscription.
```

- `createPublisher`: the closure to execute when calling `subscribe(_:)`.
- Supporting types: `Deferred.Output`, `Deferred.Failure`.
- Conforms to `Publisher`.

### Empty

A publisher that never publishes any values, and optionally finishes immediately.

```swift
struct Empty<Output, Failure> where Failure : Error

init(completeImmediately: Bool)
init(completeImmediately: Bool, outputType: Output.Type, failureType: Failure.Type)
let completeImmediately: Bool   // Whether the publisher immediately sends a completion.
```

- `completeImmediately`: a Boolean value that indicates whether the publisher should immediately finish.
- You can create a "Never" publisher (one which never sends values and never finishes or fails) with `Empty(completeImmediately: false)`.
- Conforms to `Equatable`, `Publisher`.

### Fail

A publisher that immediately terminates with the specified error.

```swift
struct Fail<Output, Failure> where Failure : Error

init(error: Failure)                            // Creates a publisher that immediately terminates with the specified failure.
init(outputType: Output.Type, failure: Failure) // Creates publisher with the given output type, that immediately terminates with the specified failure.
let error: Failure                              // The failure to send when terminating the publisher.
static func == (Fail<Output, Failure>, Fail<Output, Failure>) -> Bool   // when Failure : Equatable, Error
```

- Conforms to `Equatable`, `Publisher`.

### Record

A publisher that allows for recording a series of inputs and a completion, for later playback to each subscriber.

```swift
struct Record<Output, Failure> where Failure : Error

init(output: [Output], completion: Subscribers.Completion<Failure>)       // Publish the provided elements, followed by the provided completion value.
init(record: (inout Record<Output, Failure>.Recording) -> Void)           // Interactively record a series of outputs and a completion.
init(recording: Record<Output, Failure>.Recording)                        // Create from an existing recording.
let recording: Record<Output, Failure>.Recording                          // The recorded output and completion.
```

- `Record.Recording`: a recorded sequence of outputs, followed by a completion value.
- `init(output:)`: `output` is an array of output elements to publish; `completion` is the completion value with which to end publishing. `init(recording:)`: a previously-recorded recording of published elements and a completion.
- Conforms to `Publisher`, `Decodable`, `Encodable`, `Copyable`, `Escapable`.

## Notes

- iOS 13.0+, iPadOS 13.0+, Mac Catalyst 13.0+, macOS 10.15+, tvOS 13.0+, visionOS 1.0+, watchOS 6.0+ (all five types)
- The documentation source shows no default value for `completeImmediately`, so none is asserted here.

## Related

- [Future](./future.md)
- [Publisher](./publisher.md)
- [AnyPublisher](./anypublisher.md)
- [Subject](./subject.md)
