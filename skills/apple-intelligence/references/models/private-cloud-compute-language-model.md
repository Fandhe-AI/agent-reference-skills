---
source: https://developer.apple.com/documentation/foundationmodels/privatecloudcomputelanguagemodel
---

# PrivateCloudComputeLanguageModel

A variant of Apple Foundation Models that runs on Private Cloud Compute to provide enhanced capabilities while maintaining privacy guarantees.

## Signature / Usage

```swift
final class PrivateCloudComputeLanguageModel
```

```swift
// Create a session with the server-side model.
let session = LanguageModelSession(model: PrivateCloudComputeLanguageModel())
let response = try await session.respond(to: "Analyze this document...")
```

## Options / Props

| Group | Member | Description |
|-------|--------|-------------|
| Creating | `init()` | Creates a Private Cloud Compute language model instance. |
| Availability | `isAvailable` | A Boolean value that indicates whether the system is entirely ready. |
| Availability | `availability` | The availability of the language model. |
| Availability | `PrivateCloudComputeLanguageModel.Availability` | The availability status for a specific PCC language model (`available`, `unavailable(_:)`, `UnavailableReason`). |
| Quota | `quotaUsage` | The usage quota for this model. |
| Quota | `PrivateCloudComputeLanguageModel.QuotaUsage` | The usage quota state: `isLimitReached`, `limitIncreaseSuggestion`, `status`, `resetDate`. |
| Context | `contextSize` | The maximum context size in tokens supported by the model. |
| Languages | `supportedLanguages` | Languages that the model supports. |
| Languages | `supportsLocale(_:)` | Returns a Boolean value that indicates whether the given locale is supported by the model. |
| Errors | `PrivateCloudComputeLanguageModel.Error` | Errors that may occur when using Private Cloud Compute: `quotaLimitReached(_:)`, `networkFailure(_:)`, `serviceUnavailable(_:)`. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+.
- To use the server-based model that powers Apple Intelligence, change a single line where the `LanguageModelSession` is created.
- Verify availability before use. It depends on whether the device and region support Apple Intelligence.
- To develop with PCC you must meet certain eligibility requirements and request access to the managed entitlement (see the entitlement page).
- Quotas are orthogonal to availability: a model can be available even after its usage limit has been reached (`QuotaUsage`).
- `PrivateCloudComputeLanguageModel.Error` has a `networkFailure` case for when a network is available but PCC is inaccessible.

## Related

- [com.apple.developer.private-cloud-compute](./private-cloud-compute-entitlement.md)
- [SystemLanguageModel](./system-language-model.md)
- [LanguageModel](./language-model.md)
