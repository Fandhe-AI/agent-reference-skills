# Bool

A value type whose instances are either `true` or `false`.

## Signature

```swift
@frozen struct Bool
```

## Key APIs

| Name | Description |
|------|-------------|
| `init()` | Creates an instance initialized to `false` |
| `init(_: String)` | Creates from a string (`"true"` or `"false"`); failable |
| `toggle()` | Flips the value in place (`true` → `false`, `false` → `true`) |
| `!(_:)` | Logical NOT |
| `&&(_:_:)` | Logical AND (short-circuit) |
| `\|\|(_:_:)` | Logical OR (short-circuit) |
| `==(_:_:)` / `!=(_:_:)` | Equality comparison |
| `random()` | Returns a random Boolean value |
| `random(using:)` | Returns a random Boolean using a custom generator |
| `description` | `"true"` or `"false"` |

## Notes

- Available on iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+.
- Conforms to `Equatable`, `Hashable`, `Codable`, `Sendable`, `ExpressibleByBooleanLiteral`.
- Swift requires explicit Boolean values in conditional contexts; integers cannot substitute for `Bool`.

## Related

- [Optional](./optional.md)
