---
source: https://developer.apple.com/documentation/foundationmodels/systemlanguagemodel/availability-swift.enum
---

# SystemLanguageModel.Availability

The availability status for a specific system language model.

## Signature / Usage

```swift
@frozen enum Availability
```

```swift
switch SystemLanguageModel.default.availability {
case .available:
    // Show your intelligence UI.
case .unavailable(.deviceNotEligible):
    // Show an alternative UI.
case .unavailable(.modelNotReady):
    // The model isn't ready because it's downloading or because
    // of other system reasons.
case .unavailable(let other):
    // The model is unavailable for an unknown reason.
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| available | case | The system is ready to make requests. |
| unavailable(_:) | case | The system isn't ready for requests. |
| UnavailableReason | nested type | The reason the system language model is unavailable. |

## Notes

- Availability: iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, visionOS 26.0+.
- Read the value through `SystemLanguageModel.availability`; `SystemLanguageModel.isAvailable` is the Boolean shortcut.
- The `UnavailableReason` cases `deviceNotEligible` and `modelNotReady` appear in the official `SystemLanguageModel` example; the full case list was not fetched.

## Related

- [SystemLanguageModel](./system-language-model.md)
- [SystemLanguageModel.Error](./system-language-model-error.md)
- [PrivateCloudComputeLanguageModel](./private-cloud-compute-language-model.md)
