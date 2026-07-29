# VariablePhotoSequence

Captures multiple photo frames in rapid succession, with per-frame control over focus, flash, ISO speed, exposure, and exposure compensation. Used to implement custom multi-frame algorithms (e.g. a custom HDR composite) when the built-in `AdvancedPhotoCapture` HDR mode isn't sufficient.

## Signature / Usage

```csharp
VariablePhotoSequenceCapture m_photoSequenceCapture;
SoftwareBitmap[] m_images;
CapturedFrameControlValues[] m_frameControlValues;
int m_photoIndex;

var controller = mediaCapture.VideoDeviceController.VariablePhotoSequenceController;
if (!controller.Supported) return;

// Configure per-frame exposure compensation for 3 frames
var frame0 = new FrameController();
var frame1 = new FrameController();
var frame2 = new FrameController();
frame0.ExposureCompensationControl.Value = -1.0f;
frame1.ExposureCompensationControl.Value = 0.0f;
frame2.ExposureCompensationControl.Value = 1.0f;

controller.DesiredFrameControllers.Clear();
controller.DesiredFrameControllers.Add(frame0);
controller.DesiredFrameControllers.Add(frame1);
controller.DesiredFrameControllers.Add(frame2);

m_photoSequenceCapture = await mediaCapture.PrepareVariablePhotoSequenceCaptureAsync(ImageEncodingProperties.CreateJpeg());
m_photoSequenceCapture.PhotoCaptured += (s, args) =>
{
    m_images[m_photoIndex] = args.Frame.SoftwareBitmap;
    m_frameControlValues[m_photoIndex] = args.CapturedFrameControlValues;
    m_photoIndex++;
};
m_photoSequenceCapture.Stopped += (s, e) => { /* all frames captured; run post-processing */ };

m_images = new SoftwareBitmap[3];
m_frameControlValues = new CapturedFrameControlValues[3];
m_photoIndex = 0;
await m_photoSequenceCapture.StartAsync();

// Later, when done:
await m_photoSequenceCapture.FinishAsync();
```

## Options / Props

| Name | Description |
|------|-------------|
| `VideoDeviceController.VariablePhotoSequenceController` | Gets the `VariablePhotoSequenceController`; check its `Supported` property before use. |
| `VariablePhotoSequenceController.FrameCapabilities` | A `FrameControlCapabilities` object describing which per-frame settings the device supports: `Exposure`, `ExposureCompensation`, `Flash`, `Focus`, `IsoSpeed`, and the boolean `PhotoConfirmationSupported`. |
| `VariablePhotoSequenceController.DesiredFrameControllers` | Collection of `FrameController` objects, one per frame to capture; each frame's controls (e.g. `ExposureCompensationControl.Value`, `FlashControl.Mode`/`.PowerPercent`) can be set independently. |
| `MediaCapture.PrepareVariablePhotoSequenceCaptureAsync(ImageEncodingProperties)` | Instance method on `MediaCapture`; returns a configured `VariablePhotoSequenceCapture`. |
| `VariablePhotoSequenceCapture.StartAsync()` | Begins capturing the configured sequence of frames. |
| `VariablePhotoSequenceCapture.PhotoCaptured` | Event raised once per captured frame, with `VariablePhotoCapturedEventArgs.Frame` (a `CapturedFrame`, exposing `.SoftwareBitmap`) and `.CapturedFrameControlValues`. |
| `VariablePhotoSequenceCapture.Stopped` | Event raised once all frames in the sequence have been captured. |
| `VariablePhotoSequenceCapture.FinishAsync()` | Releases the object and its resources. |

## Notes

- Namespace: `Windows.Media.Capture.Core` (`VariablePhotoSequenceCapture`); `VariablePhotoSequenceController`, `FrameController`, and `FrameControlCapabilities` are in `Windows.Media.Devices.Core`.
- Update your UI to disable starting another capture while a sequence is in progress (on `StartAsync`), and re-enable it only once `Stopped` fires (all frames in the sequence have been captured).
- Frame controllers can be reused across multiple sequence captures: clear and re-add `DesiredFrameControllers`, or mutate the existing controller objects' properties, without fully reinitializing `VariablePhotoSequenceCapture`.
- For built-in HDR compositing without implementing a custom algorithm, prefer `AdvancedPhotoCapture` with `AdvancedPhotoMode.Hdr`; use `VariablePhotoSequence` when you need a custom per-frame processing pipeline (e.g. a custom HDR blend).

## Related

- [AdvancedPhotoCapture](./advanced-photo-capture.md)
- [SoftwareBitmap](./software-bitmap.md)
- [MediaCapture](./media-capture.md)
