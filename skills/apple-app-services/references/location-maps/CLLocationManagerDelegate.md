# CLLocationManagerDelegate

The protocol for receiving location and authorization events from a `CLLocationManager`. Implement in an app-specific class and assign it to `manager.delegate` before starting services.

## Signature / Usage

```swift
class LocationService: NSObject, CLLocationManagerDelegate {
    func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) {
        if manager.authorizationStatus == .authorizedWhenInUse {
            manager.startUpdatingLocation()
        }
    }

    func locationManager(_ manager: CLLocationManager,
                         didUpdateLocations locations: [CLLocation]) {
        guard let latest = locations.last else { return }
        print(latest.coordinate)
    }

    func locationManager(_ manager: CLLocationManager,
                         didFailWithError error: any Error) {
        print("Location error: \(error)")
    }
}
```

## Key Methods

| Method | Description |
|--------|-------------|
| `locationManagerDidChangeAuthorization(_:)` | Called after manager is created and whenever authorization changes |
| `locationManager(_:didUpdateLocations:)` | Delivers an array of new `CLLocation` objects (most recent is last) |
| `locationManager(_:didFailWithError:)` | Called when a location value cannot be retrieved |
| `locationManager(_:didEnterRegion:)` | User entered a monitored `CLRegion` |
| `locationManager(_:didExitRegion:)` | User exited a monitored `CLRegion` |

## Notes

- iOS 2.0+, iPadOS 2.0+, macOS 10.6+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+
- The delegate is called on the `RunLoop` of the thread that created the `CLLocationManager`; use the main thread to avoid issues.
- Always implement `didFailWithError`; it is required for correct behavior.
- Assign the delegate before calling any `start*` methods; the system may deliver a cached authorization status immediately.
- For new code targeting iOS 17+, consider replacing delegate callbacks with `CLLocationUpdate.liveUpdates(_:)`.

## Related

- [CLLocationManager](./CLLocationManager.md)
- [CLLocation](./CLLocation.md)
- [CLAuthorizationStatus](./CLAuthorizationStatus.md)
