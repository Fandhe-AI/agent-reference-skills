# HKStatisticsCollectionQuery

A long-running query that performs multiple statistics calculations over a series of fixed-length time intervals, commonly used to produce chart data. Receives live updates when the store changes.

## Signature / Usage

```swift
let query = HKStatisticsCollectionQuery(
    quantityType: HKQuantityType(.stepCount),
    quantitySamplePredicate: nil,
    options: .cumulativeSum,
    anchorDate: Calendar.current.startOfDay(for: .now),
    intervalComponents: DateComponents(day: 1)
)

query.initialResultsHandler = { _, collection, error in
    guard let collection else { return }
    collection.enumerateStatistics(from: startDate, to: endDate) { statistics, _ in
        let steps = statistics.sumQuantity()?.doubleValue(for: .count()) ?? 0
        print("\(statistics.startDate): \(steps) steps")
    }
}

query.statisticsUpdateHandler = { _, statistics, collection, error in
    // Called when new samples are added to the store
}

healthStore.execute(query)
// Stop when done: healthStore.stop(query)
```

## Options / Props

**Initializer:**
```swift
init(
    quantityType: HKQuantityType,
    quantitySamplePredicate: NSPredicate?,
    options: HKStatisticsOptions,
    anchorDate: Date,
    intervalComponents: DateComponents
)
```

| Parameter | Description |
|-----------|-------------|
| `anchorDate` | Reference point that defines interval boundaries (e.g. midnight) |
| `intervalComponents` | Duration of each interval (e.g. `DateComponents(day: 1)`, `DateComponents(hour: 1)`) |
| `options` | Same `HKStatisticsOptions` as `HKStatisticsQuery` |

| Handler property | Signature | Description |
|------------------|-----------|-------------|
| `initialResultsHandler` | `(query, HKStatisticsCollection?, Error?) -> Void` | Called once with the full historical collection |
| `statisticsUpdateHandler` | `(query, HKStatistics?, HKStatisticsCollection?, Error?) -> Void` | Called on each HealthKit store update |

## Notes

iOS 8.0+, iPadOS 8.0+, macOS 13.0+, watchOS 2.0+, visionOS 1.0+. Only works with quantity samples. Set both handlers before calling `execute(_:)`. Call `healthStore.stop(_:)` to end live updates. The `anchorDate` need not be in the query date range — it serves only as a phase reference for computing interval boundaries.

## Related

- [hkstatisticsquery.md](./hkstatisticsquery.md)
- [hkquantitytype.md](./hkquantitytype.md)
- [hkquery.md](./hkquery.md)
- [hkhealthstore.md](./hkhealthstore.md)
