# HKAuthorizationStatus

An enum indicating the app's authorization status for **sharing** (writing) a specific HealthKit data type. Returned by `HKHealthStore.authorizationStatus(for:)`.

## Signature / Usage

```swift
let status = healthStore.authorizationStatus(for: HKQuantityType(.stepCount))

switch status {
case .notDetermined:
    // Request authorization
    try await healthStore.requestAuthorization(toShare: [HKQuantityType(.stepCount)], read: [])
case .sharingAuthorized:
    // Safe to save samples
    healthStore.save(sample) { _, _ in }
case .sharingDenied:
    // Show user guidance to enable in Health app
    break
@unknown default:
    break
}
```

## Options / Props

| Case | Raw Value | Description |
|------|-----------|-------------|
| `.notDetermined` | `0` | User has not yet responded to a permission request for this type |
| `.sharingDenied` | `1` | User explicitly denied write access |
| `.sharingAuthorized` | `2` | User granted write access |

## Notes

iOS 8.0+, iPadOS 8.0+, macOS 13.0+, watchOS 2.0+, visionOS 1.0+. **Read authorization is never exposed** — HealthKit protects user privacy by returning empty results when read access is denied rather than reporting the denial. `authorizationStatus(for:)` only reflects write (share) permissions. To check whether requesting authorization would show the permission sheet, use `getRequestStatusForAuthorization(toShare:read:completion:)`.

## Related

- [hkhealthstore.md](./hkhealthstore.md)
- [hkobjecttype.md](./hkobjecttype.md)
