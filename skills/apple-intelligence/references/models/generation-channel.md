---
source: https://developer.apple.com/documentation/foundationmodels/languagemodelexecutorgenerationchannel
---

# LanguageModelExecutorGenerationChannel

A type you use to send model output deltas and updates to the framework.

## Signature / Usage

```swift
struct LanguageModelExecutorGenerationChannel
```

```swift
func respond(
    to request: LanguageModelExecutorGenerationRequest,
    model: MyLanguageModel,
    streamingInto channel: LanguageModelExecutorGenerationChannel
) async throws {

    let entryID = UUID().uuidString

    // Calculate your total and cached tokens counts for the input.
    let totalTokens = 0
    let cachedTokens = 0

    // Send model identification.
    await channel.send(.response(entryID: entryID, action: .updateMetadata([
        "modelID": "my-model-2026-06-08",
        "requestID": request.id.uuidString
    ])))

    // Report prompt token usage upfront.
    await channel.send(.response(
        entryID: entryID,
        action: .updateUsage(
            input: .init(
                totalTokenCount: totalTokens,
                cachedTokenCount: cachedTokens
            ),
            output: .init(
                totalTokenCount: 0,
                reasoningTokenCount: 0
            )
        )
    ))
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| init() | initializer | Creates a generation channel instance. |
| send(_:) | method | Sends a generation event on the channel. |
| Event | nested type | A generation event sent on a generation channel. |
| Metadata | nested type | Snapshot of an entry's metadata dictionary. |
| Reasoning | nested type | A reasoning event. |
| ReasoningSignature | nested type | Payload for a reasoning entry's signature update. |
| TextFragment | nested type | Text appended to a streaming entry's current text segment. |
| TextSegmentReplacement | nested type | A replacement for a streaming entry's current text segment. |
| Response | nested type | A model-generated response event: text, segment replacements, citations, advisories, custom segments, metadata, or usage. |
| ToolCalls | nested type | A tool-call lifecycle event, including per-call argument streaming, reasoning, metadata, usage, or retraction. |
| Usage | nested type | Snapshot of an entry's token totals. |
| DataEntry | nested type (beta) | A top-level data-entry event addressed to a transcript entry. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+. `DataEntry` is Beta: iOS 27.2+.
- Use the channel to stream text as the model produces it, and to report metadata and usage.
- Conforms to `AsyncSequence` (listed under Default Implementations).

## Related

- [LanguageModelExecutor](./language-model-executor.md)
- [LanguageModelExecutorGenerationRequest](./generation-request.md)
- [LanguageModel](./language-model.md)
