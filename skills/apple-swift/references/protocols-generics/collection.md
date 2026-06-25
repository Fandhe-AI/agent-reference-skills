# Collection

A sequence whose elements can be traversed multiple times, nondestructively, and accessed by an indexed subscript.

## Signature

```swift
protocol Collection<Element> : Sequence
```

## Usage

```swift
struct NumberRange: Collection {
    let range: Range<Int>

    var startIndex: Int { range.lowerBound }
    var endIndex: Int   { range.upperBound }

    func index(after i: Int) -> Int { i + 1 }
    subscript(position: Int) -> Int { position }
}

let c = NumberRange(range: 1..<4)
print(c[2])          // 2
print(c.count)       // 3
```

## Notes

- Availability: iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+
- Minimum conformance requirements: `startIndex`, `endIndex`, subscript, and `index(after:)`
- `startIndex`, `endIndex`, and subscript must be O(1); document any deviations
- Refines `Sequence` — enables multi-pass traversal and positional subscripting
- Subtypes: `BidirectionalCollection`, `RandomAccessCollection`, `MutableCollection`, `RangeReplaceableCollection`

## Related

- [Sequence](./sequence.md)
- [IteratorProtocol](./iteratorprotocol.md)
