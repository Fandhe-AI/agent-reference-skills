---
source: https://developer.apple.com/documentation/foundationmodels/analyzing-the-runtime-performance-of-your-foundation-models-app
---

# Analyzing the runtime performance of your Foundation Models app

Measure how prompts, responses, and tool calls affect token consumption and response times in Instruments.

## Signature / Usage

```swift
do {
    // Stream a response from the model and exclude the schema for your 
    // custom type.
    for try await partial in session.streamResponse(to: myPrompt,
                                                    generating: MyCustomItinerary.self,
                                                    includeSchemaInPrompt: false) {
        // Handle the partial result.
    }
} catch {
    // Handle the error that the method throws.
}
```

## Notes

- Article in the Foundation Models framework (iOS 26.0+, iPadOS 26.0+, macOS 26.0+, Mac Catalyst 26.0+, visionOS 26.0+, watchOS 27.0+).
- The Foundation Models instrument shows the instructions, prompt, and response of each request; where and how the model invokes your tools (with duration and output); and a per-session breakdown of request durations and token consumption. Depending on the model provider, cost can be a factor.
- Launch: Xcode Product > Profile, select the Foundation Models template, click Choose. Check that the device is not under thermal pressure or busy, then record (Record Trace button or File > Record Trace), interact with the model features, wait for responses to complete, click Stop.
- Recording captures all Foundation Models prompts and responses unencrypted; Instruments shows an alert. Trace files can contain sensitive information, so handle them accordingly and use this feature consistently with the Apple Developer Program License Agreement.
- The timeline width of each component indicates latency. For a duration breakdown: click the Foundation Models instrument, View > Detail Area > Tree, select the Model Inference, and show the Inspector (View > Show Inspector).
- Tokens are typically words or pieces of words and the count includes instructions, prompts, and outputs for a session. More output tokens generally take more time; summarizing is mostly reading and costs less processing than generating a new article. Characters and symbols cost more (for example `Sourdough` may be one token while `+1-(408)-555-0123` may use over ten). High counts affect initial processing time and memory.
- Cache hit rate is the percentage of input tokens served from the prefix cache and depends on the model provider.
- `includeSchemaInPrompt` in `streamResponse(generating:includeSchemaInPrompt:options:prompt:)` includes `Generable` type information before processing. It improves output quality but uses more input tokens; excluding the schema once similar requests or examples exist can save hundreds of tokens per request. Nested `Generable` types need more context. After the change, record a new trace and confirm token counts.
- Some term-list items in the official article (timeline lanes, duration and token metrics in the Inspector) are not reproduced here; see the official page.

## Related

- [Managing the context window](./managing-the-context-window.md)
- [Optimizing key-value caching in language model sessions](./kv-caching.md)
- [Evaluating prompts to measure performance and improve model responses](./evaluating-prompts.md)
