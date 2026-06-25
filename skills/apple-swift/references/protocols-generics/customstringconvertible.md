# CustomStringConvertible

A type with a customized textual representation.

## Signature

```swift
protocol CustomStringConvertible
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `description` | `String` | A textual representation of the instance (required) |

## Usage

```swift
struct Point: CustomStringConvertible {
    let x: Int, y: Int

    var description: String { "(\(x), \(y))" }
}

let p = Point(x: 3, y: 7)
print(p)                   // (3, 7)
print(String(describing: p))  // (3, 7)
```

## Notes

- Availability: iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+
- `print(_:)` and `String(describing:)` use `description` when available
- Do not access `description` directly as a generic constraint; prefer `String(describing:)`
- For debugging output, implement `CustomDebugStringConvertible` (`debugDescription`) instead
- `LosslessStringConvertible` extends this for round-trip string conversion

## Related

- [Sequence](./sequence.md)
