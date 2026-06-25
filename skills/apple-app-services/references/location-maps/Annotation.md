# Annotation

A customizable annotation that places an arbitrary SwiftUI view at a coordinate on a `Map`. Use when `Marker`'s balloon style is insufficient.

## Signature / Usage

```swift
Map {
    Annotation("Playground", coordinate: playgroundCoord, anchor: .bottom) {
        ZStack {
            RoundedRectangle(cornerRadius: 6)
                .fill(.yellow)
            Image(systemName: "figure.play")
                .padding(6)
        }
    }
}
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `title` | `LocalizedStringKey` / `String` / `LocalizedStringResource` | Accessibility label for the annotation |
| `coordinate` | `CLLocationCoordinate2D` | Map position of the annotation |
| `anchor` | `UnitPoint` | Which point of the content view pins to the coordinate (default `.bottom`) |
| `accessoryAnchor` | `UnitPoint` | Anchor for an optional accessory view |
| `content` | `() -> Content` | The SwiftUI view displayed at the coordinate |
| `label` | `() -> Label` | Alternative label view (when using coordinate + anchor + content + label form) |
| `item` | `MKMapItem` | Creates annotation from a map item |

## Notes

- iOS 17.0+, iPadOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- Conforms to `MapContent`, `Sendable`.
- For simple pins, prefer `Marker` (lower complexity and better performance at scale).

## Related

- [Marker](./Marker.md)
- [Map](./Map.md)
- [CLLocationCoordinate2D](./CLLocationCoordinate2D.md)
