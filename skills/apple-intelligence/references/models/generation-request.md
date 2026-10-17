---
source: https://developer.apple.com/documentation/foundationmodels/languagemodelexecutorgenerationrequest
---

# LanguageModelExecutorGenerationRequest

A type that contains the details for a generation request.

## Signature / Usage

```swift
struct LanguageModelExecutorGenerationRequest
```

```swift
init(id:transcript:enabledTools:schema:generationOptions:contextOptions:metadata:)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| id | property | A request id for logging and tracing purposes. |
| metadata | property | Metadata to attach to the request. |
| contextOptions | property | Settings that configure how the model is prompted. |
| enabledToolDefinitions | property | The subset of tool definitions that the model is allowed to call. |
| generationOptions | property | Generation options that control sampling behavior. |
| schema | property | An optional schema dictating the required output format. |
| transcript | property | A transcript to generate the next entry for. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+.
- This is the input payload that `LanguageModelExecutor.respond(to:model:streamingInto:)` handles. It bundles everything the executor needs to translate a framework call into a backend request, such as the conversation so far and which tools are available.

## Related

- [LanguageModelExecutor](./language-model-executor.md)
- [LanguageModelExecutorGenerationChannel](./generation-channel.md)
- [LanguageModel](./language-model.md)
