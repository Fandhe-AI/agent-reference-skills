# LanguageModel

Represents a local small language model (Phi Silica) that runs on-device to generate chat responses, reason over text, solve math, and generate code.

## Signature / Usage

```csharp
using Microsoft.Windows.AI;
using Microsoft.Windows.AI.ContentSafety;
using Microsoft.Windows.AI.Text;

if (LanguageModel.GetReadyState() == AIFeatureReadyState.NotReady)
{
   var op = await LanguageModel.EnsureReadyAsync();
}

using LanguageModel languageModel = await LanguageModel.CreateAsync();

string prompt = "Provide the molecular formula for glucose.";

LanguageModelOptions options = new LanguageModelOptions();
ContentFilterOptions filterOptions = new ContentFilterOptions();
filterOptions.PromptMaxAllowedSeverityLevel.Violent = SeverityLevel.Minimum;
options.ContentFilterOptions = filterOptions;

var result = await languageModel.GenerateResponseAsync(prompt, options);

Console.WriteLine(result.Text);
```

## Options / Props

| Member | Description |
|------|-------------|
| `CreateAsync()` | Asynchronously creates a new `LanguageModel` instance. |
| `GetReadyState()` | Static method. Returns the `AIFeatureReadyState` readiness of the model. |
| `EnsureReadyAsync()` | Static method. Downloads/installs the model if needed. |
| `GenerateResponseAsync(String)` / `(String, LanguageModelOptions)` / `(LanguageModelContext, String, LanguageModelOptions)` | Generates a response to a string prompt, returning progress for each token generated (via `IAsyncOperationWithProgress`), and the complete result on completion. |
| `GenerateStructuredJsonResponseAsync(String prompt, String jsonSchema[, LanguageModelOptions])` | Generates a response constrained to a caller-supplied JSON schema; returns a `GenerateStructuredJsonResponseResult`. |
| `GenerateEmbeddingVectors(String[, ContentFilterOptions])` | Returns an embedding vector representing the string prompt (semantic search). |
| `GenerateResponseFromEmbeddingsAsync(IIterable<EmbeddingVector>[, LanguageModelOptions])` | Generates a response to an embedding vector prompt. |
| `CreateContext()` / `CreateContext(String)` / `CreateContext(String, ContentFilterOptions)` | Returns a `LanguageModelContext` context window. |
| `GetUsablePromptLength(String)` / `(LanguageModelContext, String)` | Returns the index in the prompt where the context window reaches its max token count. |
| `GetVectorSpaceId()` | Returns the unique identifier of an embedding vector space. |
| `Close()` / `Dispose()` | Releases the underlying model resources; `LanguageModel` implements `IClosable`/`IDisposable`, so wrap it in `using`. |

## Notes

- Namespace: `Microsoft.Windows.AI.Text` (Windows App SDK, experimental channel). Requires the Phi Silica Limited Access Feature (LAF) unlock token.
- There is no separate `GenerateResponseWithProgressAsync` method — `GenerateResponseAsync` itself returns an `IAsyncOperationWithProgress`, exposing per-token progress while `await`-ing the final `LanguageModelResponseResult`.
- Phi Silica is being replaced by Aion Instruct starting October 2026 (Insider) / November 2026 (retail); plan for this transition.
- Phi Silica is not available in China.
- On NPU, speculative decoding and prompt compression accelerate generation; both are unavailable when running on GPU.
- Text Intelligence Skills (`TextSummarizer`, `TextRewriter`, `TextToTableConverter`) wrap a `LanguageModel` instance for summarizing, rewriting (with `TextRewriteTone`), and formatting text-to-table.
- Use `LanguageModelContext` to preserve conversation state across multiple `GenerateResponseAsync` calls; use `LanguageModelOptions` to tune `Temperature`, `TopK`, `TopP`, `ContentFilterOptions`, and `LowRankAdapter`.

## Related

- [LanguageModelOptions and ContentFilterOptions](./language-model-options.md)
- [LanguageModelContext](./language-model-context.md)
- [Phi Silica LoRA fine-tuning](./phi-silica-lora.md)
- [Semantic Search and embeddings](./semantic-search.md)
- [Device requirements and fallback](./device-requirements.md)
- [Content moderation](./content-moderation.md)
- [Text Intelligence Skills](./text-intelligence-skills.md)
- [Language Model best practices](./language-model-best-practices.md)
- [Generate structured JSON output with Phi Silica](./phi-silica-structured-output.md)
- [Windows AI API troubleshooting](./troubleshooting.md)
