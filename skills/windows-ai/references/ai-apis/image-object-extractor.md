# ImageObjectExtractor

Identifies a specific object within an image using point and/or rectangle "hints", returning a greyscale mask of the identified object.

## Signature / Usage

```csharp
using Microsoft.Graphics.Imaging;
using Microsoft.Windows.AI;
using Microsoft.Windows.AI.Imaging;
using Windows.Graphics;
using Windows.Graphics.Imaging;

if (ImageObjectExtractor.GetReadyState() == AIFeatureReadyState.NotReady)
{
    var result = await ImageObjectExtractor.EnsureReadyAsync();
    if (result.Status != AIFeatureReadyResultState.Success)
    {
        throw result.ExtendedError;
    }
}

ImageObjectExtractor imageObjectExtractor = await ImageObjectExtractor.CreateWithSoftwareBitmapAsync(softwareBitmap);

ImageObjectExtractorHint hint = new ImageObjectExtractorHint(
    includeRects: null,
    includePoints: new List<PointInt32> { new PointInt32(306, 212), new PointInt32(216, 336) },
    excludePoints: null);
SoftwareBitmap finalImage = imageObjectExtractor.GetSoftwareBitmapObjectMask(hint);
```

## Options / Props

| Member | Description |
|------|-------------|
| `CreateWithSoftwareBitmapAsync(SoftwareBitmap)` | Creates an `ImageObjectExtractor` for the given source image. |
| `GetReadyState()` / `EnsureReadyAsync()` | Static readiness check and model install. |
| `GetSoftwareBitmapObjectMask(ImageObjectExtractorHint)` | Returns a greyscale-8 mask (255 = identified object pixel, 0 = other) for the given hint. |
| `ImageObjectExtractorHint(includeRects, includePoints, excludePoints)` | Constructor taking coordinate hints: points that belong to the target object, points that don't, and/or a bounding rectangle. |

## Notes

- Namespace: `Microsoft.Windows.AI.Imaging`. Distinct from `ImageForegroundExtractor`, which segments the whole foreground/background of an image (used for background removal / sticker generation) rather than an arbitrary hinted object.
- Hint guidelines: avoid multiple rectangles (produces inaccurate masks); avoid exclude-only points without include points/rectangle; max 32 coordinates total (1 per point, 2 per rectangle) or the call errors.
- Requires NPU hardware (Copilot+ PC). Apps must be packaged as MSIX with the `systemAIModels` capability.

## Related

- [ImageForegroundExtractor](./image-foreground-extractor.md)
- [ImageObjectRemover](./image-object-remover.md)
- [Device requirements and fallback](./device-requirements.md)
