# Custom video/audio effects (IBasicVideoEffect / IBasicAudioEffect)

Interfaces for implementing custom, real-time effects that operate on individual video or audio frames as they pass through `MediaCapture`, `MediaComposition`/`MediaClip`, or `MediaTranscoder` pipelines. A class implementing `IBasicVideoEffect` (or the audio equivalent `IBasicAudioEffect`) must be hosted in a separate Windows Runtime component project, not the app project directly.

## Signature / Usage

```csharp
// Windows Runtime component project
public sealed class ExampleVideoEffect : IBasicVideoEffect
{
    private VideoEncodingProperties encodingProperties;
    private IPropertySet configuration;

    public void SetEncodingProperties(VideoEncodingProperties encodingProperties, IDirect3DDevice device)
        => this.encodingProperties = encodingProperties;

    public void SetProperties(IPropertySet configuration) => this.configuration = configuration;

    public IReadOnlyList<VideoEncodingProperties> SupportedEncodingProperties
        => new List<VideoEncodingProperties> { new VideoEncodingProperties { Subtype = "ARGB32" } };

    public MediaMemoryTypes SupportedMemoryTypes => MediaMemoryTypes.Cpu; // or .Gpu
    public bool TimeIndependent => true;
    public bool IsReadOnly => false;

    public void ProcessFrame(ProcessVideoFrameContext context)
    {
        // Read context.InputFrame.SoftwareBitmap / .Direct3DSurface,
        // write to context.OutputFrame accordingly.
    }

    public void DiscardQueuedFrames() { }
    public void Close(MediaEffectClosedReason reason) { }
}

// Consuming app: add the effect to a MediaCapture preview/record stream
var videoEffectDefinition = new VideoEffectDefinition("VideoEffectComponent.ExampleVideoEffect");
IMediaExtension videoEffect = await mediaCapture.AddVideoEffectAsync(videoEffectDefinition, MediaStreamType.VideoPreview);
videoEffect.SetProperties(new PropertySet { { "FadeValue", .25 } });
await mediaCapture.StartPreviewAsync();

// Or add the effect to a MediaClip inside a MediaComposition
var clip = await MediaClip.CreateFromFileAsync(pickedFile);
clip.VideoEffectDefinitions.Add(new VideoEffectDefinition("VideoEffectComponent.ExampleVideoEffect"));
```

## Options / Props

| Member | Type | Description |
|------|------|-------------|
| `SetEncodingProperties(VideoEncodingProperties, IDirect3DDevice)` | method | Called once with the stream's encoding properties and the Direct3D device used for GPU processing. |
| `SetProperties(IPropertySet)` | method (from `IMediaExtension`) | Receives app-supplied configuration values (e.g. effect parameters) as a property bag. |
| `SupportedEncodingProperties` | `IReadOnlyList<VideoEncodingProperties>` | Encoding formats the effect accepts; empty list defaults to ARGB32. |
| `SupportedMemoryTypes` | `MediaMemoryTypes` | `Cpu` (SoftwareBitmap), `Gpu` (IDirect3DSurface), or `GpuAndCpu` (check which is populated in `ProcessFrame`). |
| `TimeIndependent` | `bool` | `true` lets the system apply performance optimizations when the effect doesn't need uniform frame timing. |
| `IsReadOnly` | `bool` | `true` if the effect only analyzes frames without modifying them; the system copies input to output automatically. |
| `ProcessFrame(ProcessVideoFrameContext)` | method | Called once per frame; contains `InputFrame`/`OutputFrame` `VideoFrame` objects to read/write image data. |
| `DiscardQueuedFrames()` | method | Called when the effect should reset any accumulated per-frame state. |
| `Close(MediaEffectClosedReason)` | method | Called when the effect is shutting down (normal, error, or unsupported format); dispose resources here. |
| `MediaCapture.AddVideoEffectAsync(VideoEffectDefinition, MediaStreamType)` | `Task<IMediaExtension>` | Adds the effect to a camera preview or record stream. |
| `MediaClip.VideoEffectDefinitions` | collection | Adds effects to a clip inside a `MediaComposition`. |

## Notes

- Namespace: `Windows.Media.Effects` (`IBasicVideoEffect`, `IBasicAudioEffect`, `VideoEffectDefinition`, `AudioEffectDefinition`, `ProcessVideoFrameContext`, `MediaMemoryTypes`, `MediaEffectClosedReason`). The audio counterpart `IBasicAudioEffect` follows the same lifecycle (`SetProperties`/`ProcessFrame`-equivalent `ProcessAudio`/`Close`/`DiscardQueuedFrames`) but works with `AudioFrame` buffers instead of video frames.
- The effect class cannot live in the app project directly — it must be defined in a separate Windows Runtime Component project and referenced from the app.
- GPU-memory processing (`SupportedMemoryTypes.Gpu`) typically uses the Win2D API (`Microsoft.Graphics.Canvas.Effects`) to operate on `IDirect3DSurface` via a `CanvasDevice` created from the `IDirect3DDevice` passed to `SetEncodingProperties`.
- Effects can be attached at three levels: a live `MediaCapture` stream (`AddVideoEffectAsync`), a `MediaClip.VideoEffectDefinitions` for offline composition/editing, or a `MediaTranscoder` (`AddVideoEffect`/`AddAudioEffect`) for transcode-time processing.

## Related

- [MediaTranscoder](./media-transcoder.md)
- [MediaClip](./media-clip.md)
- [MediaComposition](./media-composition.md)
- [MediaCapture integration](./media-capture-integration.md)
