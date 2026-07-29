# ImageGenerator

A Stable-Diffusion-powered, on-device generative imaging model that creates and transforms images from natural-language prompts: text-to-image, image-to-image restyling, mask-based Magic Fill, and coloring-book-style generation. Distinct from `ImageDescriptionGenerator`/`ImageObjectExtractor`/`ImageObjectRemover`/`ImageScaler`, which analyze or edit existing images rather than generate new ones from a prompt.

## Signature / Usage

```csharp
using Microsoft.Windows.AI.Imaging;
using Microsoft.Graphics.Imaging;

var readyState = ImageGenerator.GetReadyState();
if (readyState != AIFeatureReadyState.Ready)
{
    var readyResult = await ImageGenerator.EnsureReadyAsync();
    if (readyResult.Status != AIFeatureReadyResultState.Success)
    {
        throw new Exception("Failed to prepare ImageGenerator models");
    }
}

using var generator = await ImageGenerator.CreateAsync();

var options = new ImageGenerationOptions
{
    MaxInferenceSteps = 6,
    Creativity = 0.8,
    Seed = 42
};

// Text-to-Image: synchronous call, no Async suffix
var result = generator.GenerateImageFromTextPrompt("A beautiful sunset over a mountain lake", options);
if (result.Status == ImageGeneratorResultStatus.Success)
{
    ImageBuffer imageBuffer = result.Image;
}
```

## Options / Props

| Member | Description |
|------|-------------|
| `CreateAsync()` | Asynchronously creates a new `ImageGenerator` instance. |
| `GetReadyState()` / `EnsureReadyAsync()` | Static readiness check and model install. Model is optional even on a Copilot+ PC (several GB, not preinstalled) and downloads on first `EnsureReadyAsync` call. |
| `GenerateImageFromTextPrompt(string prompt, ImageGenerationOptions[, ImageFromTextGenerationOptions])` | **Text-to-Image.** Synchronous — no `await`. The optional `ImageFromTextGenerationOptions.Style` (`ImageFromTextGenerationStyle`, e.g. `ColoringBook`) selects a generation style. |
| `GenerateImageFromImageBuffer(ImageBuffer input, string prompt, ImageGenerationOptions, ImageFromImageGenerationOptions)` | **Image-to-Image / Restyle.** Transforms `input` guided by `prompt`. `ImageFromImageGenerationOptions.Style` (`ImageFromImageGenerationStyle.Restyle`) and `.ColorPreservation` (`float`, range `[0.0, 1.0]`) control how much of the original structure/color is preserved. |
| `GenerateImageFromImageBufferAndMask(ImageBuffer input, ImageBuffer mask, string prompt, ImageGenerationOptions)` | **Magic Fill.** Fills the masked region of `input` (mask in `GRAY8` format) with content guided by `prompt`. |
| `ImageGenerationOptions` | `MaxInferenceSteps` (int), `Creativity` (double), `Seed` (int), `ContentFilterOptions` (`TextContentFilterSeverity`, `ImageContentFilterSeverity`). |
| Result (`ImageGeneratorResultStatus`) | All three generate methods return a result with `.Status` and `.Image` (`ImageBuffer`, `Microsoft.Graphics.Imaging`) on success. |

## Notes

- Namespace: `Microsoft.Windows.AI.Imaging`. Shipping since Windows App SDK 2.0 Experimental.
- Supported hardware: **NPU (Copilot+ PC) only** — not available on GPU or CPU.
- Requires Windows 11 version 24H2 (build 26100)+.
- Apps must be packaged as MSIX with the `systemAIModels` capability declared in `Package.appxmanifest`, and `MaxVersionTested` set to a recent Windows version (e.g. `10.0.26226.0`+).
- Provide Content Credentials (C2PA) for generated/modified images per Responsible AI guidance.

## Related

- [Device requirements and fallback](./device-requirements.md)
- [ImageDescriptionGenerator](./image-description-generator.md)
- [ImageObjectRemover](./image-object-remover.md)
- [Content moderation](./content-moderation.md)
