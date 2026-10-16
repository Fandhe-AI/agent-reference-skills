# MLBoundingBoxAnchor

A location within a bounding box that an annotation's coordinates use as their reference point.

## Signature / Usage

```swift
enum MLBoundingBoxAnchor {
    case center
    case topLeft
    case bottomLeft
}
```

## Options / Props

| Case | Description |
|------|-------------|
| `center` | An anchor at the bounding box's center point |
| `topLeft` | An anchor at the bounding box's top-left corner |
| `bottomLeft` | An anchor at the bounding box's bottom-left corner |

## Notes

- Availability: macOS 10.15+ only
- Conforms to `Equatable`, `Hashable`, `Sendable`, `SendableMetatype`
- Used as the `anchor` argument of `MLObjectDetector.AnnotationType.boundingBox(units:origin:anchor:)`

## Related

- [MLBoundingBoxUnits](./mlboundingboxunits.md)
- [MLBoundingBoxCoordinatesOrigin](./mlboundingboxcoordinatesorigin.md)
- [MLObjectDetector](./mlobjectdetector.md)
