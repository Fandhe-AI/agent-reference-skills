# HKQuantityType

A concrete `HKSampleType` subclass identifying samples that store numerical values (e.g., steps, heart rate, body mass).

## Signature / Usage

```swift
// Modern initializer (iOS 16+)
let stepType = HKQuantityType(.stepCount)

// Legacy factory method
let heartRateType = HKQuantityType.quantityType(forIdentifier: .heartRate)!

// Check unit compatibility
let bpmUnit = HKUnit(from: "count/min")
print(heartRateType.is(compatibleWith: bpmUnit)) // true

// Aggregation style
switch stepType.aggregationStyle {
case .cumulative:   print("Sum across time")
case .discreteArithmetic: print("Average/min/max")
default: break
}
```

## Options / Props

| Property / Method | Type | Description |
|-------------------|------|-------------|
| `aggregationStyle` | `HKQuantityAggregationStyle` | How quantities aggregate: `.cumulative` (sum) or `.discreteArithmetic` (avg/min/max) |
| `is(compatibleWith:)` | `Bool` | Whether a given `HKUnit` is valid for this type |
| `identifier` | `String` | Inherited from `HKObjectType`; e.g. `"HKQuantityTypeIdentifierStepCount"` |

## Notes

iOS 8.0+, iPadOS 8.0+, macOS 13.0+, watchOS 2.0+, visionOS 1.0+. The `aggregationStyle` determines which `HKStatisticsOptions` are valid — use `.cumulativeSum` for cumulative types and `.discreteAverage`/`.discreteMin`/`.discreteMax` for discrete types. Identifiers are defined in `HKQuantityTypeIdentifier`.

## Related

- [hkobjecttype.md](./hkobjecttype.md)
- [hksampletype.md](./hksampletype.md)
- [hkquantitysample.md](./hkquantitysample.md)
- [hkstatisticsquery.md](./hkstatisticsquery.md)
