# Equatable

A type that can be compared for value equality.

## Signature

```swift
protocol Equatable : ~Copyable, ~Escapable
```

## Usage

```swift
struct Point: Equatable {
    var x: Int
    var y: Int
}

let p1 = Point(x: 1, y: 2)
let p2 = Point(x: 1, y: 2)
print(p1 == p2)  // true
```

## Notes

- Availability: iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+
- Automatic synthesis is provided for `struct` (all stored properties must conform) and `enum` (all associated values must conform)
- Manually implement `static func == (lhs: Self, rhs: Self) -> Bool`; `!=` is derived automatically
- `==` must be reflexive, symmetric, and transitive
- Conforming enables use of `contains(_:)`, `firstIndex(of:)`, and other sequence/collection operations

## Related

- [Hashable](./hashable.md)
- [Comparable](./comparable.md)
- [Identifiable](./identifiable.md)
