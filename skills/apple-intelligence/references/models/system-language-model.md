---
source: https://developer.apple.com/documentation/foundationmodels/systemlanguagemodel
---

# SystemLanguageModel

An on-device Apple Foundation Model capable of text generation tasks.

## Signature / Usage

```swift
final class SystemLanguageModel
```

```swift
struct GenerativeView: View {
    // Create a reference to the system language model.
    private var model = SystemLanguageModel.default

    var body: some View {
        switch model.availability {
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
    }
}
```

## Options / Props

| Group | Member | Description |
|-------|--------|-------------|
| Default model | `default` | The base version of the model. |
| Use case | `init(useCase:guardrails:)` | Creates a system language model instance for a specific use case. |
| Use case | `SystemLanguageModel.UseCase` | A type that represents the use case for prompting. |
| Use case | `SystemLanguageModel.Guardrails` | A set of controls that flag sensitive content from model input and output. |
| Variant | `variant` | The variant of the on-device model backing this instance. |
| Variant | `SystemLanguageModel.Variant` | The variant of an on-device model. |
| Availability | `isAvailable` | A Boolean value that indicates whether the system is entirely ready. |
| Availability | `availability` | The availability of the language model. |
| Availability | `SystemLanguageModel.Availability` | The availability status for a specific system language model. |
| Capabilities | `contextSize` | The maximum context size in tokens that the model supports. |
| Capabilities | `supportedLanguages` | Languages that the model supports. |
| Capabilities | `supportsLocale(_:)` | Returns a Boolean value that indicates whether the given locale is supported by the model. |
| Tokens | `tokenCount(for:)` | Returns the token count for the specified instructions. |
| Errors | `SystemLanguageModel.Error` | An error specific to the on-device system language model. |

## Notes

- Availability: iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, visionOS 26.0+.
- `SystemLanguageModel` refers to the on-device text foundation model that powers Apple Intelligence. Apple periodically updates it in routine OS updates. Currently there are 3 model versions that align with iOS, iPadOS, macOS, and visionOS 26.0 - 26.3, 26.4, and 27.0.
- Verify availability before use. Availability depends on whether the device and region support Apple Intelligence.

## Related

- [UseCase](./use-case.md)
- [Guardrails](./guardrails.md)
- [Variant](./variant.md)
- [Availability](./availability.md)
- [SystemLanguageModel.Error](./system-language-model-error.md)
- [LanguageModelError](./language-model-error.md)
- [LanguageModel](./language-model.md)
