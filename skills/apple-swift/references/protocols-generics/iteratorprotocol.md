# IteratorProtocol

A type that supplies the values of a sequence one at a time.

## Signature

```swift
protocol IteratorProtocol<Element>
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `Element` | associatedtype | The type of element traversed by the iterator |
| `next()` | `mutating func () -> Element?` | Advances to the next element and returns it, or `nil` if the sequence is exhausted |

## Usage

```swift
struct FibIterator: IteratorProtocol {
    var (a, b) = (0, 1)

    mutating func next() -> Int? {
        defer { (a, b) = (b, a + b) }
        return a
    }
}

var it = FibIterator()
print(it.next())  // Optional(0)
print(it.next())  // Optional(1)
print(it.next())  // Optional(1)
```

## Notes

- Availability: iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+
- Once `next()` returns `nil`, all subsequent calls must also return `nil`
- Iterators are consumed — they are not meant to be reset or reused
- A type can conform to both `IteratorProtocol` and `Sequence` to serve as its own iterator

## Related

- [Sequence](./sequence.md)
- [Collection](./collection.md)
