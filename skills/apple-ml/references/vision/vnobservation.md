# VNObservation

Abstract base class for all Vision analysis results. Every concrete observation type inherits from this class.

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `uuid` | `UUID` | Unique identifier for this observation |
| `confidence` | `VNConfidence` | Confidence score for the result (`Float` in `[0, 1]`) |
| `timeRange` | `CMTimeRange` | Time range of the observation (used in video analysis) |

## Notes

- iOS 11.0+ / macOS 10.13+ / tvOS 11.0+ / visionOS 1.0+
- Cannot be instantiated directly; use a concrete subclass.
- Key subclasses: `VNDetectedObjectObservation` (adds `boundingBox`), `VNFaceObservation`, `VNRecognizedTextObservation`, `VNBarcodeObservation`, `VNHumanBodyPoseObservation`, `VNClassificationObservation`.
- Conforms to `NSCoding`, `NSCopying`, `NSSecureCoding`.

## Related

- [VNRecognizedTextObservation](./vnrecognizedtextobservation.md)
- [VNDetectFaceRectanglesRequest](./vndetectfacerectanglesrequest.md)
- [VNRequest](./vnrequest.md)
