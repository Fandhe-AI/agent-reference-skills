# MKMapItem

Represents a point of interest on the map, bundling location data with associated metadata (name, URL, phone number, category). Used with `Marker(item:)`, `MapCameraPosition.item(_:)`, and to open locations in the Maps app.

## Signature / Usage

```swift
// Create from CLLocation
let location = CLLocation(latitude: 37.7749, longitude: -122.4194)
let item = MKMapItem(location: location, address: nil)
item.name = "San Francisco"

// Open in Maps
item.openInMaps(launchOptions: nil)

// Use in SwiftUI Map
Map {
    Marker(item: item)
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `name` | `String?` | Descriptive name of the location |
| `url` | `URL?` | Associated URL (website, deep link) |
| `phoneNumber` | `String?` | Business phone number |
| `isCurrentLocation` | `Bool` | Whether this item represents the user's location |
| `identifier` | `MKMapItem.Identifier?` | Unique place identifier |
| `timeZone` | `TimeZone?` | Time zone of the location |
| `pointOfInterestCategory` | `MKPointOfInterestCategory?` | POI category |
| `placemark` | `MKPlacemark` | Address/placemark data (deprecated initializer path) |

## Key Methods

```swift
// Current location sentinel
class func forCurrentLocation() -> MKMapItem

// Open multiple items in Maps
class func openMaps(with items: [MKMapItem], launchOptions: [String: Any]?) -> Bool

// Open this item in Maps
func openInMaps(launchOptions: [String: Any]?) -> Bool
```

## Initializers

```swift
init(location: CLLocation, address: MKAddress?)  // preferred
init(placemark: MKPlacemark)                     // legacy
```

## Notes

- iOS 6.0+, iPadOS 6.0+, macOS 10.9+, tvOS 9.2+, watchOS 2.0+, visionOS 1.0+
- Conforms to `NSCoding`, `NSSecureCoding`, `Equatable`, `Hashable`.
- Pass `MKMapItem.forCurrentLocation()` to `Marker(item:)` to show the user's live position.

## Related

- [Marker](./Marker.md)
- [MapCameraPosition](./MapCameraPosition.md)
- [CLPlacemark](./CLPlacemark.md)
