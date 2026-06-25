# MapStyle

A struct that defines the visual presentation of a `Map` view. Apply with the `.mapStyle(_:)` view modifier.

## Signature / Usage

```swift
Map {
    Marker("HQ", coordinate: hqCoord)
}
.mapStyle(.hybrid(elevation: .realistic, showsTraffic: true))
```

## Static Members

| Style | Description |
|-------|-------------|
| `.standard` | Default street map with road names |
| `.standard(elevation:emphasis:pointsOfInterest:showsTraffic:)` | Configurable street map |
| `.imagery` | Satellite imagery only |
| `.imagery(elevation:)` | Satellite with elevation control |
| `.hybrid` | Satellite imagery with road names overlay |
| `.hybrid(elevation:pointsOfInterest:showsTraffic:)` | Configurable hybrid |

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `elevation` | `MapStyle.Elevation` | `.flat` or `.realistic` (3-D terrain) |
| `emphasis` | `MapStyle.StandardEmphasis` | Controls how map features are highlighted |
| `pointsOfInterest` | `PointOfInterestCategories` | Which POI categories to show (`.all`, `.excludingAll`, `.including([...])`) |
| `showsTraffic` | `Bool` | Overlay live traffic conditions |

## Notes

- iOS 17.0+, iPadOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- Apply with `.mapStyle(_:)` on the `Map` view, not inside the content closure.
- `MapStyle.Elevation.realistic` enables 3-D terrain rendering on supported devices.

## Related

- [Map](./Map.md)
