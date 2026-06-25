# Map

A SwiftUI view that displays an embedded map interface. Place `Marker`, `Annotation`, `MapPolyline`, `MapCircle`, and other `MapContent` in its content closure.

## Signature / Usage

```swift
@State private var position: MapCameraPosition = .automatic

var body: some View {
    Map(position: $position) {
        Marker("City Hall", coordinate: cityHallCoord)
        Annotation("Park", coordinate: parkCoord) {
            Image(systemName: "tree.fill")
                .foregroundStyle(.green)
        }
    }
    .mapStyle(.standard)
}
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `initialPosition` | `MapCameraPosition` | Starting camera position (uncontrolled) |
| `position` | `Binding<MapCameraPosition>` | Two-way binding to camera position |
| `bounds` | `MapCameraBounds?` | Restricts panning/zooming to a region |
| `interactionModes` | `MapInteractionModes` | Allowed gestures (`.all`, `.pan`, `.zoom`, `.rotate`, `.pitch`) |
| `selection` | `Binding<MapFeature?>` | Tracks tapped map features (POIs, etc.) |
| `scope` | `Namespace.ID?` | Namespace for matched geometry transitions |
| `content` | `() -> Content` | `MapContentBuilder` closure containing overlays and annotations |

## Notes

- iOS 14.0+ / macOS 11.0+ (SwiftUI `Map`); modern annotations (`Marker`, `Annotation`) require iOS 17.0+ / macOS 14.0+.
- Declared `@MainActor @preconcurrency struct Map<Content> where Content: View`.
- Use `.mapStyle(_:)` to apply `MapStyle.standard`, `.imagery`, or `.hybrid`.
- Use `.mapControls { … }` to add `MapCompass`, `MapZoomStepper`, `MapUserLocationButton`, etc.

## Related

- [MapCameraPosition](./MapCameraPosition.md)
- [Marker](./Marker.md)
- [Annotation](./Annotation.md)
- [MapPolyline](./MapPolyline.md)
- [MapCircle](./MapCircle.md)
- [MapStyle](./MapStyle.md)
