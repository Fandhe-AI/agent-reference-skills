# LanguageModelContext

Defines the tokens a `LanguageModel` can process at one time for understanding an input prompt and generating a response — acting as the model's short-term memory across a conversation.

## Signature / Usage

```csharp
using LanguageModel languageModel = await LanguageModel.CreateAsync();

// Create a context window, optionally seeded with a system prompt and content filter options
using LanguageModelContext context = languageModel.CreateContext(
    "You are a concise, helpful assistant.");

var result = await languageModel.GenerateResponseAsync(context, "What's the capital of France?");
```

## Options / Props

| Overload | Description |
|------|-------------|
| `LanguageModel.CreateContext()` | Returns a new empty context window. |
| `LanguageModel.CreateContext(String)` | Returns a context window seeded with a system prompt. |
| `LanguageModel.CreateContext(String, ContentFilterOptions)` | Returns a context window seeded with a system prompt and content filter options. |
| `Close()` / `Dispose()` | Releases the context; `LanguageModelContext` implements `IClosable`/`IDisposable`. |

## Notes

- Namespace: `Microsoft.Windows.AI.Text`.
- A larger context window enables more detailed conversations and processing of larger documents, but increases processing time and can reduce accuracy.
- Use `LanguageModel.GetUsablePromptLength(LanguageModelContext, String)` to find the index in a prompt where the context window reaches its maximum token capacity, so you can truncate before submitting.
- Pass the context into `GenerateResponseAsync(LanguageModelContext, String, LanguageModelOptions)` to maintain conversational state across multiple turns.

## Related

- [LanguageModel](./language-model.md)
- [LanguageModelOptions and ContentFilterOptions](./language-model-options.md)
