# Transforming Operators

Operators that transform elements from an upstream publisher: `map`, `flatMap`, `compactMap`, `tryMap`, `scan`, and related variants.

## map(_:)

Transforms each element using a closure.

```swift
func map<T>(_ transform: @escaping (Self.Output) -> T) -> Publishers.Map<Self, T>
```

```swift
let cancellable = [1, 2, 3].publisher
    .map { $0 * 2 }
    .sink { print($0) }
// Prints: 2 4 6
```

- Use `tryMap(_:)` when the closure can throw.

## flatMap(maxPublishers:_:)

Transforms each element into a new publisher and flattens emissions from all inner publishers into a single stream.

```swift
func flatMap<T, P>(
    maxPublishers: Subscribers.Demand = .unlimited,
    _ transform: @escaping (Self.Output) -> P
) -> Publishers.FlatMap<P, Self>
where T == P.Output, P : Publisher, Self.Failure == P.Failure
```

```swift
let subject = PassthroughSubject<URL, URLError>()
let cancellable = subject
    .flatMap { url in URLSession.shared.dataTaskPublisher(for: url) }
    .sink(receiveCompletion: { _ in }, receiveValue: { print($0.data) })
```

- `maxPublishers` limits concurrent inner subscriptions (e.g., `.max(1)` for serial behavior).
- Failure of any inner publisher fails the entire stream.

## compactMap(_:)

Calls a closure with each element and publishes only non-`nil` results, filtering out `nil`.

```swift
func compactMap<T>(_ transform: @escaping (Self.Output) -> T?) -> Publishers.CompactMap<Self, T>
```

```swift
let cancellable = ["1", "two", "3"].publisher
    .compactMap { Int($0) }
    .sink { print($0) }
// Prints: 1 3
```

- Equivalent to `map` + `filter { $0 != nil }` in one step.
- Use `tryCompactMap(_:)` when the closure can throw.

## scan(_:_:)

Accumulates elements by applying a closure to the current accumulator and each element.

```swift
func scan<T>(_ initialResult: T, _ nextPartialResult: @escaping (T, Self.Output) -> T) -> Publishers.Scan<Self, T>
```

```swift
let cancellable = [1, 2, 3, 4].publisher
    .scan(0) { $0 + $1 }
    .sink { print($0) }
// Prints: 1 3 6 10
```

## Notes

- iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- All transforming operators return new publisher types in the `Publishers` namespace
- Chain `eraseToAnyPublisher()` when exposing transformed publishers across API boundaries

## Related

- [Filtering Operators](./operators-filtering.md)
- [Combining Operators](./operators-combining.md)
- [eraseToAnyPublisher](./erasetoanypublisher.md)
