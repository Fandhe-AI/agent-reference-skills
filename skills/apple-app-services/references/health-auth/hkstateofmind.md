# HKStateOfMind

A concrete `HKSample` subclass representing a state-of-mind sample, storing an emotional valence measurement plus contextual mood labels and associations.

## Signature / Usage

```swift
let stateOfMind = HKStateOfMind(
    date: Date(),
    kind: .momentaryEmotion,
    valence: 0.6,
    labels: [.happy, .content],
    associations: [.family, .health],
    metadata: nil
)
try await healthStore.save(stateOfMind)
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `kind` | `HKStateOfMind.Kind` | The category of the state of mind (e.g. momentary emotion vs. daily mood) |
| `valence` | `Double` | Numeric value representing emotional valence (mood positivity/negativity) |
| `valenceClassification` | `HKStateOfMind.ValenceClassification` | Classified category derived from `valence` |
| `labels` | `[HKStateOfMind.Label]` | Labels describing the mood state (e.g. `.happy`, `.content`) |
| `associations` | `[HKStateOfMind.Association]` | Contexts associated with the state of mind (e.g. `.family`, `.health`) |

## Notes

- iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, visionOS 2.0+, watchOS 11.0+.
- Inherits from `HKSample`; conforms to `HKStateOfMindType` when used as a sample type in queries and authorization requests.

## Related

- [HKSampleType](./hksampletype.md)
- [HKQuantitySample](./hkquantitysample.md)
- [HKHealthStore](./hkhealthstore.md)
