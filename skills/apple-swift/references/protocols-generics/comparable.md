# Comparable

A type that can be compared using the relational operators `<`, `<=`, `>=`, and `>`.

## Signature

```swift
protocol Comparable : Equatable, ~Copyable, ~Escapable
```

## Usage

```swift
struct Version: Comparable {
    let major: Int, minor: Int

    static func < (lhs: Version, rhs: Version) -> Bool {
        if lhs.major != rhs.major { return lhs.major < rhs.major }
        return lhs.minor < rhs.minor
    }
}

let versions = [Version(major: 2, minor: 0), Version(major: 1, minor: 5)]
print(versions.sorted())  // [1.5, 2.0]
```

## Notes

- Availability: iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+
- Inherits from `Equatable`; implement `<` and `==` — the standard library derives `>`, `<=`, `>=`
- For any two values exactly one must be true: `a == b`, `a < b`, or `b < a`
- Enables `sorted()`, `min()`, `max()`, and range operators on conforming types

## Related

- [Equatable](./equatable.md)
- [Hashable](./hashable.md)
