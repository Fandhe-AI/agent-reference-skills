# MLObjectDetectorMetrics

A struct providing intersection-over-union (IoU) based metrics to evaluate an object detector's performance.

## Signature / Usage

```swift
let detector = try MLObjectDetector(trainingData: source, parameters: .init(), annotationType: .boundingBox)

let metrics = detector.validationMetrics
print(metrics.meanAveragePrecision.IoU50)      // mAP at IoU threshold 0.5
print(metrics.meanAveragePrecision.variedIoU)  // mAP averaged over IoU 0.5–0.95

// Per-class average precision
let perClass = metrics.averagePrecision.IoU50  // [String: Double]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `averagePrecision` | `(variedIoU: [String: Double], IoU50: [String: Double])` | Per-class average precision at varied and fixed (0.5) IoU thresholds |
| `meanAveragePrecision` | `(variedIoU: Double, IoU50: Double)` | Mean average precision across all classes at varied and IoU 0.5 thresholds |
| `isValid` | `Bool` | Whether metrics were successfully computed |
| `error` | `(any Error)?` | Underlying error if metrics are invalid |

## Notes

- macOS 10.15+ only
- IoU = 1.0 means perfect bounding box overlap; IoU = 0.0 means no overlap
- `variedIoU` averages precision from IoU thresholds 0.5 through 0.95 (COCO-style mAP)

## Related

- [MLObjectDetector](./mlobjectdetector.md)
