# RawRepresentable

A type that can be converted to and from an associated raw value.

## Signature

```swift
protocol RawRepresentable<RawValue>
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `RawValue` | associatedtype | The raw type that all values of the conforming type can convert to and from |
| `rawValue` | `Self.RawValue` | The corresponding value of the raw type |
| `init?(rawValue:)` | failable init | Creates an instance from its raw value; returns `nil` if there is no value of the type with that raw value |

## Usage

```swift
enum Planet: Int, RawRepresentable {
    case mercury = 1, venus, earth, mars
}

print(Planet.earth.rawValue)        // 3
print(Planet(rawValue: 2))          // Optional(Planet.venus)
print(Planet(rawValue: 99))         // nil
```

## Notes

- Availability: iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+
- The Swift compiler automatically adds `RawRepresentable` conformance to enums with `String`, `Int`, or floating-point raw type
- Simplifies conformance to `Equatable`, `Comparable`, and `Hashable` via the raw value
- `OptionSet` uses `RawRepresentable` with bitfield `RawValue`

## Related

- [CaseIterable](./caseiterable.md)
- [Hashable](./hashable.md)
