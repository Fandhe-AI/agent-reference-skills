# LanguageModelOptions / ContentFilterOptions

`LanguageModelOptions` defines the options that affect how the `LanguageModel` responds to a prompt (sampling parameters, content filtering, LoRA adapter). `ContentFilterOptions` (namespace `Microsoft.Windows.AI.ContentSafety`) sets per-category severity thresholds for prompt, response, and image content moderation.

## Signature / Usage

```csharp
LanguageModelOptions options = new LanguageModelOptions();
ContentFilterOptions filterOptions = new ContentFilterOptions();

// prompt
filterOptions.PromptMaxAllowedSeverityLevel.Violent = SeverityLevel.Minimum;
filterOptions.PromptMaxAllowedSeverityLevel.Hate = SeverityLevel.Low;
filterOptions.PromptMaxAllowedSeverityLevel.SelfHarm = SeverityLevel.Medium;
filterOptions.PromptMaxAllowedSeverityLevel.Sexual = SeverityLevel.High;

// response
filterOptions.ResponseMaxAllowedSeverityLevel.Violent = SeverityLevel.Medium;

// image
filterOptions.ImageMaxAllowedSeverityLevel.AdultContentLevel = SeverityLevel.Medium;
filterOptions.ImageMaxAllowedSeverityLevel.RacyContentLevel = SeverityLevel.Medium;

options.ContentFilterOptions = filterOptions;

var result = await languageModel.GenerateResponseAsync(prompt, options);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Temperature` | `float` | How random (explorative) or conservative (deterministic) a response should be. |
| `TopK` | `int` | Maximum number of highest-probability tokens considered for a response. |
| `TopP` | `float` | Probability threshold used to select a response from the smallest possible set of tokens. |
| `ContentFilterOptions` | `ContentFilterOptions` | Filtering severity levels for prompt/response/image content categories. |
| `LowRankAdapter` | `LanguageModelLowRankAdapter` | Optional trained LoRA adapter applied during generation. |

`ContentFilterOptions` harm categories (each exposed as `TextContentFilterSeverity`/`ImageContentFilterSeverity` with a `SeverityLevel`):

| Category | API name | Description |
|------|------|-------------|
| Hate | `HateContentSeverity` | Discriminatory language referencing a person or identity group. |
| Sexual | `SexualContentSeverity` | Content about anatomical organs, sexual acts, or sexual assault. |
| Violence | `ViolentContentSeverity` | Content about physical harm, weapons, or killing. |
| Self harm | `SelfHarmContentSeverity` | Content about self-injury or suicide. |

`SeverityLevel` values: `high` content (severity 3+) is always blocked and cannot be allowed; `medium` (the default) allows severity 0-3; `low` further restricts to severity 0-1.

## Notes

- Namespace: `Microsoft.Windows.AI.Text` for `LanguageModelOptions`; `Microsoft.Windows.AI.ContentSafety` for `ContentFilterOptions`, `TextContentFilterSeverity`, `ImageContentFilterSeverity`, `SeverityLevel`.
- Content moderation applies to both generative Phi Silica calls and the Imaging APIs (`ImageDescriptionGenerator.DescribeAsync` accepts a `ContentFilterOptions` too). Design mirrors Azure AI Content Safety harm categories.
- Callers of Windows AI APIs are responsible for their own abuse monitoring and related obligations.
- Passing a `null` `ContentFilterOptions` uses the default (`medium`) severity thresholds.

## Related

- [LanguageModel](./language-model.md)
- [Content moderation](./content-moderation.md)
- [Phi Silica LoRA fine-tuning](./phi-silica-lora.md)
- [Generate structured JSON output with Phi Silica](./phi-silica-structured-output.md)
- [Language Model best practices](./language-model-best-practices.md)
