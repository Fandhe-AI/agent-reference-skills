# CIDetector

An image analysis processor that identifies notable features — faces, rectangles, text, and QR codes — in still images or video frames. Returns `CIFeature` subclass instances. Reuse detector instances for best performance.

## Signature / Usage

```swift
// Face detector
let context = CIContext()
let options: [String: Any] = [CIDetectorAccuracy: CIDetectorAccuracyHigh]
let detector = CIDetector(ofType: CIDetectorTypeFace,
                          context: context,
                          options: options)!

let imageOptions: [String: Any] = [CIDetectorImageOrientation: 1]
let features = detector.features(in: ciImage, options: imageOptions)

for feature in features as! [CIFaceFeature] {
    print("Face bounds: \(feature.bounds)")
}
```

## Options / Props

### Initializer

```swift
init?(ofType: String, context: CIContext?, options: [String: Any]?)
```

### Detector Types (`ofType`)

| Constant | Description |
|----------|-------------|
| `CIDetectorTypeFace` | Detect human faces |
| `CIDetectorTypeRectangle` | Detect rectangular regions |
| `CIDetectorTypeText` | Detect text regions |
| `CIDetectorTypeQRCode` | Detect QR codes |

### Creation Options

| Key | Values | Description |
|-----|--------|-------------|
| `CIDetectorAccuracy` | `CIDetectorAccuracyLow`, `CIDetectorAccuracyHigh` | Speed/accuracy trade-off |
| `CIDetectorMinFeatureSize` | `CGFloat` (0.0–1.0) | Minimum feature size as fraction of image dimension |
| `CIDetectorMaxFeatureCount` | `Int` | Maximum number of features to return |
| `CIDetectorTracking` | `Bool` | Enable feature tracking across frames |
| `CIDetectorNumberOfAngles` | `Int` | Angles to test for rectangle/text detection |

### Detection Methods

| Method | Description |
|--------|-------------|
| `features(in: CIImage) -> [CIFeature]` | Detect features with default options |
| `features(in: CIImage, options: [String: Any]?) -> [CIFeature]` | Detect with per-call options (e.g., image orientation) |

### Per-Detection Options

| Key | Description |
|-----|-------------|
| `CIDetectorImageOrientation` | EXIF orientation integer (1–8) |
| `CIDetectorEyeBlink` | `Bool` — detect eye blinks (face only) |
| `CIDetectorSmile` | `Bool` — detect smiles (face only) |
| `CIDetectorFocalLength` | Camera focal length for rectangle detection |
| `CIDetectorAspectRatio` | Expected aspect ratio for rectangle detection |

## Notes

- iOS 5.0+, iPadOS 5.0+, macOS 10.7+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+
- **Superseded by Vision framework** (iOS 11+, macOS 10.13+) — prefer `VNRequest` subclasses for new development.
- Creating a detector is expensive; reuse the same instance across multiple detection calls.

## Related

- [CIImage](./ciimage.md)
- [CIContext](./cicontext.md)
