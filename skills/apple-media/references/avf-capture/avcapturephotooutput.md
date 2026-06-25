# AVCapturePhotoOutput

A capture output for still image, Live Photos, RAW, and bracketed photography workflows.

## Signature / Usage

```swift
let photoOutput = AVCapturePhotoOutput()
session.addOutput(photoOutput)

// Enable features before startRunning()
photoOutput.isLivePhotoCaptureEnabled = photoOutput.isLivePhotoCaptureSupported

// Capture
let settings = AVCapturePhotoSettings()
settings.flashMode = .auto
photoOutput.capturePhoto(with: settings, delegate: self)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `maxPhotoDimensions` | `CMVideoDimensions` | Maximum resolution of requested photos |
| `isLivePhotoCaptureEnabled` | `Bool` | Enable Live Photo capture (set before `startRunning()`) |
| `isLivePhotoAutoTrimmingEnabled` | `Bool` | Auto-trim Live Photo movies |
| `captureReadiness` | `AVCapturePhotoOutput.CaptureReadiness` | Whether the output is ready for a timely capture |
| `isResponsiveCaptureEnabled` | `Bool` | Enable responsive capture mode |
| `isZeroShutterLagEnabled` | `Bool` | Enable zero shutter lag |
| `isFastCapturePrioritizationEnabled` | `Bool` | Prioritize fast capture delivery |
| `isAutoDeferredPhotoDeliveryEnabled` | `Bool` | Enable deferred photo delivery |
| `isDepthDataDeliveryEnabled` | `Bool` | Capture depth map alongside photo |
| `isPortraitEffectsMatteDeliveryEnabled` | `Bool` | Capture portrait effects matte |
| `isAppleProRAWEnabled` | `Bool` | Enable Apple ProRAW capture |
| `isConstantColorEnabled` | `Bool` | Enable constant color capture |
| `isContentAwareDistortionCorrectionEnabled` | `Bool` | Apply distortion correction |
| `availablePhotoCodecTypes` | `[AVVideoCodecType]` | Supported compression codecs |
| `availablePhotoPixelFormatTypes` | `[OSType]` | Supported uncompressed pixel formats |
| `availableRawPhotoPixelFormatTypes` | `[OSType]` | Supported RAW pixel formats |
| `maxBracketedCapturePhotoCount` | `Int` | Max images in a bracketed capture sequence |
| `supportedFlashModes` | `[AVCaptureDevice.FlashMode]` | Available flash modes |

## Notes

- iOS 10.0+, iPadOS 10.0+, macOS 10.15+, Mac Catalyst 14.0+, tvOS 17.0+
- Cannot combine with `AVCaptureMovieFileOutput` when Live Photo capture is enabled.
- Cannot coexist with the deprecated `AVCaptureStillImageOutput`.
- Each `AVCapturePhotoSettings` instance can only be used once — create a new one per capture (or use `init(from:)` to copy).
- Implement `AVCapturePhotoCaptureDelegate` to receive photo data and capture events.

## Related

- [AVCapturePhotoSettings](./avcapturephotosettings.md)
- [AVCaptureOutput](./avcaptureoutput.md)
- [AVCaptureSession](./avcapturesession.md)
