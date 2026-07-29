# Language Model best practices

Usage guidance for the `LanguageModel` (Phi Silica) API covering non-deterministic output, multi-turn conversation context, context-window management, response status handling, and resource disposal.

## Signature / Usage

```csharp
using Microsoft.Windows.AI.Text;

async Task<string> GenerateWithLowVariability(LanguageModel languageModel, string prompt)
{
    var options = new LanguageModelOptions();
    options.Temperature = 0.1f;
    options.TopK = 1;

    var result = await languageModel.GenerateResponseAsync(prompt, options);
    return result.Text;
}
```

## Options / Props

| Parameter | Default | Effect on variability |
|------|-------------|------|
| `Temperature` | 0.9 | Higher values increase randomness; lower values produce more focused output. `0` is deterministic on the same machine/execution-provider version, but can still differ across hardware or after an EP update. |
| `TopP` | 0.9 | Cumulative probability threshold for token candidates. |
| `TopK` | 40 | Maximum tokens considered at each step; lower values reduce variability. |

`LanguageModelResponseResult.Status` values:

| Status | Meaning | Recommended handling |
|------|-------------|------|
| `Complete` | Full response generated successfully | Use `result.Text` |
| `InProgress` | Generation still running (streaming APIs only) | Wait for completion |
| `BlockedByPolicy` | Generative AI blocked by system policy | Tell the user the feature is unavailable |
| `PromptLargerThanContext` | Prompt exceeds the context window | Trim the prompt via `GetUsablePromptLength`, or reset the context |
| `PromptBlockedByContentModeration` | Input blocked by content moderation | Tell the user their input was filtered |
| `ResponseBlockedByContentModeration` | Output blocked by content moderation | Tell the user the response was filtered; consider rephrasing |
| `Error` | An error occurred | Check `result.ExtendedError` |

## Notes

- Output is non-deterministic by design (random seed per call) — never branch on exact string equality; use case-insensitive substring checks, regex, or embedding-based semantic comparison (`GenerateEmbeddingVectors` + cosine similarity) instead.
- `GenerateResponseAsync` without a `LanguageModelContext` is stateless — pass the same `LanguageModelContext` (from `CreateContext`) to every call in a conversation to preserve history; the call mutates the context in place.
- The context window is finite and shared by the system prompt, accumulated history, and the current prompt; the API does not auto-truncate. Call `GetUsablePromptLength(context, prompt)` before sending — if the returned index is less than the prompt length, trim/rephrase the prompt or reset the context (optionally seeding a new context with a model-generated summary of the prior conversation as its system prompt).
- If content moderation blocks a prompt or response, the context state is unspecified — consider creating a new context afterward.
- Always check `result.Status` before reading `result.Text`; a non-`Complete` status means the text may be empty, incomplete, or absent.
- `LanguageModel` and `LanguageModelContext` both implement `IClosable` and hold native resources — wrap them in `using`. Create a single `LanguageModel` and reuse it across calls; dispose each `LanguageModelContext` when its conversation ends (not after every call).

## Related

- [LanguageModel](./language-model.md)
- [LanguageModelOptions / ContentFilterOptions](./language-model-options.md)
- [LanguageModelContext](./language-model-context.md)
