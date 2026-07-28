# Content moderation with Windows AI APIs

Windows AI APIs such as Phi Silica and the Imaging APIs use content moderation to classify and filter potentially harmful content in user prompts and in model-generated responses. Moderation is on by default and configurable via `ContentFilterOptions`.

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
Console.WriteLine(result.Text);
```

## Options / Props

| Category | API name | Description |
|------|------|-------------|
| Hate | `HateContentSeverity` | Discriminatory language referencing a person or identity group. |
| Sexual | `SexualContentSeverity` | Content about anatomical organs, sexual acts, or sexual assault. |
| Violence | `ViolentContentSeverity` | Content about physical harm, weapons, or killing. |
| Self harm | `SelfHarmContentSeverity` | Content about self-injury or suicide. |

Severity level ceilings (`SeverityLevel`):

| Level | Effect |
|------|-------------|
| `high` | Not available — severity-3+ content is always blocked regardless of setting. |
| `medium` | Default. Content classified severity 0-3 is returned. |
| `low` | Stricter. Only content classified severity 0-1 is returned. |

## Notes

- Namespace: `Microsoft.Windows.AI.ContentSafety`. Classes: `ContentFilterOptions`, `TextContentFilterSeverity`, `ImageContentFilterSeverity`. Enum: `SeverityLevel`.
- Design mirrors [Azure AI Content Safety](https://learn.microsoft.com/en-us/azure/ai-services/content-safety/overview) harm categories and severity scales.
- Pass `ContentFilterOptions` via `LanguageModelOptions.ContentFilterOptions` for `LanguageModel.GenerateResponseAsync`, or directly to `ImageDescriptionGenerator.DescribeAsync` for imaging APIs.
- Callers of Windows AI APIs are responsible for their own abuse monitoring and related legal obligations.

## Related

- [LanguageModelOptions and ContentFilterOptions](./language-model-options.md)
- [LanguageModel](./language-model.md)
- [ImageDescriptionGenerator](./image-description-generator.md)
- [Responsible AI guidelines](./responsible-ai.md)
