# VNRecognizedTextObservation

Represents a region of recognized text in an image. Provides ranked candidate strings via `topCandidates(_:)`.

## Signature / Usage

```swift
// After performing VNRecognizeTextRequest:
if let observations = request.results {
    for obs in observations {
        guard let candidate = obs.topCandidates(1).first else { continue }
        print(candidate.string)         // recognized text
        print(candidate.confidence)     // Float in [0, 1]
        // obs.boundingBox — normalized CGRect (origin at lower-left)
    }
}
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `topCandidates(_:)` | `(Int) -> [VNRecognizedText]` | Returns up to n ranked text candidates |
| `boundingBox` | `CGRect` | Normalized bounding box of the text region (inherited) |
| `VNRecognizedText.string` | `String` | The recognized text string |
| `VNRecognizedText.confidence` | `VNConfidence` | Confidence score for this candidate |

## Notes

- iOS 13.0+ / macOS 10.15+ / tvOS 13.0+ / visionOS 1.0+
- Inherits from `VNRectangleObservation` → `VNDetectedObjectObservation` → `VNObservation`.
- Coordinate system: normalized `[0, 1]` with origin at **lower-left** of the image.
- **New Swift API (iOS 18+):** `RecognizedTextObservation` replaces this class; `transcript` property provides direct access to the top candidate string.

## Related

- [VNRecognizeTextRequest](./vnrecognizetextrequest.md)
- [VNObservation](./vnobservation.md)
