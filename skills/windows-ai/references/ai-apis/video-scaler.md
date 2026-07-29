# VideoScaler

An AI-based video upscaling technology (Video Super Resolution / VSR) that upsamples video frames in real time, restoring sharpness and detail lost to bandwidth limits, poor network conditions, or compression — targeted at video calls, conferencing, and short-form video of people speaking. Distinct from `ImageScaler` (Image Super Resolution), which operates on a single `SoftwareBitmap` rather than a real-time video stream.

## Signature / Usage

```csharp
using Microsoft.Windows.AI;
using Microsoft.Windows.AI.MachineLearning;
using Microsoft.Windows.AI.Video;

var catalog = ExecutionProviderCatalog.GetDefault();
await catalog.EnsureAndRegisterCertifiedAsync();

var readyState = VideoScaler.GetReadyState();
if (readyState == AIFeatureReadyState.NotReady)
{
    var operation = await VideoScaler.EnsureReadyAsync();
    if (operation.Status != AIFeatureReadyResultState.Success)
    {
        throw new Exception("Video Scaler is not available.");
    }
}

VideoScaler videoScaler = await VideoScaler.CreateAsync();

var result = videoScaler.Scale(inputD3dSurface, outputD3dSurface, new VideoScalerOptions());
if (result.Status == VideoScalerStatus.Success)
{
    // outputD3dSurface now contains the upscaled frame
}
```

## Options / Props

| Member | Description |
|------|-------------|
| `ExecutionProviderCatalog.GetDefault()` / `.EnsureAndRegisterCertifiedAsync()` | Must be called before `GetReadyState()` to load the available execution providers — a prerequisite step not required by other `ai-apis` classes. |
| `CreateAsync()` | Asynchronously creates a new `VideoScaler` instance. |
| `GetReadyState()` / `EnsureReadyAsync()` | Static readiness check and model install, same pattern as other Windows AI APIs. |
| `Scale(Direct3DSurface input, Direct3DSurface output, VideoScalerOptions)` | Upscales a `Direct3DSurface`-backed frame (typically from a `VideoFrame`) in place into `output`. Returns a result with `.Status` (`VideoScalerStatus`). |
| `ScaleImageBuffer(ImageBuffer input, ImageBuffer output, VideoScalerOptions)` | Upscales an `ImageBuffer`-backed frame; requires `Bgr8`-format input/output. Less performant than `Scale` — provided for experimentation without a camera/Direct3D pipeline. |

| Attribute | Supported content |
|------|-------------|
| Input resolution | 240p – 1440p |
| Output resolution | 480p – 1440p (4K for offline processing) |
| Frame rate | 15 – 60 fps |
| Input pixel format | BGR (`ImageBuffer` API), NV12 (Direct3D API) |
| Output pixel format | BGR (`ImageBuffer` API), BGRA and NV12 (Direct3D API) |

## Notes

- Namespace: `Microsoft.Windows.AI.Video`. Distinct from `ImageScaler` (`Microsoft.Windows.AI.Imaging`, Image Super Resolution) — `VideoScaler` targets real-time video frames (`VideoFrame`/`Direct3DSurface`), `ImageScaler` targets a single `SoftwareBitmap`.
- Supported hardware: NPU (Copilot+ PC) and CPU; **not supported on GPU**. Hardware selection is automatic. Model ships preinstalled as part of the Windows App SDK — no first-run download/consent step.
- For a good CPU experience, target 4+ physical cores, 3 GHz+ base clock, 32 MB+ L3 cache; `GetReadyState` only confirms support, so also run a CPU-capability check (e.g. via WMI `Win32_Processor`) to decide between VSR and a lightweight fallback on borderline hardware.
- Not recommended for sensitive content where upscaling could alter identity/facial features (e.g. medical imaging, legal/forensic evidence, identity verification).

## Related

- [Device requirements and fallback](./device-requirements.md)
- [ImageScaler](./image-scaler.md)
