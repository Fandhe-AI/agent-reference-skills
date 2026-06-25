# CLGeocoder

Converts between geographic coordinates and place names (forward and reverse geocoding). Deprecated in iOS 26 / macOS 27; use MapKit for new code.

## Signature / Usage

```swift
let geocoder = CLGeocoder()

// Reverse geocode: coordinates → address
geocoder.reverseGeocodeLocation(location) { placemarks, error in
    if let p = placemarks?.first {
        print(p.locality ?? "")      // e.g. "Cupertino"
        print(p.country ?? "")       // e.g. "United States"
    }
}

// Forward geocode: address string → coordinates
geocoder.geocodeAddressString("1 Apple Park Way, Cupertino") { placemarks, error in
    if let coord = placemarks?.first?.location?.coordinate {
        print(coord)
    }
}
```

## Key Methods

| Method | Description |
|--------|-------------|
| `reverseGeocodeLocation(_:completionHandler:)` | Coordinate → `[CLPlacemark]` |
| `reverseGeocodeLocation(_:preferredLocale:completionHandler:)` | With locale override |
| `geocodeAddressString(_:completionHandler:)` | Address string → `[CLPlacemark]` |
| `geocodeAddressString(_:in:preferredLocale:completionHandler:)` | With region hint and locale |
| `geocodePostalAddress(_:completionHandler:)` | `CNPostalAddress` → `[CLPlacemark]` |
| `cancelGeocode()` | Cancel any in-flight request |
| `isGeocoding` | `Bool` — whether a request is active |

## Notes

- iOS 5.0+, iPadOS 5.0+, macOS 10.8+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+ — **deprecated iOS 26+ / macOS 27+**
- Rate-limited: issue at most one request per user action; do not batch requests.
- Requires network access for detailed results.
- Only one geocode request may be active at a time; cancel the current one before starting another.

## Related

- [CLPlacemark](./CLPlacemark.md)
- [CLLocation](./CLLocation.md)
- [MKMapItem](./MKMapItem.md)
