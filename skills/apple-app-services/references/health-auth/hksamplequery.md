# HKSampleQuery

A one-shot query returning a snapshot of all matching samples currently in the HealthKit store.

## Signature / Usage

```swift
let predicate = HKQuery.predicateForSamples(
    withStart: Calendar.current.startOfDay(for: .now),
    end: .now,
    options: .strictStartDate
)

let query = HKSampleQuery(
    sampleType: HKQuantityType(.stepCount),
    predicate: predicate,
    limit: HKObjectQueryNoLimit,
    sortDescriptors: [NSSortDescriptor(key: HKSampleSortIdentifierStartDate, ascending: false)]
) { _, samples, error in
    guard let samples = samples as? [HKQuantitySample], error == nil else { return }
    // Process samples
}

healthStore.execute(query)
```

## Options / Props

**Primary initializer:**
```swift
init(
    sampleType: HKSampleType,
    predicate: NSPredicate?,
    limit: Int,
    sortDescriptors: [NSSortDescriptor]?,
    resultsHandler: (HKSampleQuery, [HKSample]?, (any Error)?) -> Void
)
```

**Multi-type initializer (using descriptors):**
```swift
init(
    queryDescriptors: [HKQueryDescriptor],
    limit: Int,
    sortDescriptors: [NSSortDescriptor],
    resultsHandler: (HKSampleQuery, [HKSample]?, (any Error)?) -> Void
)
```

| Parameter | Description |
|-----------|-------------|
| `sampleType` | The concrete `HKSampleType` to query |
| `predicate` | Optional filter; `nil` returns all samples of the type |
| `limit` | Max results; use `HKObjectQueryNoLimit` (0) for all |
| `sortDescriptors` | Ordering; `nil` returns unordered results |
| `resultsHandler` | Called once with results or error; `nil` samples means error |

## Notes

iOS 8.0+, iPadOS 8.0+, macOS 13.0+, watchOS 2.0+, visionOS 1.0+. Returns a point-in-time snapshot — use `HKObserverQuery` or `HKAnchoredObjectQuery` for live updates. Use `HKQueryDescriptor` initializers to query multiple sample types in one request. Do not subclass.

## Related

- [hkquery.md](./hkquery.md)
- [hkquantitysample.md](./hkquantitysample.md)
- [hkobserverquery.md](./hkobserverquery.md)
