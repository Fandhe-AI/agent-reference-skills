# MKCoordinateRegion

A rectangular geographic region defined by a center coordinate and a span (delta in degrees). Used with `MapCameraPosition.region(_:)` and historically with `MKMapView.region`.

## Signature / Usage

```swift
// By span (degrees)
let region = MKCoordinateRegion(
    center: CLLocationCoordinate2D(latitude: 37.7749, longitude: -122.4194),
    span: MKCoordinateSpan(latitudeDelta: 0.05, longitudeDelta: 0.05)
)

// By metric distance
let region = MKCoordinateRegion(
    center: CLLocationCoordinate2D(latitude: 37.7749, longitude: -122.4194),
    latitudinalMeters: 2000,
    longitudinalMeters: 2000
)

Map(position: .constant(.region(region)))
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `center` | `CLLocationCoordinate2D` | Center point of the region |
| `span` | `MKCoordinateSpan` | Degrees of latitude/longitude covered |
| `span.latitudeDelta` | `CLLocationDegrees` | North-south extent in degrees |
| `span.longitudeDelta` | `CLLocationDegrees` | East-west extent in degrees |

## Initializers

```swift
init()                                               // default
init(center:span:)                                   // degrees-based
init(center:latitudinalMeters:longitudinalMeters:)   // meters-based
init(_ mapRect: MKMapRect)                           // from MKMapRect
```

## Notes

- Available on iOS, iPadOS, macOS, tvOS, watchOS, visionOS (no minimum version restriction; part of MapKit since its introduction).
- Conforms to `BitwiseCopyable`, `Sendable`.
- A smaller `span` = more zoomed in. Typically use 0.01–0.1° for city-level zoom.

## Related

- [MapCameraPosition](./MapCameraPosition.md)
- [CLLocationCoordinate2D](./CLLocationCoordinate2D.md)
- [Map](./Map.md)
