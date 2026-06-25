# HKQuantitySample

An immutable `HKSample` representing a numerical health measurement with a value, unit, and time interval.

## Signature / Usage

```swift
// Create a step count sample
let stepType = HKQuantityType(.stepCount)
let quantity = HKQuantity(unit: .count(), doubleValue: 1234)
let sample = HKQuantitySample(
    type: stepType,
    quantity: quantity,
    start: startDate,
    end: endDate
)

healthStore.save(sample) { success, error in ... }

// Read back and extract value
if let sample = samples.first as? HKQuantitySample {
    let steps = sample.quantity.doubleValue(for: .count())
}
```

## Options / Props

**Initializers:**

```swift
// Minimal
convenience init(type: HKQuantityType, quantity: HKQuantity, start: Date, end: Date)

// With metadata
convenience init(type: HKQuantityType, quantity: HKQuantity, start: Date, end: Date,
                 metadata: [String: Any]?)

// With device and metadata
convenience init(type: HKQuantityType, quantity: HKQuantity, start: Date, end: Date,
                 device: HKDevice?, metadata: [String: Any]?)
```

| Property | Type | Description |
|----------|------|-------------|
| `quantity` | `HKQuantity` | The numeric value and unit |
| `quantityType` | `HKQuantityType` | The type of this sample |
| `count` | `Int` | Number of quantities (>1 for aggregated samples) |

## Notes

iOS 8.0+, iPadOS 8.0+, macOS 13.0+, watchOS 2.0+, visionOS 1.0+. In iOS 13+/watchOS 6+, `HKQuantitySample` is an abstract superclass of `HKCumulativeQuantitySample` and `HKDiscreteQuantitySample` — the system picks the right subclass automatically based on `HKQuantityType`. Do not subclass; use metadata with custom keys to attach extra information.

## Related

- [hkquantitytype.md](./hkquantitytype.md)
- [hkunit.md](./hkunit.md)
- [hksamplequery.md](./hksamplequery.md)
