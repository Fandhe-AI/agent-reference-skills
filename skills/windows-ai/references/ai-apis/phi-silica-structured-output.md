# Generate structured JSON output with Phi Silica

The stable `LanguageModel` class exposes `GenerateStructuredJsonResponseAsync` directly, constraining the Phi Silica model's response to valid JSON conforming to a caller-supplied JSON Schema — no `LanguageModelExperimental` wrapper is required. This page documents the experimental-channel variant, `LanguageModelExperimental.GenerateStructuredJsonResponseAsync`, which additionally accepts `LanguageModelOptionsExperimental` (e.g. LoRA adapter tuning); for the stable API see [LanguageModel](./language-model.md).

## Signature / Usage

```csharp
using Microsoft.Windows.AI;
using Microsoft.Windows.AI.Text;
using Microsoft.Windows.AI.Text.Experimental;

if (LanguageModel.GetReadyState() == AIFeatureReadyState.NotReady)
{
    await LanguageModel.EnsureReadyAsync();
}

using LanguageModel languageModel = await LanguageModel.CreateAsync();
var experimentalModel = new LanguageModelExperimental(languageModel);

string prompt = "Give me information about a 30-year-old software engineer named Alice.";
string jsonSchema = @"
{
    ""type"": ""object"",
    ""properties"": {
        ""name"": { ""type"": ""string"" },
        ""age"": { ""type"": ""integer"" },
        ""occupation"": { ""type"": ""string"" }
    },
    ""required"": [""name"", ""age"", ""occupation""]
}";

var options = new LanguageModelOptionsExperimental();
var result = await experimentalModel.GenerateStructuredJsonResponseAsync(prompt, jsonSchema, options);

if (result.Status == Microsoft.Windows.AI.Text.Experimental.GenerateStructuredJsonResponseStatus.Complete)
{
    Console.WriteLine(result.Text);
}
```

## Options / Props

| Member | Description |
|------|-------------|
| `LanguageModelExperimental` | Wraps a `LanguageModel` instance; exposes experimental features including structured JSON output and LoRA adapter loading. |
| `GenerateStructuredJsonResponseAsync(String prompt, String jsonSchema, LanguageModelOptionsExperimental)` | Generates a response constrained to conform to the provided JSON Schema; returns `IAsyncOperationWithProgress<GenerateStructuredJsonResponseResult, String>` (`Microsoft.Windows.AI.Text.Experimental.GenerateStructuredJsonResponseResult`) for token-by-token progress. |
| `LanguageModelOptionsExperimental` | `Temperature`, `TopP`, `TopK`, `ContentFilterOptions`, `LoraAdapter` — same tuning surface as `LanguageModelOptions`, for experimental generation methods. |

Supported JSON Schema subset:

| Keyword | Description |
|------|-------------|
| `type` | Constrains a value to `string`, `integer`, `number`, `boolean`, `object`, `array`, or `null`. |
| `properties` | Expected keys/types for an `object`; nesting is supported. |
| `required` | Ensures the listed properties are present in the output. |
| `enum` | Restricts a value to a predefined set of options. |
| `items` | Type or schema for elements within an `array`. |

## Notes

- Namespace: `Microsoft.Windows.AI.Text.Experimental` (Windows App SDK experimental channel), extending the stable `Microsoft.Windows.AI.Text` namespace.
- The stable `LanguageModel` class (Windows App SDK 2.0) exposes `GenerateStructuredJsonResponseAsync(String prompt, String jsonSchema[, LanguageModelOptions])` directly — no `LanguageModelExperimental` wrapper is needed for basic structured JSON output. Use `LanguageModelExperimental` only when the experimental options surface (e.g. LoRA adapters) is also required.
- **No conversation context**: unlike `GenerateResponseAsync`, this method does not accept a `LanguageModelContext`; every call is stateless.
- `$ref`, `oneOf`, `anyOf`, `patternProperties`, and `additionalProperties` are **not supported** — using an unsupported keyword doesn't throw, but may produce unexpected output.
- Throws `ArgumentException` if `jsonSchema` is empty, not valid JSON, or not a JSON object (e.g. passing a JSON array).
- Check `result.Status` against `Microsoft.Windows.AI.Text.Experimental.GenerateStructuredJsonResponseStatus` (a distinct enum from the stable-namespace `Microsoft.Windows.AI.Text.GenerateStructuredJsonResponseStatus` returned by the stable `LanguageModel` method): `Complete` means the JSON was validated against the schema; `ResponseInvalidJson` means the model's text didn't conform (still available via `result.Text`, but may not match the schema); other values are `InProgress`, `BlockedByPolicy`, `PromptLargerThanContext`, `PromptBlockedByContentModeration`, `ResponseBlockedByContentModeration`, and `Error`.
- Expect higher latency than `GenerateResponseAsync` due to the iterative constrained-decoding strategy used to enforce the schema.
- Phi Silica features are not available in China.

## Related

- [LanguageModel](./language-model.md)
- [LanguageModelOptions / ContentFilterOptions](./language-model-options.md)
- [LanguageModelContext](./language-model-context.md)
- [Phi Silica LoRA fine-tuning](./phi-silica-lora.md)
