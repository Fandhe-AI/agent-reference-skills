# ImageObjectRemover

Removes objects from an image (Object Erase). Takes an image and a greyscale mask indicating the object to remove, erases the masked area, and replaces it with the reconstructed image background.

## Signature / Usage

```csharp
using Microsoft.Graphics.Imaging;
using Microsoft.Windows.AI;
using Microsoft.Windows.AI.Imaging;
using Windows.Graphics.Imaging;

if (ImageObjectRemover.GetReadyState() == AIFeatureReadyState.NotReady)
{
    var result = await ImageObjectRemover.EnsureReadyAsync();
    if (result.Status != AIFeatureReadyResultState.Success)
    {
        throw result.ExtendedError;
    }
}
ImageObjectRemover imageObjectRemover = await ImageObjectRemover.CreateAsync();
SoftwareBitmap finalImage = imageObjectRemover.RemoveFromSoftwareBitmap(imageBitmap, maskBitmap);
```

## Options / Props

| Member | Description |
|------|-------------|
| `CreateAsync()` | Asynchronously creates a new `ImageObjectRemover` instance. |
| `GetReadyState()` / `EnsureReadyAsync()` | Static readiness check and model install. |
| `RemoveFromSoftwareBitmap(SoftwareBitmap image, SoftwareBitmap mask)` | Erases the masked area from `image` and returns the result. |

## Notes

- Namespace: `Microsoft.Windows.AI.Imaging`. Shipped as **Object Erase** starting Windows App SDK 1.8.
- The mask must be in Gray8 format with each pixel of the area to remove set to 255 and all other pixels set to 0 — typically produced by `ImageObjectExtractor.GetSoftwareBitmapObjectMask` or `ImageForegroundExtractor.GetMaskFromSoftwareBitmap`.
- Requires NPU hardware (Copilot+ PC). Apps must be packaged as MSIX with the `systemAIModels` capability declared in `Package.appxmanifest`.

## Related

- [ImageObjectExtractor](./image-object-extractor.md)
- [ImageForegroundExtractor](./image-foreground-extractor.md)
