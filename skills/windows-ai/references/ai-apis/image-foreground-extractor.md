# ImageForegroundExtractor

Segments the foreground of an input image, enabling background removal and sticker generation.

## Signature / Usage

```csharp
using Microsoft.Windows.AI.Imaging;
using Microsoft.Windows.AI;

if (ImageForegroundExtractor.GetReadyState() == AIFeatureReadyState.NotReady)
{
    var result = await ImageForegroundExtractor.EnsureReadyAsync();
    if (result.Status != AIFeatureReadyResultState.Success)
    {
        throw result.ExtendedError;
    }
}

var model = await ImageForegroundExtractor.CreateAsync();

// Insert your own softwareBitmap here.
var foregroundMask = model.GetMaskFromSoftwareBitmap(softwareBitmap);
```

## Options / Props

| Member | Description |
|------|-------------|
| `CreateAsync()` | Asynchronously creates a new `ImageForegroundExtractor` instance. |
| `GetReadyState()` / `EnsureReadyAsync()` | Static readiness check and model install. |
| `GetMaskFromSoftwareBitmap(SoftwareBitmap)` | Returns a greyscale-8 mask; 0 = background, 255 = foreground, intermediate values indicate a blend. |

## Notes

- Namespace: `Microsoft.Windows.AI.Imaging`. Distinct from `ImageObjectExtractor`, which extracts a specific hinted object rather than the whole foreground/background split.
- Requires NPU hardware (Copilot+ PC). Apps must be packaged as MSIX with the `systemAIModels` capability declared in `Package.appxmanifest`.

## Related

- [ImageObjectExtractor](./image-object-extractor.md)
- [ImageObjectRemover](./image-object-remover.md)
