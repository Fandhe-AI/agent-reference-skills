# MLSplitStrategy

An enum describing how Create ML partitions a dataset to create a validation split from training data.

## Signature / Usage

```swift
// Automatic: Create ML decides the split ratio
var params = MLImageClassifier.ModelParameters(
    validation: .split(strategy: .automatic)
)

// Fixed ratio: 20% of training data becomes validation
var params = MLImageClassifier.ModelParameters(
    validation: .split(strategy: .fixed(ratio: 0.2, seed: 42))
)
```

## Options / Props

| Case | Description |
|------|-------------|
| `.automatic` | Create ML automatically determines the validation split ratio |
| `.fixed(ratio: Double, seed: Int?)` | Use exactly `ratio` fraction of training data for validation; `seed` controls randomization |

## Notes

- macOS 10.15+, iOS 15.0+, iPadOS 15.0+, Mac Catalyst 15.0+, tvOS 16.0+, visionOS 1.0+
- `resolve(count:)` returns the concrete `(ratio: Double, seed: Int)` tuple for a given dataset size

## Related

- [MLImageClassifier.ModelParameters](./mlimageclassifier-modelparameters.md)
