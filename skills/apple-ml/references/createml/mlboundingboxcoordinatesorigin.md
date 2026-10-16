# MLBoundingBoxCoordinatesOrigin

The location within an image that an annotation's coordinates use as their origin.

## Signature / Usage

```swift
enum MLBoundingBoxCoordinatesOrigin {
    case topLeft
    case bottomLeft
}
```

## Options / Props

| Case | Description |
|------|-------------|
| `topLeft` | An origin at the image's top-left corner |
| `bottomLeft` | An origin at the image's bottom-left corner |

## Notes

- Availability: macOS 10.15+ only
- Conforms to `Equatable`, `Hashable`, `Sendable`, `SendableMetatype`
- Used as the `origin` argument of `MLObjectDetector.AnnotationType.boundingBox(units:origin:anchor:)`

## Related

- [MLBoundingBoxUnits](./mlboundingboxunits.md)
- [MLBoundingBoxAnchor](./mlboundingboxanchor.md)
- [MLObjectDetector](./mlobjectdetector.md)
