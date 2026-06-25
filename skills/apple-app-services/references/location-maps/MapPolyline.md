# MapPolyline

An open polygon overlay consisting of connected line segments. Use inside a `Map` content closure to draw routes or paths.

## Signature / Usage

```swift
let coords: [CLLocationCoordinate2D] = [
    CLLocationCoordinate2D(latitude: 37.77, longitude: -122.42),
    CLLocationCoordinate2D(latitude: 37.78, longitude: -122.41),
    CLLocationCoordinate2D(latitude: 37.79, longitude: -122.40),
]

Map {
    MapPolyline(coordinates: coords)
        .stroke(.blue, lineWidth: 3)
}
```

## Options / Props

| Initializer | Description |
|-------------|-------------|
| `init(coordinates:[CLLocationCoordinate2D], contourStyle:)` | Creates from a coordinate array; `contourStyle` controls geodesic rendering |
| `init(_ polyline: MKPolyline)` | Creates from an existing `MKPolyline` |
| `init(_ route: MKRoute)` | Creates from an `MKRoute` (e.g., from `MKDirections`) |
| `init(points:[MKMapPoint], contourStyle:)` | Creates from `MKMapPoint` array |

## Styling

Apply standard SwiftUI stroke modifiers after the initializer:
- `.stroke(_ content:lineWidth:)` — color and width
- `.stroke(_ content:style:)` — `StrokeStyle` (dash patterns, line cap)

## Notes

- iOS 17.0+, iPadOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- Conforms to `MapContent`, `Copyable`, `Escapable`.
- `MapPolyline.ContourStyle` determines whether the line follows Earth's curvature (geodesic) or is drawn as straight screen segments.

## Related

- [MapCircle](./MapCircle.md)
- [Map](./Map.md)
- [CLLocationCoordinate2D](./CLLocationCoordinate2D.md)
