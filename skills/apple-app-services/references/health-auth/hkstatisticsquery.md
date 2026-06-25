# HKStatisticsQuery

A one-shot query that performs statistical calculations (sum, average, min, max) over a set of matching quantity samples.

## Signature / Usage

```swift
let query = HKStatisticsQuery(
    quantityType: HKQuantityType(.stepCount),
    quantitySamplePredicate: HKQuery.predicateForSamples(
        withStart: Calendar.current.startOfDay(for: .now),
        end: .now,
        options: .strictStartDate
    ),
    options: .cumulativeSum
) { _, statistics, error in
    guard let sum = statistics?.sumQuantity() else { return }
    let steps = sum.doubleValue(for: HKUnit.count())
    print("Steps today: \(steps)")
}

healthStore.execute(query)
```

## Options / Props

**Initializer:**
```swift
init(
    quantityType: HKQuantityType,
    quantitySamplePredicate: NSPredicate?,
    options: HKStatisticsOptions,
    completionHandler: (HKStatisticsQuery, HKStatistics?, (any Error)?) -> Void
)
```

**`HKStatisticsOptions` values:**

| Option | Applicable to | Description |
|--------|---------------|-------------|
| `.cumulativeSum` | Cumulative types (e.g. steps) | Total sum |
| `.discreteAverage` | Discrete types (e.g. heart rate) | Arithmetic mean |
| `.discreteMin` | Discrete types | Minimum value |
| `.discreteMax` | Discrete types | Maximum value |
| `.mostRecent` | Discrete types | Most recent value |
| `.separateBySource` | Any | Calculate statistics per source |

## Notes

iOS 8.0+, iPadOS 8.0+, macOS 13.0+, watchOS 2.0+, visionOS 1.0+. Only works with quantity samples — not workouts or correlations. Discrete types support average/min/max; cumulative types support sum. Check `HKQuantityType.aggregationStyle` to determine which options apply. The result `HKStatistics` object exposes methods like `sumQuantity()`, `averageQuantity()`, `minimumQuantity()`, `maximumQuantity()`.

## Related

- [hkstatisticscollectionquery.md](./hkstatisticscollectionquery.md)
- [hkquantitytype.md](./hkquantitytype.md)
- [hkquery.md](./hkquery.md)
