# ImageDescriptionGenerator

Generates a natural-language text description for the content of an image, in one of several formats (brief, detailed, diagram, accessible).

## Signature / Usage

```csharp
using Microsoft.Graphics.Imaging;
using Microsoft.Windows.AI;
using Microsoft.Windows.AI.ContentSafety;
using Microsoft.Windows.AI.Imaging;
using Windows.Graphics.Imaging;

if (ImageDescriptionGenerator.GetReadyState() == AIFeatureReadyState.NotReady)
{
    var result = await ImageDescriptionGenerator.EnsureReadyAsync();
    if (result.Status != AIFeatureReadyResultState.Success)
    {
        throw result.ExtendedError;
    }
}

ImageDescriptionGenerator imageDescriptionGenerator = await ImageDescriptionGenerator.CreateAsync();

ImageBuffer inputImage = ImageBuffer.CreateForSoftwareBitmap(softwareBitmap);

ContentFilterOptions filterOptions = new ContentFilterOptions();
filterOptions.PromptMaxAllowedSeverityLevel.Violent = SeverityLevel.Medium;
filterOptions.ResponseMaxAllowedSeverityLevel.Violent = SeverityLevel.Medium;

ImageDescriptionResult imageDescriptionResult =
    await imageDescriptionGenerator.DescribeAsync(inputImage, ImageDescriptionKind.BriefDescription, filterOptions);
string response = imageDescriptionResult.Description;
```

## Options / Props

| Member | Description |
|------|-------------|
| `CreateAsync()` | Asynchronously creates a new `ImageDescriptionGenerator` instance. |
| `GetReadyState()` / `EnsureReadyAsync()` | Static readiness check and model install. |
| `DescribeAsync(ImageBuffer, ImageDescriptionKind, ContentFilterOptions)` | Generates a description; `ImageDescriptionKind` and `ContentFilterOptions` are optional (pass `null` for defaults). |
| `ImageDescriptionResult.Description` | The generated description text. |
| `ImageDescriptionResult` status | `ImageDescriptionResultStatus` reports the outcome state. |

`ImageDescriptionKind` values:

| Value | Description |
|------|-------------|
| `BriefDescription` | Short caption-style description (default). |
| `DetailedDescription` | Long-form description. |
| `DiagramDescription` | Description suited for charts/diagrams. |
| `AccessibleDescription` | Long description with accessibility-oriented detail. |

## Notes

- Namespace: `Microsoft.Windows.AI.Imaging` (`ImageDescriptionGenerator`, `ImageDescriptionResult`, `ImageDescriptionKind`, `ImageDescriptionResultStatus`).
- Input must be an `ImageBuffer` — `SoftwareBitmap` is not directly supported; convert with `ImageBuffer.CreateForSoftwareBitmap`.
- Not recommended for images where inaccurate descriptions could be controversial (flags, maps, cultural/religious symbols) or where accuracy is critical (medical, legal, financial content).
- Image Description is not available in China.
- Requires NPU hardware (Copilot+ PC). Apps must be packaged as MSIX with the `systemAIModels` capability declared in `Package.appxmanifest`.

## Related

- [Content moderation](./content-moderation.md)
- [ImageObjectExtractor](./image-object-extractor.md)
