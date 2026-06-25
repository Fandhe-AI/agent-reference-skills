# Int

A signed integer value type. On 32-bit platforms the size is 32 bits; on 64-bit platforms it is 64 bits.

## Signature

```swift
@frozen struct Int
```

## Key APIs

| Name | Description |
|------|-------------|
| `init(_:)` | Create from another integer, floating-point, or string value |
| `init(exactly:)` | Failable initializer; returns `nil` if the value cannot be represented exactly |
| `init(clamping:)` | Create by clamping the source value to the representable range |
| `init(_:radix:)` | Parse a string using the given radix |
| `random(in:)` | Return a random value within a range |
| `random(in:using:)` | Return a random value using a custom generator |
| `quotientAndRemainder(dividingBy:)` | Returns quotient and remainder as a tuple |
| `isMultiple(of:)` | Returns `true` if divisible by the given value |
| `signum()` | Returns −1, 0, or 1 indicating the sign |
| `negate()` | Replaces self with its additive inverse |
| `magnitude` | Absolute value as `UInt` |
| `min` / `max` | Minimum and maximum representable values |
| `zero` | The zero value |
| `isSigned` | Always `true` for `Int` |
| `bitWidth` | Number of bits in the representation |
| `leadingZeroBitCount` / `trailingZeroBitCount` / `nonzeroBitCount` | Bit-level introspection |
| `byteSwapped` | Value with byte order reversed |
| `addingReportingOverflow(_:)` | Addition with overflow detection |
| `multipliedFullWidth(by:)` | Full-width multiplication returning `(high:, low:)` |
| `description` | Decimal string representation |

## Notes

- Available on iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+.
- Conforms to `BinaryInteger`, `FixedWidthInteger`, `SignedInteger`, `Hashable`, `Codable`, `Strideable`, and many more.
- Prefer `Int` over sized types (`Int32`, `Int64`) unless a specific bit-width is required for interop.

## Related

- [Double](./double.md)
- [Float](./float.md)
- [Range](./range.md)
