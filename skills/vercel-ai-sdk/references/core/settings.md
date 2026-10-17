---
source: https://ai-sdk.dev/docs/ai-sdk-core/settings
---

# Settings

All AI SDK functions support common settings in addition to the model, the prompt, and provider-specific settings. Two groups exist: language model call options (`LanguageModelCallOptions`) and request options (`RequestOptions`).

## Signature / Usage

```ts
const result = await generateText({
  model,
  maxOutputTokens: 512,
  temperature: 0.3,
  maxRetries: 5,
  timeout: 10000,
  prompt: 'Invent a new holiday and describe its traditions.',
});
```

## Language model call options

Settings that influence how the model generates its response; forwarded to the underlying model.

| Name | Description |
| --- | --- |
| `maxOutputTokens` | Maximum number of tokens to generate. |
| `temperature` | Passed through to the provider; range depends on provider and model. For most providers `0` means almost deterministic results, higher values mean more randomness. Set either `temperature` or `topP`, but not both. |
| `topP` | Nucleus sampling; passed through to the provider. For most providers a number between 0 and 1 (0.1 = only tokens in the top 10% probability mass). Set either `temperature` or `topP`, but not both. |
| `topK` | Only sample from the top K options for each subsequent token. Removes "long tail" low probability responses. Advanced use cases only. |
| `presencePenalty` | Affects the likelihood of repeating information already in the prompt. For most providers `0` means no penalty. |
| `frequencyPenalty` | Affects the likelihood of repeatedly using the same words or phrases. For most providers `0` means no penalty. |
| `stopSequences` | Stop generating when one of the sequences is generated. Providers may limit the number of stop sequences. |
| `seed` | Integer seed for random sampling. If set and supported by the model, calls generate deterministic results. |
| `reasoning` | Controls how much reasoning the model performs. See below. |

`reasoning` values:

| Value | Behavior |
| --- | --- |
| `'provider-default'` | Use the provider's default reasoning behavior (default when omitted) |
| `'none'` | Disable reasoning |
| `'minimal'` | Bare-minimum reasoning |
| `'low'` | Fast, concise reasoning |
| `'medium'` | Balanced reasoning |
| `'high'` | Thorough reasoning |
| `'xhigh'` | Extra-high reasoning |
| `'max'` | Maximum reasoning |

## Request options

Settings that affect transport, retries, cancellation, and timeouts, not generation behavior.

| Name | Description |
| --- | --- |
| `maxRetries` | Maximum number of retries. Set to 0 to disable retries. Default: `2`. |
| `abortSignal` | Optional abort signal to cancel the call (e.g. forwarded from a UI, or `AbortSignal.timeout`). |
| `timeout` | Timeout in milliseconds, or an object (below). Creates an abort signal internally; if both `abortSignal` and `timeout` are provided, the call aborts when either condition is met. |
| `headers` | Additional HTTP headers sent with the request. Only applicable for HTTP-based providers. |

`timeout` object properties:

| Name | Description |
| --- | --- |
| `totalMs` | Total timeout for the entire call including all steps. |
| `stepMs` | Timeout for each complete step, including model generation, retries, and local tool execution. Cumulative across provider attempts within the step. |
| `firstChunkMs` | Timeout until the first content-bearing output of each step (streaming only). Text deltas, reasoning deltas, tool-input deltas, generated files, and tool calls satisfy it; response metadata, stream starts, empty deltas, raw chunks, and transport activity do not. |
| `chunkMs` | Timeout between meaningful model output chunks after output has started (streaming only). Starts with the first meaningful output; does not limit the wait for the first output. Non-content chunks do not reset it. |
| `toolMs` | Default timeout for all tool executions. If a tool takes longer, it aborts and returns a tool-error so the model can respond or retry. |
| `tools` | Per-tool timeout overrides using `{toolName}Ms` keys (e.g. `weatherMs`, `slowApiMs`). Takes precedence over `toolMs`. |

```ts
const result = await generateText({
  model,
  tools: { weather: weatherTool, slowApi: slowApiTool },
  timeout: {
    toolMs: 5000, // default for all tools
    tools: {
      weatherMs: 3000, // 3 seconds for weather tool
      slowApiMs: 10000, // 10 seconds for slow API tool
    },
  },
  prompt: 'What is the weather in San Francisco?',
});
```

## Notes

- Some providers do not support all common settings. An unsupported setting generates a warning; check `warnings` in the result object.
- In AI SDK 5.0, temperature is no longer set to `0` by default.
- Provider-specific settings take precedence over the corresponding fields derived from `reasoning`. Partial configurations can still use portable reasoning to fill missing fields; summary and display options can be used alongside it. For example, Bedrock preserves an explicit thinking budget while deriving a missing enabled type from portable reasoning.
- The `firstChunkMs` and `chunkMs` timers stop when the model response finishes, errors, closes, or is cancelled. Each provider retry or later model call gets fresh output timeout budgets. Retry backoff and local tool execution are outside these budgets. Provider-executed tools remain within the model response. `stepMs` and `totalMs` remain active across retries and local tool execution.
- `headers` here is request-specific; `headers` can also be set in the provider configuration, which are sent with every request made by the provider.

## Related

- [Reasoning](./reasoning.md)
- [generateText](./generate-text.md)
- [streamText](./stream-text.md)
