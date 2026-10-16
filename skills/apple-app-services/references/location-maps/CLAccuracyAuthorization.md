# CLAccuracyAuthorization

Constants that indicate the level of location accuracy the app has authorization to use.

## Signature / Usage

```swift
enum CLAccuracyAuthorization

// Read from the location manager
var accuracyAuthorization: CLAccuracyAuthorization { get }  // CLLocationManager

// Request temporary full accuracy (key from NSLocationTemporaryUsageDescriptionDictionary)
func requestTemporaryFullAccuracyAuthorization(withPurposeKey purposeKey: String)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `fullAccuracy` | case | The user authorized the app to access location data with full accuracy |
| `reducedAccuracy` | case | The user authorized the app to access location data with reduced accuracy |

## Notes

- The enum's own metadata lists iOS 2.0 / macOS 10.6 / watchOS 2.0 / visionOS 1.0, but the property that returns it, `CLLocationManager.accuracyAuthorization`, is iOS 14.0+, iPadOS 14.0+, Mac Catalyst 14.0+, macOS 11.0+, tvOS 14.0+, watchOS 7.0+, visionOS 1.0+.
- With `fullAccuracy`, `desiredAccuracy` can be set to any value. With `reducedAccuracy`, setting `desiredAccuracy` to anything other than `kCLLocationAccuracyReduced` has no effect, and the app can't use region monitoring or beacon ranging.
- Before watchOS 7, if the user chooses reduced accuracy on the paired iPhone, watch apps receive no location data.
- `requestTemporaryFullAccuracyAuthorization(withPurposeKey:)` behaves like the `completion:` variant with a `nil` closure; changes are reported through `locationManagerDidChangeAuthorization(_:)`. The `purposeKey` must be a key in the `NSLocationTemporaryUsageDescriptionDictionary` of `Info.plist`.
- Related Info.plist key: `NSLocationDefaultAccuracyReduced` (Boolean; whether the app requests reduced accuracy by default).
- Conforms to `BitwiseCopyable`, `Equatable`, `Hashable`, `RawRepresentable`, `Sendable`, `SendableMetatype`.
- Source: https://developer.apple.com/documentation/corelocation/claccuracyauthorization

## Related

- [CLLocationManager](./CLLocationManager.md)
- [CLLocationManagerDelegate](./CLLocationManagerDelegate.md)
- [CLAuthorizationStatus](./CLAuthorizationStatus.md)
- [CLServiceSession](./CLServiceSession.md)
