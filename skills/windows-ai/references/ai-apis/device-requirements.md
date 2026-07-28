# Device requirements and fallback (AIFeatureReadyState)

Windows AI APIs run their models locally. Before calling any API, apps must check readiness via `GetReadyState` and branch on the `AIFeatureReadyState` enum (`Microsoft.Windows.AI` namespace).

## Signature / Usage

```csharp
using Microsoft.Windows.AI;
using Microsoft.Windows.AI.Text;

var readyState = LanguageModel.GetReadyState();
if (readyState == AIFeatureReadyState.NotReady)
{
    var ensureResult = await LanguageModel.EnsureReadyAsync();
    if (ensureResult.Status != AIFeatureReadyResultState.Success)
    {
        throw ensureResult.ExtendedError;
    }
    readyState = LanguageModel.GetReadyState();
}

if (readyState != AIFeatureReadyState.Ready)
{
    throw new Exception($"LanguageModel is unavailable: {readyState}");
}

using LanguageModel languageModel = await LanguageModel.CreateAsync();
```

## Options / Props

| AIFeatureReadyState | Meaning | Recommended action |
|------|-------------|------|
| `Ready` | Model is installed and the device supports the API. | Call the API. |
| `NotReady` | Device supports the API, but the model needs to be downloaded/prepared. | Show a consent dialog (download size, network usage), then call `EnsureReadyAsync` and report progress. |
| `DisabledByUser` | The user disabled the required AI component. | Ask the user to enable it in Windows Settings, or hide/disable the feature. |
| `NotSupportedOnCurrentSystem` | The device cannot run this API (incompatible hardware, missing drivers, or policy). | Do **not** call `EnsureReadyAsync`. Hide/disable the feature, or fall back to an alternative implementation (e.g. a cloud AI service). |

## Notes

- Namespace: `Microsoft.Windows.AI` (Windows App SDK experimental channel). Classes: `AICapabilities`, `AIFeatureReadyResult`. Enums: `AICapabilityCategory`, `AIFeatureReadyResultState`, `AIFeatureReadyState`.
- On a **Copilot+ PC**, supported APIs always run on the **NPU**. GPU/CPU columns in the hardware support table describe expansion to non-Copilot+ devices — they are not alternative backends selectable on a Copilot+ PC.
- Hardware support varies per API: Phi Silica supports NPU + GPU (NVIDIA RTX 30-series+/AMD RX 9060-series+, 6+ GB vRAM, Developer Mode required); Text Recognition, Image Super Resolution, Image Description, Image Segmentation, Object Erase currently require **NPU only** (Copilot+ PC); Speech Recognition supports NPU + CPU; Video Super Resolution supports NPU + CPU.
- Model delivery differs per API: Phi Silica (NPU) and Video Super Resolution ship preinstalled; Phi Silica (GPU), AI Image Generation, and Speech Recognition (CPU) download on demand on first `EnsureReadyAsync` call and can be removed at **Settings > System > AI Components**.
- `GetReadyState` only tells you whether the API is *supported*; for APIs with recommended CPU specs (e.g. Video Super Resolution), also perform a CPU capability check to gate quality choices.
- Apps must be packaged as MSIX with the `systemAIModels` capability declared in `Package.appxmanifest`, and `MaxVersionTested` set to a recent Windows version (e.g. `10.0.26226.0`+), or calls fail with "Not declared by app" errors.
- Every generative/imaging API in this namespace follows the same `GetReadyState` / `EnsureReadyAsync` / `CreateAsync` pattern shown above (`LanguageModel`, `TextRecognizer`, `ImageScaler`, `ImageObjectExtractor`, `ImageForegroundExtractor`, `ImageObjectRemover`, `ImageDescriptionGenerator`).
- Phi Silica and Image Description are not available in China.

## Related

- [LanguageModel](./language-model.md)
- [TextRecognizer](./text-recognizer.md)
- [ImageScaler](./image-scaler.md)
