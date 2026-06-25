# CaseIterable

A type that provides a collection of all of its values.

## Signature

```swift
protocol CaseIterable
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `AllCases` | associatedtype | A type representing a collection of all values; defaults to `[Self]` |
| `allCases` | `Self.AllCases` | A collection of all values of this type (static) |

## Usage

```swift
enum CompassDirection: CaseIterable {
    case north, south, east, west
}

print(CompassDirection.allCases.count)  // 4

for direction in CompassDirection.allCases {
    print(direction)
}
```

## Notes

- Availability: iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+
- Automatic synthesis for `enum` without associated values and without `@available` on cases
- Cases appear in `allCases` in declaration order
- Enums with associated values require manual implementation of `allCases`

## Related

- [RawRepresentable](./rawrepresentable.md)
