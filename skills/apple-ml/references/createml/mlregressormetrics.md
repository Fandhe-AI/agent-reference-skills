# MLRegressorMetrics

A struct providing metrics to evaluate a regressor model's prediction accuracy.

## Signature / Usage

```swift
let regressor = try MLRegressor(trainingData: table, targetColumn: "price")

// Check worst-case error first
print(regressor.validationMetrics.maximumError)

// Then average error
print(regressor.validationMetrics.rootMeanSquaredError)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `maximumError` | `Double` | Largest absolute difference between expected and predicted values |
| `rootMeanSquaredError` | `Double` | Root mean squared error — typical deviation between actual and predicted |
| `isValid` | `Bool` | Whether metrics were successfully computed |
| `error` | `(any Error)?` | Underlying error if metrics are invalid |

## Notes

- macOS 10.14+, iOS 15.0+, iPadOS 15.0+, Mac Catalyst 15.0+, tvOS 16.0+, visionOS 1.0+
- Lower values indicate better performance for both metrics
- Examine `maximumError` first to understand worst-case behavior, then `rootMeanSquaredError` for average behavior

## Related

- [MLRegressor](./mlregressor.md)
