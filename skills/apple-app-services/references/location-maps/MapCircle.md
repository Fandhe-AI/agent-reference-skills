# MapCircle

A circular overlay centered on a geographic coordinate with a given radius in meters. Use inside a `Map` content closure for geofence visualization or proximity rings.

## Signature / Usage

```swift
Map {
    MapCircle(center: CLLocationCoordinate2D(latitude: 37.7749, longitude: -122.4194),
              radius: 500)   // 500 metres
        .foregroundStyle(.blue.opacity(0.2))
        .stroke(.blue, lineWidth: 2)
}
```

## Options / Props

| Initializer | Description |
|-------------|-------------|
| `init(center:radius:)` | Center coordinate + radius in `CLLocationDistance` (meters) |
| `init(mapRect:)` | Largest circle fitting within an `MKMapRect` |
| `init(_ circle: MKCircle)` | Creates from an existing `MKCircle` |

## Styling

Apply SwiftUI shape-style modifiers:
- `.foregroundStyle(_:)` — fill color/style
- `.stroke(_:lineWidth:)` — border color and width
- `.stroke(_:style:)` — `StrokeStyle` for dashes etc.

## Notes

- iOS 17.0+, iPadOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- Conforms to `MapContent`, `Copyable`, `Escapable`.
- `radius` is in meters regardless of zoom level.

## Related

- [MapPolyline](./MapPolyline.md)
- [Map](./Map.md)
- [CLLocationCoordinate2D](./CLLocationCoordinate2D.md)
