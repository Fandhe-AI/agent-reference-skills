# CLPlacemark

A user-friendly description of a geographic coordinate: name, street address, city, country, time zone, and points of interest. Typically returned by `CLGeocoder`. Deprecated in 27.2 (iOS / iPadOS / macOS / visionOS / watchOS) and 27.0 (Mac Catalyst / tvOS); prefer `GeoToolbox.PlaceDescriptor` or MapKit for new code.

## Signature / Usage

```swift
let geocoder = CLGeocoder()
geocoder.reverseGeocodeLocation(location) { placemarks, error in
    guard let p = placemarks?.first else { return }
    print(p.name ?? "")               // "Apple Park"
    print(p.thoroughfare ?? "")        // "1 Apple Park Way"
    print(p.locality ?? "")           // "Cupertino"
    print(p.administrativeArea ?? "") // "CA"
    print(p.country ?? "")            // "United States"
    print(p.isoCountryCode ?? "")     // "US"
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `name` | `String?` | Place name (e.g., landmark or business name) |
| `location` | `CLLocation?` | Associated location object |
| `thoroughfare` | `String?` | Street address |
| `subThoroughfare` | `String?` | Street number or suite |
| `locality` | `String?` | City name |
| `subLocality` | `String?` | Neighborhood or district |
| `administrativeArea` | `String?` | State or province |
| `subAdministrativeArea` | `String?` | County or additional area |
| `postalCode` | `String?` | ZIP or postal code |
| `country` | `String?` | Country or region name |
| `isoCountryCode` | `String?` | ISO 3166-1 alpha-2 country code |
| `postalAddress` | `CNPostalAddress?` | Formatted for Contacts framework |
| `areasOfInterest` | `[String]?` | Nearby points of interest |
| `timeZone` | `TimeZone?` | Time zone of the location |
| `inlandWater` | `String?` | Nearby lake or river name |
| `ocean` | `String?` | Nearby ocean name |
| `region` | `CLRegion?` | Region associated with the placemark |
| `addressDictionary` | `[AnyHashable: Any]?` | Address dictionary (listed under "Getting the associated contact details") |

Initializers:

| Initializer | Availability |
|-------------|--------------|
| `init(placemark:)` | — |
| `convenience init(location: CLLocation, name: String?, postalAddress: CNPostalAddress?)` | iOS 10.0+, iPadOS 10.0+, Mac Catalyst 13.1+, macOS 11.0+, watchOS 3.2+, visionOS 1.0+ (not tvOS) |

## Notes

- iOS 5.0+, iPadOS 5.0+, Mac Catalyst 13.1+, macOS 10.8+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+ — **deprecated**: 27.2 on iOS / iPadOS / macOS / visionOS / watchOS, 27.0 on Mac Catalyst / tvOS (deprecation summary: "Use either GeoToolbox.PlaceDescriptor or MapKit")
- Conforms to `NSCoding`, `NSCopying`, `NSSecureCoding`, `Hashable`, `Sendable`.
- Properties may be `nil` if the geocoder could not resolve that field.

## Related

- [CLGeocoder](./CLGeocoder.md)
- [MKMapItem](./MKMapItem.md)
