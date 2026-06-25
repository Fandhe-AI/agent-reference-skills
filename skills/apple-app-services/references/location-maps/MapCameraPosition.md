# MapCameraPosition

Describes how to position the map's camera. Pass as an `initialPosition` or a `Binding<MapCameraPosition>` to a `Map` view. When the user pans/zooms, the value transitions to `.positionedByUser`.

## Signature / Usage

```swift
@State private var position: MapCameraPosition = .region(
    MKCoordinateRegion(
        center: CLLocationCoordinate2D(latitude: 37.7749, longitude: -122.4194),
        span: MKCoordinateSpan(latitudeDelta: 0.05, longitudeDelta: 0.05)
    )
)

var body: some View {
    Map(position: $position)
}
```

## Static Constructors

| Constructor | Description |
|-------------|-------------|
| `automatic` | Frames all visible map content automatically |
| `.camera(_ camera: MapCamera)` | Explicit camera with center, distance, heading, pitch |
| `.item(_ item: MKMapItem, allowsAutomaticPitch:)` | Centers on an `MKMapItem` |
| `.rect(_ rect: MKMapRect)` | Frames a specific `MKMapRect` |
| `.region(_ region: MKCoordinateRegion)` | Centers on an `MKCoordinateRegion` |
| `.userLocation(followsHeading:fallback:)` | Tracks the user's location; `fallback` used when unavailable |

## Key Properties

| Name | Type | Description |
|------|------|-------------|
| `camera` | `MapCamera?` | Explicit camera, if set |
| `region` | `MKCoordinateRegion?` | Target region, if set |
| `item` | `MKMapItem?` | Target item, if set |
| `rect` | `MKMapRect?` | Target rect, if set |
| `positionedByUser` | `Bool` | `true` after user interaction moves the map |
| `followsUserLocation` | `Bool` | Whether camera follows user location |
| `followsUserHeading` | `Bool` | Whether camera follows user heading |
| `fallbackPosition` | `MapCameraPosition?` | Used when user location is unavailable |

## Notes

- iOS 17.0+, iPadOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- Conforms to `Equatable`.
- To programmatically recenter the map after user interaction, write a new value to the binding; set `positionedByUser` to `false` to re-enable automatic positioning.

## Related

- [Map](./Map.md)
- [MKCoordinateRegion](./MKCoordinateRegion.md)
- [MKMapItem](./MKMapItem.md)
