# Hashable

A type that can be hashed into a `Hasher` to produce an integer hash value.

## Signature

```swift
protocol Hashable : Equatable, ~Copyable, ~Escapable
```

## Usage

```swift
struct GridPoint: Hashable {
    var x: Int
    var y: Int

    func hash(into hasher: inout Hasher) {
        hasher.combine(x)
        hasher.combine(y)
    }
}

var visited: Set<GridPoint> = []
visited.insert(GridPoint(x: 0, y: 0))
```

## Notes

- Availability: iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+
- Inherits from `Equatable`; conforming types can be used in `Set` or as `Dictionary` keys
- Automatic synthesis: `struct` (all stored properties conform) or `enum` (all associated values conform)
- When implementing manually: values fed to `hash(into:)` must match those used in `==`
- Two equal instances must always produce the same hash value

## Related

- [Equatable](./equatable.md)
- [Comparable](./comparable.md)
