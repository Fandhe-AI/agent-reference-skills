# HKHealthStore

The access point for all data managed by HealthKit. Manages authorization, queries, saves, and background delivery.

## Signature / Usage

```swift
let healthStore = HKHealthStore()

// Check availability
guard HKHealthStore.isHealthDataAvailable() else { return }

// Request authorization (async/await)
let typesToRead: Set<HKObjectType> = [HKQuantityType(.stepCount), HKQuantityType(.heartRate)]
let typesToShare: Set<HKSampleType> = [HKQuantityType(.stepCount)]
try await healthStore.requestAuthorization(toShare: typesToShare, read: typesToRead)

// Execute a query
healthStore.execute(query)

// Save a sample
healthStore.save(sample) { success, error in ... }
```

## Options / Props

| Method | Description |
|--------|-------------|
| `isHealthDataAvailable()` | Class method; returns `Bool` — false on iPad/Mac without HealthKit entitlement |
| `requestAuthorization(toShare:read:)` | Async throws; presents permission sheet |
| `requestAuthorization(toShare:read:completion:)` | Completion-based variant |
| `authorizationStatus(for:)` | Returns `HKAuthorizationStatus` for a write type |
| `getRequestStatusForAuthorization(toShare:read:completion:)` | Whether the permission sheet would be shown |
| `execute(_:)` | Starts any `HKQuery` subclass |
| `stop(_:)` | Stops a long-running query |
| `save(_:withCompletion:)` | Saves a single `HKObject` |
| `save(_:withCompletion:)` | Saves an array of `HKObject` |
| `delete(_:withCompletion:)` | Deletes a single or array of `HKObject` |
| `deleteObjects(of:predicate:withCompletion:)` | Deletes matching objects by type and predicate |
| `enableBackgroundDelivery(for:frequency:withCompletion:)` | Background update notifications; requires `com.apple.developer.healthkit.background-delivery` entitlement |
| `disableBackgroundDelivery(for:withCompletion:)` | Disables background delivery for a type |
| `preferredUnits(for:completion:)` | Returns user-preferred `HKUnit` per quantity type |
| `earliestPermittedSampleDate()` | Earliest date samples may be saved/read |

## Notes

iOS 8.0+, iPadOS 8.0+, macOS 14.0+, watchOS 2.0+, visionOS 1.0+. HealthKit is unavailable on iPad unless the app includes the HealthKit entitlement and the device runs iPadOS 17+. Read authorization status is never exposed — HealthKit returns empty results rather than denying access.

## Related

- [hkauthorizationstatus.md](./hkauthorizationstatus.md)
- [hkquery.md](./hkquery.md)
- [hkobjecttype.md](./hkobjecttype.md)
