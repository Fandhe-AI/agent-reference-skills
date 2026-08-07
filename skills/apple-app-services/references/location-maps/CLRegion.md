# CLRegion

An abstract base class representing a geographic area that can be monitored for entry/exit events. Use a concrete subclass such as `CLCircularRegion` or `CLBeaconRegion`.

## Signature / Usage

```swift
class CLRegion : NSObject

let center = CLLocationCoordinate2D(latitude: 37.3318, longitude: -122.0312)
let region = CLCircularRegion(center: center, radius: 100, identifier: "home")
region.notifyOnEntry = true
region.notifyOnExit = true
manager.startMonitoring(for: region)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `identifier` | `String` | Unique identifier for the region object |
| `notifyOnEntry` | `Bool` | Whether entry into the region generates a notification |
| `notifyOnExit` | `Bool` | Whether exit from the region generates a notification |

## Notes

- iOS 4.0+, iPadOS 4.0+, macOS 10.7+, tvOS 9.0+, watchOS 2.0+, Mac Catalyst 13.1+
- Concrete subclasses: `CLCircularRegion`, `CLBeaconRegion`.
- `center`, `radius`, `contains(_:)`, and `init(circularRegionWithCenter:radius:identifier:)` are deprecated on `CLRegion` itself; use `CLCircularRegion` instead.
- Register regions with `CLLocationManager.startMonitoring(for:)`; for new code prefer `CLMonitor` with `CLMonitor.CircularGeographicCondition`.
- Conforms to `NSCoding`, `NSCopying`, `NSSecureCoding`, `Equatable`, `Hashable`, `CustomStringConvertible`, `CustomDebugStringConvertible`.

## Related

- [CLMonitor](./CLMonitor.md)
- [CLLocationManager](./CLLocationManager.md)
- [CLLocationCoordinate2D](./CLLocationCoordinate2D.md)
