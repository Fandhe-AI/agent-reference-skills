# Combining Operators

Operators that merge or coordinate multiple publishers: `combineLatest`, `merge`, `zip`.

## combineLatest(_:)

Subscribes to another publisher and emits a tuple of the latest values from both publishers whenever either emits a new element.

```swift
func combineLatest<P>(_ other: P) -> Publishers.CombineLatest<Self, P>
where P : Publisher, Self.Failure == P.Failure
```

```swift
let pub1 = PassthroughSubject<Int, Never>()
let pub2 = PassthroughSubject<Int, Never>()

let cancellable = pub1.combineLatest(pub2)
    .sink { print("(\($0.0), \($0.1))") }

pub1.send(1)
pub1.send(2)
pub2.send(2)   // Prints: (2, 2)
pub1.send(3)   // Prints: (3, 2)
pub2.send(22)  // Prints: (3, 22)
```

- Does not emit until **both** publishers have emitted at least one value.
- Overloads accept up to 4 publishers: `combineLatest(_:_:)`, `combineLatest(_:_:_:)`.

## merge(with:)

Interleaves elements from multiple publishers of the same `Output` and `Failure` type into a single stream.

```swift
func merge<P>(with other: P) -> Publishers.Merge<Self, P>
where P : Publisher, Self.Failure == P.Failure, Self.Output == P.Output
```

```swift
let pub1 = PassthroughSubject<Int, Never>()
let pub2 = PassthroughSubject<Int, Never>()

let cancellable = pub1.merge(with: pub2)
    .sink { print($0, terminator: " ") }

pub1.send(1)
pub2.send(2)
pub1.send(3)
// Prints: 1 2 3
```

- Overloads accept up to 7 publishers: `merge(with:_:)`, etc.
- Fails immediately if any upstream publisher fails.
- Completes only when all upstream publishers complete.

## zip(_:)

Pairs the oldest unconsumed element from each publisher into tuples, emitting only when all paired publishers have emitted.

```swift
func zip<P>(_ other: P) -> Publishers.Zip<Self, P>
where P : Publisher, Self.Failure == P.Failure
```

```swift
let numbers = PassthroughSubject<Int, Never>()
let letters = PassthroughSubject<String, Never>()

let cancellable = numbers.zip(letters)
    .sink { print($0) }

numbers.send(1)
numbers.send(2)
letters.send("A")  // Emits (1, "A")
letters.send("B")  // Emits (2, "B")
// Prints: (1, "A") (2, "B")
```

- Waits for each publisher to emit before pairing — buffers unconsumed elements.
- Overloads accept up to 4 publishers.

## Notes

- iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- **combineLatest**: use when you need the latest state from multiple sources
- **merge**: use when publishers share the same type and you want a unified stream
- **zip**: use when element pairing/ordering matters (like a zipper)

## Related

- [Transforming Operators](./operators-transforming.md)
- [Publisher](./publisher.md)
- [PassthroughSubject](./passthroughsubject.md)
