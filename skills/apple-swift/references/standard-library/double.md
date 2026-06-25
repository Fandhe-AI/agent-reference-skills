# Double

A double-precision, 64-bit floating-point value type.

## Signature

```swift
@frozen struct Double
```

## Key APIs

| Name | Description |
|------|-------------|
| `init(_:)` | Create from an integer or another floating-point value |
| `init(exactly:)` | Failable; returns `nil` if the value cannot be represented exactly |
| `init(sign:exponent:significand:)` | Construct from IEEE 754 components |
| `init(bitPattern:)` | Create from a 64-bit bit pattern |
| `random(in:)` | Return a random value within a range |
| `squareRoot()` | Return the square root |
| `addingProduct(_:_:)` | Fused multiply-add: `self + (a * b)` |
| `remainder(dividingBy:)` | IEEE 754 remainder |
| `rounded(_:)` | Round using a specified `FloatingPointRoundingRule` |
| `round(_:)` | Round in place |
| `isEqual(to:)` / `isLess(than:)` | IEEE 754 comparison predicates |
| `minimum(_:_:)` / `maximum(_:_:)` | IEEE 754 minimum/maximum |
| `pi` | The mathematical constant π |
| `infinity` | Positive infinity |
| `nan` | A quiet NaN |
| `greatestFiniteMagnitude` | Largest finite value |
| `leastNormalMagnitude` / `leastNonzeroMagnitude` | Smallest normal/non-zero values |
| `ulp` | Unit in the last place |
| `isZero` / `isFinite` / `isInfinite` / `isNaN` / `isNormal` / `isSubnormal` | State predicates |
| `significand` / `exponent` | IEEE 754 components |
| `bitPattern` | Raw 64-bit bit pattern |

## Notes

- Available on iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+.
- Conforms to `BinaryFloatingPoint`, `Hashable`, `Codable`, `Strideable`, `CustomStringConvertible`.
- Use `isNaN` instead of `== .nan` — NaN is never equal to itself.

## Related

- [Float](./float.md)
- [Int](./int.md)
