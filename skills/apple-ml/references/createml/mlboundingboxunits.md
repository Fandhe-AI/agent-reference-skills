# MLBoundingBoxUnits

The units a bounding box annotation uses to define its position and size.

## Signature / Usage

```swift
enum MLBoundingBoxUnits {
    case pixel
    case normalized
}

// Used in an object detector annotation type
case boundingBox(units: MLBoundingBoxUnits, origin: MLBoundingBoxCoordinatesOrigin, anchor: MLBoundingBoxAnchor)
```

## Options / Props

| Case | Description |
|------|-------------|
| `pixel` | A unit of measurement in pixels for an image |
| `normalized` | A unit of measurement as a portion of an image's overall width or height |

## Notes

- Availability: macOS 10.15+ only
- Conforms to `Equatable`, `Hashable`, `Sendable`, `SendableMetatype`
- All bounding box annotations in an annotation file must use the same units for their coordinates and size (see `MLObjectDetector.AnnotationType.boundingBox(units:origin:anchor:)`)
- Source: https://developer.apple.com/documentation/createml/mlboundingboxunits

## Related

- [MLBoundingBoxAnchor](./mlboundingboxanchor.md)
- [MLBoundingBoxCoordinatesOrigin](./mlboundingboxcoordinatesorigin.md)
- [MLObjectDetector](./mlobjectdetector.md)
