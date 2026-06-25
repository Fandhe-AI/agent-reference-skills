# HKObserverQuery

A long-running query that monitors the HealthKit store and notifies the app when matching samples are added or deleted.

## Signature / Usage

```swift
let query = HKObserverQuery(
    sampleType: HKQuantityType(.heartRate),
    predicate: nil
) { query, completionHandler, error in
    guard error == nil else { return }
    // Fetch updated data here, then call completionHandler
    fetchLatestHeartRate()
    completionHandler()
}

healthStore.execute(query)

// Enable background delivery so updates arrive when app is suspended
healthStore.enableBackgroundDelivery(
    for: HKQuantityType(.heartRate),
    frequency: .immediate,
    withCompletion: { success, error in ... }
)
```

## Options / Props

**Initializer (single type):**
```swift
init(
    sampleType: HKSampleType,
    predicate: NSPredicate?,
    updateHandler: (HKObserverQuery, HKObserverQueryCompletionHandler, (any Error)?) -> Void
)
```

**Initializer (multi-type via descriptors):**
```swift
init(
    queryDescriptors: [HKQueryDescriptor],
    updateHandler: (HKObserverQuery, Set<HKSampleType>?, HKObserverQueryCompletionHandler, (any Error)?) -> Void
)
```

| Parameter | Description |
|-----------|-------------|
| `updateHandler` | Fired each time matching data changes; must call `completionHandler()` when done |
| `HKObserverQueryCompletionHandler` | Zero-argument closure the system requires you to call to acknowledge the update |

## Notes

iOS 8.0+, iPadOS 8.0+, macOS 13.0+, watchOS 2.0+, visionOS 1.0+. Observer queries are immutable. Background delivery does not work on Simulator — test on device only. Requires `com.apple.developer.healthkit.background-delivery` entitlement and calling `enableBackgroundDelivery(for:frequency:withCompletion:)` on `HKHealthStore`. The update handler does not provide the changed data — execute a separate `HKSampleQuery` or `HKAnchoredObjectQuery` inside it to fetch changes.

## Related

- [hkquery.md](./hkquery.md)
- [hkhealthstore.md](./hkhealthstore.md)
- [hksamplequery.md](./hksamplequery.md)
