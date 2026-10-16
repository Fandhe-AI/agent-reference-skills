# MLTensorRangeExpression

A type that can be used to slice a dimension of a tensor. Don't use this type directly.

## Signature / Usage

```swift
protocol MLTensorRangeExpression : Sendable
```

## Options / Props

All members below are static and available when `Self` is `_MLTensorRange`.

| Name | Signature | Description |
|------|-----------|-------------|
| `newAxis` | `static var newAxis: any MLTensorRangeExpression` | Expands the tensor at the specified dimension |
| `squeezeAxis` | `static var squeezeAxis: any MLTensorRangeExpression` | Squeezes the tensor at the specified dimension |
| `fillAll` | `static var fillAll: any MLTensorRangeExpression` | Same as the ellipsis literal `...`, indicating unspecified dimensions of the tensor |
| `index(_:)` | `static func index(Int) -> any MLTensorRangeExpression` | Slices the tensor at the specified dimension |
| `range(_:stride:)` | `static func range(Range<Int>, stride: Int) -> any MLTensorRangeExpression` | Slices the tensor at the specified dimension |
| `closedRange(_:stride:)` | `static func closedRange(ClosedRange<Int>, stride: Int) -> any MLTensorRangeExpression` | Slices the tensor at the specified dimension |
| `partialRangeFrom(_:stride:)` | `static func partialRangeFrom(PartialRangeFrom<Int>, stride: Int) -> any MLTensorRangeExpression` | Slices the tensor at the specified dimension |
| `partialRangeUpTo(_:stride:)` | `static func partialRangeUpTo(_:stride:)` | Slices the tensor at the specified dimension (full parameter types not shown on the source page) |

## Notes

- iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+
- Inherits from `Sendable`, `SendableMetatype`
- Official guidance: don't use this type directly

## Related

- [MLTensor](./mltensor.md)
- [MLTensorScalar](./mltensorscalar.md)
