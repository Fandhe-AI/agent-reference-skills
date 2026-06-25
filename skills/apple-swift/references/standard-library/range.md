# Range

A half-open interval `[lowerBound, upperBound)` — includes the lower bound but excludes the upper bound.

## Signature

```swift
@frozen struct Range<Bound> where Bound : Comparable
```

## Usage

```swift
let r = 0..<5
print(r.contains(4))   // true
print(r.contains(5))   // false

for n in 1..<4 { print(n) }  // 1, 2, 3

let clamped = (0..<100).clamped(to: 10..<50)  // 10..<50
```

## Key APIs

| Name | Description |
|------|-------------|
| `..<(_:_:)` | Operator to create a `Range` |
| `lowerBound` | The inclusive lower bound |
| `upperBound` | The exclusive upper bound |
| `isEmpty` | `true` when `lowerBound == upperBound` |
| `contains(_:)` | `true` if the element is within the range |
| `overlaps(_:)` | `true` if the ranges share any elements |
| `clamped(to:)` | Return a copy clamped within a limiting range |
| `~=(_:_:)` | Pattern matching; enables `case 0..<10` |
| `relative(to:)` | Resolve a relative range against a collection |

When `Bound` is a `Strideable` type with `SignedInteger` stride, `Range` is also a `RandomAccessCollection` and is iterable.

## ClosedRange

`ClosedRange<Bound>` (`...`) includes both bounds. It cannot be empty.

```swift
let closed = 0...5     // [0, 1, 2, 3, 4, 5]
let half   = 0..<5     // [0, 1, 2, 3, 4]
```

## Notes

- Available on iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+.
- Conforms to `RangeExpression`, `Equatable`, `Hashable` (when `Bound: Hashable`), `Codable` (when `Bound: Codable`), `Sendable`.
- Passing an out-of-bounds range as a subscript to a collection triggers a runtime error.

## Related

- [Array](./array.md)
- [Int](./int.md)
