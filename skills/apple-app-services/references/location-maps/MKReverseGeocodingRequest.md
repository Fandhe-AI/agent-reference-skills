# MKReverseGeocodingRequest

A class that looks up address strings for the provided geographic coordinates. Returns `MKMapItem` results.

## Signature / Usage

```swift
let location = CLLocation(latitude: -33.870986, longitude: 151.211786)
if let request = MKReverseGeocodingRequest(location: location) {
    let mapItems = try? await request.mapItems
    if let mapItem = mapItems?.first {
        // use mapItem
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init?(location:)` | `CLLocation` | Creates a request with the provided location |
| `location` | `CLLocation` | The location provided to the initializer |
| `preferredLocale` | `Locale?` | Preferred locale for returned addresses, or `nil` to use the device locale |
| `isLoading` | `Bool` | Whether the request is in a loading state |
| `isCancelled` | `Bool` | Whether the request is in a cancelled state |
| `mapItems` | `[MKMapItem]` (`get async throws`) | Map items relevant to the reverse geocoded location |
| `getMapItems(completionHandler:)` | `([MKMapItem]?, (any Error)?) -> Void` | Completion-handler form of `mapItems` |
| `cancel()` | method | Cancels a request in progress |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+, watchOS 26.0+.
- Replacement for the deprecated `CLGeocoder.reverseGeocodeLocation` (`CLGeocoder` is deprecated in 26.0 with "Use MapKit").
- Inherits from `NSObject`.
- Source: https://developer.apple.com/documentation/mapkit/mkreversegeocodingrequest

## Related

- [MKGeocodingRequest](./MKGeocodingRequest.md)
- [MKMapItem](./MKMapItem.md)
- [CLLocation](./CLLocation.md)
- [CLGeocoder](./CLGeocoder.md)
