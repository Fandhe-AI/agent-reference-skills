# CLAuthorizationStatus

An enum indicating the app's authorization to use location services. Check this value to determine what location capabilities are available and prompt the user appropriately.

## Signature / Usage

```swift
let manager = CLLocationManager()
// Check current status
switch manager.authorizationStatus {
case .notDetermined:
    manager.requestWhenInUseAuthorization()
case .authorizedWhenInUse, .authorizedAlways:
    manager.startUpdatingLocation()
case .denied, .restricted:
    // Show settings prompt
default:
    break
}
```

## Options / Props

| Case | Description |
|------|-------------|
| `notDetermined` | User has not yet made a choice |
| `restricted` | App is not authorized (e.g., parental controls); cannot prompt user |
| `denied` | User explicitly denied permission or location services are disabled globally |
| `authorizedAlways` | App may start location services at any time, including background |
| `authorizedWhenInUse` | App may use location only while it is in the foreground |
| `authorized` | Deprecated alias for `authorizedAlways` (macOS only) |

## Notes

- iOS 2.0+, iPadOS 2.0+, macOS 10.6+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+
- Observe changes via `CLLocationManagerDelegate.locationManagerDidChangeAuthorization(_:)` or by monitoring `CLLocationUpdate` status properties.
- Conforms to `Equatable`, `Hashable`, `RawRepresentable`, `Sendable`.

## Related

- [CLLocationManager](./CLLocationManager.md)
- [CLLocationManagerDelegate](./CLLocationManagerDelegate.md)
- [CLLocationUpdate](./CLLocationUpdate.md)
