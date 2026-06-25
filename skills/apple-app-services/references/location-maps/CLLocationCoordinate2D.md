# CLLocationCoordinate2D

A struct representing a geographic coordinate (latitude and longitude) in the WGS 84 reference frame. The fundamental value type used throughout Core Location and MapKit.

## Signature / Usage

```swift
let coord = CLLocationCoordinate2D(latitude: 37.7749, longitude: -122.4194)

// Validate before use
guard CLLocationCoordinate2DIsValid(coord) else { return }
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `latitude` | `CLLocationDegrees` | Latitude in degrees (–90 to +90) |
| `longitude` | `CLLocationDegrees` | Longitude in degrees (–180 to +180) |

## Key Functions

```swift
// Preferred initializer
CLLocationCoordinate2D(latitude:longitude:)

// C-style helper (equivalent)
CLLocationCoordinate2DMake(_ lat: CLLocationDegrees, _ lon: CLLocationDegrees)

// Validate a coordinate
CLLocationCoordinate2DIsValid(_ coord: CLLocationCoordinate2D) -> Bool

// Invalid sentinel constant
kCLLocationCoordinate2DInvalid
```

## Notes

- iOS 2.0+, iPadOS 2.0+, macOS 10.6+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+
- Conforms to `Sendable` and `BitwiseCopyable`; safe to pass across concurrency boundaries.
- Used as the `center` of `MKCoordinateRegion`, `MapCameraPosition.region(_:)`, `Marker`, `Annotation`, `MapCircle`, and `MapPolyline`.

## Related

- [CLLocation](./CLLocation.md)
- [MKCoordinateRegion](./MKCoordinateRegion.md)
- [MapCameraPosition](./MapCameraPosition.md)
