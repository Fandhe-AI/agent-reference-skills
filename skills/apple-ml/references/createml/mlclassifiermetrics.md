# MLClassifierMetrics

A struct providing metrics to evaluate a classifier model's ability to distinguish between categories.

## Signature / Usage

```swift
let classifier = try MLImageClassifier(trainingData: source, parameters: .init())

print(classifier.trainingMetrics.classificationError)   // e.g. 0.03
print(classifier.validationMetrics.classificationError) // e.g. 0.07

// Inspect confusion matrix
print(classifier.validationMetrics.confusion)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `classificationError` | `Double` | Fraction of incorrectly labeled examples |
| `confusion` | `MLDataTable` | Table comparing actual vs. predicted labels per class |
| `precisionRecall` | `MLDataTable` | Table of precision and recall percentages per class |
| `confusionDataFrame` | `DataFrame` | DataFrame version of the confusion matrix |
| `precisionRecallDataFrame` | `DataFrame` | DataFrame version of precision/recall table |
| `isValid` | `Bool` | Whether metrics were successfully computed |
| `error` | `(any Error)?` | Underlying error if metrics are invalid |

## Notes

- macOS 10.14+, iOS 15.0+, iPadOS 15.0+, Mac Catalyst 15.0+, tvOS 16.0+, visionOS 1.0+
- For unbalanced datasets, prefer `precisionRecall` over `classificationError` alone
- Each trained model exposes separate `trainingMetrics` and `validationMetrics`

## Related

- [MLImageClassifier](./mlimageclassifier.md)
- [MLTextClassifier](./mltextclassifier.md)
- [MLSoundClassifier](./mlsoundclassifier.md)
- [MLClassifier](./mlclassifier.md)
