# ImageScaler

Resizes an image and increases or decreases its resolution (Image Super Resolution), scaling and sharpening images up to 8x their original size while maintaining quality.

## Signature / Usage

```csharp
using Microsoft.Graphics.Imaging;
using Microsoft.Windows.AI;
using Microsoft.Windows.AI.Imaging;
using Windows.Graphics.Imaging;

if (ImageScaler.GetReadyState() == AIFeatureReadyState.NotReady)
{
    var result = await ImageScaler.EnsureReadyAsync();
    if (result.Status != AIFeatureReadyResultState.Success)
    {
        throw result.ExtendedError;
    }
}
ImageScaler imageScaler = await ImageScaler.CreateAsync();
SoftwareBitmap finalImage = imageScaler.ScaleSoftwareBitmap(softwareBitmap, targetWidth, targetHeight);
```

## Options / Props

| Member | Description |
|------|-------------|
| `CreateAsync()` | Asynchronously creates a new `ImageScaler` instance. |
| `GetReadyState()` / `EnsureReadyAsync()` | Static readiness check and model install. |
| `ScaleSoftwareBitmap(SoftwareBitmap, int targetWidth, int targetHeight)` | Returns a sharpened, scaled `SoftwareBitmap`. To sharpen without scaling, pass the existing width/height. |

## Notes

- Namespace: `Microsoft.Windows.AI.Imaging`.
- Scaling is limited to a maximum factor of 8x; requesting a larger final width or height throws an exception.
- Requires NPU hardware (Copilot+ PC); no GPU/CPU fallback currently.
- Apps must be packaged as MSIX with the `systemAIModels` capability declared in `Package.appxmanifest`, and `MaxVersionTested` set to `10.0.26226.0` or later.

## Related

- [Device requirements and fallback](./device-requirements.md)
- [ImageObjectExtractor](./image-object-extractor.md)
