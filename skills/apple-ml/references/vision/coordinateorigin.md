# CoordinateOrigin

The origin of a coordinate system relative to an image. Used by the `toImageCoordinates` conversions on `NormalizedPoint` and `NormalizedRect`.

## Signature / Usage

```swift
enum CoordinateOrigin {
    case upperLeft
    case lowerLeft
}
```

## Options / Props

| Case | Description |
|------|-------------|
| `upperLeft` | The origin at the upper-left corner of the image |
| `lowerLeft` | The origin at the lower-left corner of the image |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+
- `enum` conforming to `Equatable` and `Hashable`.
- Vision's normalized coordinates default to a lower-left origin, while UIKit and SwiftUI use an upper-left origin.
- Source: https://developer.apple.com/documentation/vision/coordinateorigin

## Related

- [NormalizedPoint](./normalizedpoint.md)
- [NormalizedRect](./normalizedrect.md)
