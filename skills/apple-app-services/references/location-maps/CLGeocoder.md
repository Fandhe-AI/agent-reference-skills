# CLGeocoder

Converts between geographic coordinates and place names (forward and reverse geocoding). Deprecated in iOS 26 / macOS 26 (all platforms 26.0); use MapKit for new code.

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

## Options / Props

| Name | Description |
|------|-------------|
| `reverseGeocodeLocation(_:completionHandler:)` | Coordinate → `[CLPlacemark]` |
| `reverseGeocodeLocation(_:preferredLocale:completionHandler:)` | With locale override |
| `geocodeAddressString(_:completionHandler:)` | Address string → `[CLPlacemark]` |
| `geocodeAddressString(_:in:preferredLocale:completionHandler:)` | With region hint and locale |
| `geocodeAddressString(_:in:completionHandler:)` | With region hint (`CLRegion?`) |
| `geocodeAddressString(_:inRegionCenteredAt:inRegionRadius:preferredLocale:completionHandler:)` | Region given as center coordinate + radius (visionOS 1.0+) |
| `geocodePostalAddress(_:completionHandler:)` | `CNPostalAddress` → `[CLPlacemark]` |
| `geocodePostalAddress(_:preferredLocale:completionHandler:)` | `CNPostalAddress` with locale override |
| `geocodeAddressDictionary(_:completionHandler:)` | Address dictionary (`[AnyHashable: Any]`) → `[CLPlacemark]` |
| `cancelGeocode()` | Cancel any in-flight request |
| `isGeocoding` | `Bool` — whether a request is active |

## Notes

- iOS 5.0+, iPadOS 5.0+, Mac Catalyst 13.1+, macOS 10.8+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+ — **deprecated in 26.0 on all platforms** (deprecation summary: "Use MapKit")
- Replacement: MapKit `MKGeocodingRequest` (forward) / `MKReverseGeocodingRequest` (reverse), iOS 26.0+. The visionOS-only `geocodeAddressString(_:inRegionCenteredAt:inRegionRadius:preferredLocale:completionHandler:)` is deprecated with "Use MKGeocodingRequest".
- Rate-limited: issue at most one request per user action; do not batch requests.
- Requires network access for detailed results.
- Only one geocode request may be active at a time; cancel the current one before starting another.

## Related

- [CLPlacemark](./CLPlacemark.md)
- [CLLocation](./CLLocation.md)
- [MKMapItem](./MKMapItem.md)
- [MKGeocodingRequest](./MKGeocodingRequest.md)
- [MKReverseGeocodingRequest](./MKReverseGeocodingRequest.md)
