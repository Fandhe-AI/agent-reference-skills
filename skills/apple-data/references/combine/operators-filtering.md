# Filtering Operators

Operators that selectively republish elements from an upstream publisher: `filter`, `removeDuplicates`, `compactMap` (see also Transforming Operators), `first`, `last`, `drop`, `prefix`, and related variants.

## filter(_:)

Republishes only elements that satisfy a predicate closure.

```swift
func filter(_ isIncluded: @escaping (Self.Output) -> Bool) -> Publishers.Filter<Self>
```

```swift
let cancellable = [1, 2, 3, 4, 5].publisher
    .filter { $0 % 2 == 0 }
    .sink { print($0) }
// Prints: 2 4
```

- Use `tryFilter(_:)` when the predicate can throw.

## removeDuplicates()

Publishes only elements that differ from the immediately preceding element. Requires `Output: Equatable`.

```swift
func removeDuplicates() -> Publishers.RemoveDuplicates<Self>
```

```swift
let cancellable = [0, 1, 2, 2, 3, 3, 3, 0].publisher
    .removeDuplicates()
    .sink { print($0, terminator: " ") }
// Prints: 0 1 2 3 0
```

- Use `removeDuplicates(by:)` to provide a custom equality closure when `Output` is not `Equatable`.
- Compares only adjacent elements — non-adjacent duplicates are not removed.

## drop(while:) / dropFirst(_:)

Skips elements until a condition is no longer met, then passes all subsequent elements.

```swift
func drop(while predicate: @escaping (Self.Output) -> Bool) -> Publishers.Drop<Self>
func dropFirst(_ count: Int = 1) -> Publishers.Drop<Self>
```

## prefix(_:) / prefix(while:)

Republishes elements until a count is reached or a condition becomes false, then completes.

```swift
func prefix(_ maxLength: Int) -> Publishers.Output<Self>
func prefix(while predicate: @escaping (Self.Output) -> Bool) -> Publishers.PrefixWhile<Self>
```

## first() / last()

Publishes the first (or last) element matching an optional predicate, then completes.

```swift
func first() -> Publishers.First<Self>
func first(where predicate: @escaping (Self.Output) -> Bool) -> Publishers.FirstWhere<Self>
func last() -> Publishers.Last<Self>
```

## Notes

- iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- `last()` and `last(where:)` must buffer all elements until the upstream completes

## Related

- [Transforming Operators](./operators-transforming.md)
- [Timing Operators](./operators-timing.md)
- [Publisher](./publisher.md)
