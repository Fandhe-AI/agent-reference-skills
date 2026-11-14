# VideoScaler

An AI-based video upscaling technology (Video Super Resolution / VSR) that upsamples video frames in real time, restoring sharpness and detail lost to bandwidth limits, poor network conditions, or compression — targeted at video calls, conferencing, and short-form video of people speaking. Distinct from `ImageScaler` (Image Super Resolution), which operates on a single `SoftwareBitmap` rather than a real-time video stream.

## Signature / Usage

```csharp
using Microsoft.Windows.AI.Video;

private VideoScaler? _videoScaler;

protected override async Task LoadModelAsync(SampleNavigationParameters sampleParams)
{
    try
    {
        _videoScaler = await VideoScaler.CreateAsync();
    }
    catch (Exception ex)
    {
        ShowException(ex, "Failed to create the video scaler.");
    }
    finally
    {
        sampleParams.NotifyCompletion();
    }
}
```

Scale one frame (experimental contract version 2 creation and color options):

```csharp
using Microsoft.Windows.AI.Video;

try
{
    using var scaler = await VideoScaler.CreateAsync(new VideoScalerCreationOptions
    {
        Scenario = VideoScalerScenario.FaceFocused,
        ExecutionDevice = VideoScalerExecutionDevice.Automatic,
        QualityPreference = VideoScalerQualityPreference.Automatic
    });

    var frameOptions = new VideoScalerOptions
    {
        InputColorRange = VideoColorRange.Limited,
        InputColorMatrix = VideoColorMatrix.Bt709
    };

    var result = scaler.Scale(inputD3dSurface, outputD3dSurface, frameOptions);
    if (result.Status != VideoScalerStatus.Success)
    {
        System.Diagnostics.Debug.WriteLine($"Frame failed: {result.Status}");
        return;
    }
}
catch (Exception ex)
{
    System.Diagnostics.Debug.WriteLine($"VideoScaler failed: {ex.Message}");
}
```

## Options / Props

| Member | Description |
|------|-------------|
| `CreateAsync()` | Asynchronously creates a `VideoScaler` using `FaceFocused` with automatic device and quality selection. |
| `CreateAsync(VideoScalerCreationOptions)` | Experimental contract version 2. Creates a session with explicit device, scenario, and quality. Null options use the defaults. |
| `GetReadyState()` / `EnsureReadyAsync()` | Optional capability checks, not prerequisites for creation. They don't download models, prepare a requested device, or guarantee that creation or frame processing succeeds. |
| `Scale(Direct3DSurface input, Direct3DSurface output, VideoScalerOptions)` | Processes D3D11 surface frames (typically from a `VideoFrame`). Returns a `VideoScalerResult` with `.Status`. |
| `ScaleImageBuffer(ImageBuffer input, ImageBuffer output, VideoScalerOptions)` | Processes `ImageBuffer` frames (BGR8). |
| `VideoScalerOptions.RegionsOfInterest` | Input-coordinate rectangles with positive sizes that fit entirely inside the input frame. Empty means full-frame; invalid regions are rejected, not clipped. |

`VideoScalerCreationOptions` (all optional):

| Property | Values | Default | Description |
|------|------|------|-------------|
| `ExecutionDevice` | `Automatic`, `Npu`, `Gpu`, `Cpu` | `Automatic` | Automatic permits initialization fallback; an explicit request uses that device or fails. |
| `Scenario` | `FaceFocused`, `TextFocused`, `Gaming`, `Stabilization` | `FaceFocused` | One processing scenario per instance. |
| `QualityPreference` | `Automatic`, `FavorPerformance`, `FavorQuality` | `Automatic` | Favor speed or visual quality; doesn't guarantee a particular model, output, or frame rate. |

`VideoScalerOptions` color properties (NV12 input):

| Property | Values | Default | Description |
|------|------|------|-------------|
| `InputColorRange` | `Full`, `Limited` | `Full` | Quantization range of the NV12 input. |
| `InputColorMatrix` | `Bt601`, `Bt709` | `Bt601` | YUV-to-RGB conversion matrix of the NV12 input. |

Models and device support:

| Model | Description | Automatic device order | Other device requests |
|------|-------------|------|------|
| FaceFocused / Talking Head | Enhances facial details captured during video calls, efficient for real-time use. | NPU, GPU, CPU | Explicit NPU/GPU/CPU supported when eligible |
| TextFocused | Improves clarity of camera-captured text and fine edges. | GPU, CPU | NPU unsupported |
| Gaming SR | Enhances lower-resolution game streams on the viewer's device (`Gaming`). | GPU only | CPU/NPU unsupported |
| Stabilization | Reduces unwanted camera movement for steadier real-time video. | CPU only | GPU/NPU unsupported |

Face-focused resolution and frame-rate guidance:

| Attribute | Supported content |
|------|-------------|
| Input resolution | 240p – 1440p |
| Output resolution | 480p – 1440p (4K for offline video processing) |
| Frame rate | 15 – 60 fps |
| Input pixel format | RGB/BGR (`ScaleImageBuffer`), NV12 (`Scale`) |
| Output pixel format | RGB/BGR (`ScaleImageBuffer`), NV12 or supported BGRA/BGRX (`Scale`) |

`VideoScalerStatus` values returned per frame:

| Status | Meaning |
|------|-------------|
| `Success` | Processing completed successfully. |
| `InvalidInputFormat` | The input format or surface isn't accepted. |
| `InvalidOutputFormat` | The output format or surface isn't accepted. |
| `InvalidPlaneSize` | Dimensions, layout, stride, or capacity are invalid. |
| `InvalidFrameData` | Frame data is missing or invalid, including invalid regions of interest. |
| `ModelNotAvailable` | The processing implementation is unavailable. |
| `OutOfMemory` | Memory is insufficient. |
| `Failure` | Another processing failure occurred. |

## Notes

- Namespace: `Microsoft.Windows.AI.Video`. Distinct from `ImageScaler` (`Microsoft.Windows.AI.Imaging`, Image Super Resolution) — `VideoScaler` targets real-time video frames (`VideoFrame`/`Direct3DSurface`), `ImageScaler` targets a single `SoftwareBitmap`.
- The creation-options overload, explicit scenario/device/quality options, and input color properties belong to the experimental contract version 2 surface and aren't present in every older or stable Windows App SDK release. Check the API reference and release notes for your SDK package; presence in development sources doesn't establish availability in a published SDK.
- Hardware: NPU (Copilot+ PC) and CPU are available; GPU is an experimental device option (request `Gpu` via `VideoScalerCreationOptions.ExecutionDevice`). Hardware selection is automatic by default and doesn't guarantee NPU execution. The app uses the SDK's deployment model for runtime and model assets; `VideoScaler` doesn't accept application-supplied model filenames.
- Recommended CPU specs (recommendations, not hard minimums): 4+ physical cores, 3 GHz+ base clock, 32 MB+ L3 cache. The CPU check (for example WMI `Win32_Processor`, `MaxClockSpeed` is the rated base clock, cache the result) guides UX choices; it is not an API eligibility test.
- Each instance processes one scenario; changing the creation-options object afterward doesn't reconfigure it. Stabilization is CPU-only, requires full-frame processing with dimensions of at least 32 pixels per side, and keeps frame history, so use one ordered stream per instance.
- `Scale` and `ScaleImageBuffer` are synchronous. Prefer `Scale` when frames already reside in D3D11 textures. Use different input and output textures; NV12 dimensions must be even; output surfaces must be writable; mip chains, texture arrays, and multisampling aren't supported; BGRA output is opaque.
- NV12 output inherits the declared input range and matrix; RGB-family output is full-range. These options don't select output color, HDR transfer functions, or gamut conversion.
- Frame calls can raise exceptions as well as return statuses. A frame failure doesn't automatically switch the instance to another device. Dispose or close the scaler when the stream finishes; calls after `Close()`/`Dispose()` are rejected.
- Not recommended for sensitive content where upscaling could alter identity/facial features (e.g. medical imaging, legal/forensic evidence, identity verification).
- Source: https://learn.microsoft.com/en-us/windows/ai/apis/video-super-resolution (retrieved 2026-11-14)

## Related

- [Device requirements and fallback](./device-requirements.md)
- [ImageScaler](./image-scaler.md)
