# MKGeocodingRequest

A class that looks up a geographic coordinate using the provided address string. Returns `MKMapItem` results.

## Signature / Usage

```swift
if let request = MKGeocodingRequest(addressString: "Archibald Fountain, 110 Elizabeth St, Sydney NSW 2000, Australia") {
    do {
        let mapItems = try await request.mapItems
        if let mapItem = mapItems.first {
            // use mapItem
        }
    } catch {
        print("error: \(error)")
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init?(addressString:)` | `String` | Creates a request with the provided address string |
| `addressString` | `String` | The string used to initialize the geocoder |
| `region` | `MKCoordinateRegion` | Bounds for the request; defaults to a region covering the whole world |
| `preferredLocale` | `Locale?` | Default locale the geocoder uses when processing requests |
| `isLoading` | `Bool` | Whether the request is in a loading state |
| `isCancelled` | `Bool` | Whether the request is in a cancelled state |
| `mapItems` | `[MKMapItem]` (`get async throws`) | Map items relevant to the geocoded location |
| `getMapItems(completionHandler:)` | `@escaping @MainActor @Sendable ([MKMapItem]?, (any Error)?) -> Void` | Completion-handler form of `mapItems` |
| `cancel()` | method | Cancels a request in progress |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+, watchOS 26.0+.
- Replacement for the deprecated `CLGeocoder` forward geocoding (`CLGeocoder` is deprecated in 26.0 with "Use MapKit").
- The official example contains a typo (`addressMppItems`); the snippet above is condensed from it.
- Inherits from `NSObject`.
- Source: https://developer.apple.com/documentation/mapkit/mkgeocodingrequest

## Related

- [MKReverseGeocodingRequest](./MKReverseGeocodingRequest.md)
- [MKMapItem](./MKMapItem.md)
- [MKCoordinateRegion](./MKCoordinateRegion.md)
- [CLGeocoder](./CLGeocoder.md)
