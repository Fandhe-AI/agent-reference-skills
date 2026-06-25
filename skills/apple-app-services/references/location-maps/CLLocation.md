# CLLocation

Represents the latitude, longitude, altitude, speed, and course information reported by the system. Typically obtained from `CLLocationManager` or `CLLocationUpdate`; rarely constructed manually.

## Signature / Usage

```swift
// Most common: received from delegate or async update
func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
    guard let loc = locations.last else { return }
    let coord = loc.coordinate   // CLLocationCoordinate2D
    let acc   = loc.horizontalAccuracy  // meters
}

// Manual construction (e.g., for testing)
let loc = CLLocation(latitude: 37.7749, longitude: -122.4194)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `coordinate` | `CLLocationCoordinate2D` | Geographic coordinate (WGS 84) |
| `altitude` | `CLLocationDistance` | Altitude above mean sea level (meters) |
| `ellipsoidalAltitude` | `CLLocationDistance` | Height above WGS 84 ellipsoid (meters) |
| `horizontalAccuracy` | `CLLocationAccuracy` | Radius of uncertainty (meters); negative = invalid |
| `verticalAccuracy` | `CLLocationAccuracy` | Accuracy of altitude (meters); negative = invalid |
| `timestamp` | `Date` | Time the location was determined |
| `speed` | `CLLocationSpeed` | Instantaneous speed in m/s; negative = invalid |
| `speedAccuracy` | `CLLocationSpeedAccuracy` | Accuracy of speed (m/s) |
| `course` | `CLLocationDirection` | Direction of travel (0–360°, relative to true north) |
| `courseAccuracy` | `CLLocationDirectionAccuracy` | Accuracy of course (degrees) |
| `floor` | `CLFloor?` | Logical building floor, if available |
| `sourceInformation` | `CLLocationSourceInformation?` | Source details (GPS, network, etc.) |

## Key Methods

```swift
// Distance in meters between two locations
let dist = loc1.distance(from: loc2)
```

## Notes

- iOS 2.0+, iPadOS 2.0+, macOS 10.6+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+
- Do not subclass `CLLocation`.
- Always check `horizontalAccuracy >= 0` before trusting the coordinate.
- Conforms to `Sendable`; safe to pass across concurrency boundaries.

## Related

- [CLLocationCoordinate2D](./CLLocationCoordinate2D.md)
- [CLLocationManager](./CLLocationManager.md)
- [CLLocationUpdate](./CLLocationUpdate.md)
