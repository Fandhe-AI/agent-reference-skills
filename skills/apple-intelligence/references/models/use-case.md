---
source: https://developer.apple.com/documentation/foundationmodels/systemlanguagemodel/usecase
---

# SystemLanguageModel.UseCase

A type that represents the use case for prompting.

## Signature / Usage

```swift
struct UseCase
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| general | static property | A use case for general prompting. |
| contentTagging | static property | A use case for content tagging. |

## Notes

- Availability: iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, visionOS 26.0+.
- Pass a use case to `SystemLanguageModel.init(useCase:guardrails:)` to access a specialized version of the model.

## Related

- [SystemLanguageModel](./system-language-model.md)
- [Guardrails](./guardrails.md)
