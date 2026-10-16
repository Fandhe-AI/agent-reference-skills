# CLLocationManager

The central object for starting and stopping location-related event delivery. Configure it with desired accuracy and distance filters, then assign a delegate or use the async `CLLocationUpdate` API.

## Signature / Usage

```swift
let manager = CLLocationManager()
manager.delegate = self
manager.desiredAccuracy = kCLLocationAccuracyBest
manager.requestWhenInUseAuthorization()
manager.startUpdatingLocation()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `delegate` | `(any CLLocationManagerDelegate)?` | Object receiving location events |
| `authorizationStatus` | `CLAuthorizationStatus` | Current authorization level |
| `accuracyAuthorization` | `CLAccuracyAuthorization` | Granted accuracy level |
| `desiredAccuracy` | `CLLocationAccuracy` | Requested location accuracy |
| `distanceFilter` | `CLLocationDistance` | Minimum movement (meters) before update |
| `activityType` | `CLActivityType` | Expected user activity (affects power usage) |
| `allowsBackgroundLocationUpdates` | `Bool` | Receive updates when app is in background |
| `pausesLocationUpdatesAutomatically` | `Bool` | Let system pause updates to save power |
| `showsBackgroundLocationIndicator` | `Bool` | Status bar indicator during background use |
| `location` | `CLLocation?` | Most recently retrieved location |
| `requestWhenInUseAuthorization()` | method | Authorization request (when in use) |
| `requestAlwaysAuthorization()` | method | Authorization request (always) |
| `requestTemporaryFullAccuracyAuthorization(withPurposeKey:completion:)` | method | Temporary full-accuracy request |
| `startUpdatingLocation()` / `stopUpdatingLocation()` | method | Standard location updates |
| `requestLocation()` | method | One-time location delivery |
| `startMonitoringSignificantLocationChanges()` / `stopMonitoringSignificantLocationChanges()` | method | Significant-change service |
| `class func locationServicesEnabled() -> Bool` | class method | Availability check |
| `class func significantLocationChangeMonitoringAvailable() -> Bool` | class method | Availability check |

## Notes

- iOS 2.0+, iPadOS 2.0+, macOS 10.6+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+
- Assign `delegate` immediately after creation; the system calls `locationManagerDidChangeAuthorization(_:)` right after initialization.
- `CLLocationManager` must be created on a thread with an active `RunLoop` (typically the main thread).
- Prefer the async `CLLocationUpdate.liveUpdates(_:)` API (iOS 17+) over the delegate pattern for new code.
- `accuracyAuthorization` is iOS 14.0+ / macOS 11.0+ / watchOS 7.0+ / tvOS 14.0+; `requestTemporaryFullAccuracyAuthorization(withPurposeKey:)` also has an async form: `func requestTemporaryFullAccuracyAuthorization(withPurposeKey purposeKey: String) async throws`.

## Related

- [CLServiceSession](./CLServiceSession.md)
- [CLAccuracyAuthorization](./CLAccuracyAuthorization.md)
- [CLLocationManagerDelegate](./CLLocationManagerDelegate.md)
- [CLLocationUpdate](./CLLocationUpdate.md)
- [CLAuthorizationStatus](./CLAuthorizationStatus.md)
- [CLLocation](./CLLocation.md)
