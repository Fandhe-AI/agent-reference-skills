# Float

A single-precision, 32-bit floating-point value type.

## Signature

```swift
@frozen struct Float
```

## Key APIs

| Name | Description |
|------|-------------|
| `init(_:)` | Create from an integer or another floating-point value |
| `init(exactly:)` | Failable; returns `nil` if the value cannot be represented exactly |
| `random(in:)` | Return a random value within a range |
| `squareRoot()` | Return the square root |
| `addingProduct(_:_:)` | Fused multiply-add: `self + (a * b)` |
| `remainder(dividingBy:)` | IEEE 754 remainder |
| `rounded(_:)` | Round using a specified `FloatingPointRoundingRule` |
| `round(_:)` | Round in place |
| `minimum(_:_:)` / `maximum(_:_:)` | IEEE 754 minimum/maximum |
| `pi` | The mathematical constant π (32-bit precision) |
| `infinity` | Positive infinity |
| `nan` | A quiet NaN |
| `greatestFiniteMagnitude` | Largest finite value (~3.4 × 10³⁸) |
| `isZero` / `isFinite` / `isInfinite` / `isNaN` / `isNormal` | State predicates |
| `significand` / `exponent` | IEEE 754 components |
| `bitPattern` | Raw 32-bit bit pattern |

## Notes

- Available on iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+.
- Conforms to `BinaryFloatingPoint`, `Hashable`, `Codable`, `SIMDScalar`, `CVarArg`.
- Prefer `Double` for general use; use `Float` when memory or SIMD performance matters.

## Related

- [Double](./double.md)
- [Int](./int.md)
