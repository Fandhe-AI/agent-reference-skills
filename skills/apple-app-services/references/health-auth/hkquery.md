# HKQuery

Abstract base class for all HealthKit query objects. Never instantiated directly — use a concrete subclass and execute it via `HKHealthStore.execute(_:)`.

## Signature / Usage

```swift
// Queries are always executed through HKHealthStore
let query = HKSampleQuery(
    sampleType: HKQuantityType(.stepCount),
    predicate: HKQuery.predicateForSamples(withStart: startDate, end: endDate, options: .strictStartDate),
    limit: HKObjectQueryNoLimit,
    sortDescriptors: nil
) { _, samples, error in ... }

healthStore.execute(query)
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `predicate` | `NSPredicate?` | Filters objects at the database level (converted to SQL) |
| `objectType` | `HKObjectType?` | The type of objects being queried |

**Common predicate factory methods:**

| Method | Description |
|--------|-------------|
| `predicateForSamples(withStart:end:options:)` | Filter by date range |
| `predicateForObject(with:)` | Filter by UUID |
| `predicateForObjects(from:)` | Filter by source app |
| `predicateForObjects(withMetadataKey:)` | Filter by metadata key |
| `predicateForQuantitySamples(with:quantity:)` | Filter by quantity comparison |
| `predicateForWorkouts(with:)` | Filter by workout activity type |

## Notes

iOS 8.0+, iPadOS 8.0+, macOS 13.0+, watchOS 2.0+, visionOS 1.0+. Only use HealthKit-provided predicate key paths — custom NSExpression or key paths not in the HealthKit predicate API are rejected. Queries are immutable once created. Concrete subclasses: `HKSampleQuery`, `HKStatisticsQuery`, `HKStatisticsCollectionQuery`, `HKObserverQuery`, `HKAnchoredObjectQuery`, `HKCorrelationQuery`, `HKSourceQuery`.

## Related

- [hksamplequery.md](./hksamplequery.md)
- [hkstatisticsquery.md](./hkstatisticsquery.md)
- [hkstatisticscollectionquery.md](./hkstatisticscollectionquery.md)
- [hkobserverquery.md](./hkobserverquery.md)
- [hkhealthstore.md](./hkhealthstore.md)
